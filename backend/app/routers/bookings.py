from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Booking as BookingModel
from ..schemas import Booking, BookingCreate, BookingUpdate, APIResponse
from ..services.mailer import send_booking_notification

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

@router.post("/", response_model=APIResponse)
async def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    """Kreiranje novog zahteva za zakazivanje časa"""
    try:
        # Kreiranje novog booking-a u bazi
        db_booking = BookingModel(**booking.dict())
        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)
        
        # Slanje email notifikacije
        await send_booking_notification(booking)
        
        return APIResponse(
            success=True,
            message="Zahtev za čas je uspešno poslat! Uskoro ćete dobiti potvrdu na email.",
            data={"booking_id": db_booking.id}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Greška pri kreiranju zahteva: {str(e)}"
        )

@router.get("/", response_model=List[Booking])
def get_bookings(
    skip: int = 0, 
    limit: int = 100, 
    status_filter: str = None,
    db: Session = Depends(get_db)
):
    """Dobijanje liste svih zahteva za časove (admin funkcija)"""
    query = db.query(BookingModel)
    
    if status_filter:
        query = query.filter(BookingModel.status == status_filter)
    
    bookings = query.offset(skip).limit(limit).all()
    return bookings

@router.get("/{booking_id}", response_model=Booking)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    """Dobijanje određenog zahteva za čas"""
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zahtev za čas nije pronađen"
        )
    return booking

@router.put("/{booking_id}", response_model=Booking)
def update_booking(
    booking_id: int, 
    booking_update: BookingUpdate, 
    db: Session = Depends(get_db)
):
    """Ažuriranje zahteva za čas (admin funkcija)"""
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zahtev za čas nije pronađen"
        )
    
    update_data = booking_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(booking, field, value)
    
    db.commit()
    db.refresh(booking)
    return booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    """Brisanje zahteva za čas"""
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zahtev za čas nije pronađen"
        )
    
    db.delete(booking)
    db.commit()
    return {"message": "Zahtev za čas je uspešno obrisan"}
