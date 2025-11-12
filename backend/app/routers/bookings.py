# 📅 BOOKINGS ROUTER - API ZA ZAKAZIVANJE PRIVATNIH ČASOVA
# ========================================================
# Ovaj router upravlja zahtevima za privatne časove matematike
# Uključuje kreiranje booking-a, slanje email notifikacija i upravljanje statusom

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Booking as BookingModel
from ..schemas import Booking, BookingCreate, BookingUpdate, APIResponse
from ..services.mailer import send_booking_notification  # Email service

# 🛣️ BOOKINGS ROUTER SETUP
router = APIRouter(
    prefix="/api/bookings",  # Svi endpoint-i počinju sa /api/bookings
    tags=["bookings"]       # Swagger UI grupa
)

# ➕ CREATE BOOKING - POST /api/bookings/
@router.post("/", response_model=APIResponse)
async def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    """
    📅 KREIRANJE NOVOG ZAHTEVA ZA PRIVATNI ČAS
    
    Workflow:
    1. Korisnik popuni formu na frontend-u
    2. Frontend pozove ovaj endpoint sa podacima
    3. Kreira se zapis u bazi podataka
    4. Automatski se šalje email notifikacija instruktoru
    5. Vraća se potvrda korisniku
    
    Args:
        booking: BookingCreate Pydantic schema sa podacima
        db: Database session iz dependency injection-a
    
    Returns:
        APIResponse: Success/error message sa booking ID-om
    """
    try:
        # 💾 DATABASE TRANSACTION - kreiranje novog booking-a
        db_booking = BookingModel(**booking.dict())  # Pydantic → SQLAlchemy
        db.add(db_booking)     # Dodaj u session
        db.commit()            # Potvrdi u bazu (ACID transaction)
        db.refresh(db_booking) # Refresh sa auto-generated podacima (ID, timestamp)
        
        # 📧 ASYNCHRONOUS EMAIL NOTIFICATION
        # await čeka da se email pošalje pre vraćanja odgovora
        await send_booking_notification(booking)
        
        # ✅ SUCCESS RESPONSE
        return APIResponse(
            success=True,
            message="Zahtev za čas je uspešno poslat! Uskoro ćete dobiti potvrdu na email.",
            data={"booking_id": db_booking.id}  # ID za praćenje zahteva
        )
        
    except Exception as e:
        # 🔄 ROLLBACK u slučaju greške (database consistency)
        db.rollback()
        
        # 🚨 HTTP ERROR RESPONSE
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Greška pri kreiranju zahteva: {str(e)}"
        )

# 📋 GET ALL BOOKINGS - GET /api/bookings/
@router.get("/", response_model=List[Booking])
def get_bookings(
    skip: int = 0,        # Pagination - preskoči prvih N booking-a
    limit: int = 100,     # Pagination - maksimalno booking-a u odgovoru
    status_filter: str = None,  # Filter po statusu (pending, confirmed, cancelled)
    db: Session = Depends(get_db)
):
    """
    📋 ADMIN FUNKCIJA - Lista svih zahteva za časove
    
    Query Parameters (URL?skip=0&limit=10&status_filter=pending):
    - skip: Pagination offset (default: 0)
    - limit: Maksimalno rezultata (default: 100, max: 100)
    - status_filter: Filter po statusu (opciono)
    
    Returns:
        List[Booking]: Lista booking objekata sa Pydantic validacijom
    """
    # 🔍 QUERY BUILDER PATTERN - kreiranje dinamičke SQL query
    query = db.query(BookingModel)  # SELECT * FROM bookings
    
    # 🔍 CONDITIONAL FILTERING - filter po statusu ako je prosleđen
    if status_filter:
        query = query.filter(BookingModel.status == status_filter)
        # SQL: WHERE status = 'pending'
    
    # 📊 PAGINATION EXECUTION - offset/limit pattern
    bookings = query.offset(skip).limit(limit).all()
    # SQL: LIMIT 100 OFFSET 0 (prva stranica)
    
    # 🔄 AUTOMATIC PYDANTIC CONVERSION - SQLAlchemy → Pydantic
    return bookings

# 👁️ GET SINGLE BOOKING - GET /api/bookings/{booking_id}
@router.get("/{booking_id}", response_model=Booking)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    """
    👁️ PREGLED POJEDINAČNOG ZAHTEVA ZA ČAS
    
    Path Parameter:
        booking_id: ID booking-a u bazi
    
    Returns:
        Booking: Kompletan booking objekat ili 404 Not Found
    """
    # 🔍 SINGLE RECORD QUERY - pronađi po ID-u
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    
    # ❌ 404 ERROR HANDLING - ako booking ne postoji
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zahtev za čas nije pronađen"
        )
    
    return booking

# ✏️ UPDATE BOOKING - PUT /api/bookings/{booking_id}
@router.put("/{booking_id}", response_model=Booking)
def update_booking(
    booking_id: int, 
    booking_update: BookingUpdate, 
    db: Session = Depends(get_db)
):
    """
    ✏️ ADMIN FUNKCIJA - Ažuriranje booking-a
    
    Tipično za promena statusa:
    - pending → confirmed (potvrditi čas)
    - pending → cancelled (otkazati čas)
    - confirmed → rescheduled (pomeriti čas)
    
    Args:
        booking_id: ID booking-a za update
        booking_update: BookingUpdate schema (parcijalni update)
        
    Returns:
        Booking: Ažurirani booking objekat
    """
    # 🔍 FIND EXISTING BOOKING
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zahtev za čas nije pronađen"
        )
    
    # 🔄 PARTIAL UPDATE PATTERN - ažuriranje samo prosleđenih polja
    update_data = booking_update.dict(exclude_unset=True)  # Samo non-null vrednosti
    
    # 🔧 DYNAMIC ATTRIBUTE UPDATE - setattr za dinamičko postavljanje
    for field, value in update_data.items():
        setattr(booking, field, value)  # booking.status = "confirmed"
    
    # 💾 COMMIT CHANGES
    db.commit()
    db.refresh(booking)
    return booking

# 🗑️ DELETE BOOKING - DELETE /api/bookings/{booking_id}
@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    """
    🗑️ ADMIN FUNKCIJA - Brisanje zahteva za čas
    
    ⚠️ OPREZ: Trajno briše booking iz baze!
    Alternativa: soft delete (status = "deleted")
    
    Args:
        booking_id: ID booking-a za brisanje
        
    Returns:
        JSON response sa potvrdnom porukom
    """
    # 🔍 FIND BOOKING TO DELETE
    booking = db.query(BookingModel).filter(BookingModel.id == booking_id).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Zahtev za čas nije pronađen"
        )
    
    # 🗑️ HARD DELETE - trajno uklanjanje iz baze
    db.delete(booking)  # Označava za brisanje
    db.commit()         # Izvršava DELETE SQL
    
    # ✅ CONFIRMATION RESPONSE
    return {"message": "Zahtev za čas je uspešno obrisan"}


# 📊 BOOKING STATISTICS - GET /api/bookings/stats
@router.get("/stats/summary")
def get_booking_stats(db: Session = Depends(get_db)):
    """
    📊 ADMIN DASHBOARD - Statistike booking-a
    
    Vraća brojke za admin panel:
    - Ukupan broj zahteva
    - Broj po statusu (pending, confirmed, etc.)
    - Trend po mesecima
    """
    from sqlalchemy import func  # SQL funkcije (COUNT, SUM, etc.)
    
    # 📈 AGGREGATE QUERIES - statistike iz baze
    total_bookings = db.query(func.count(BookingModel.id)).scalar()
    
    # GROUP BY status - broj booking-a po statusu
    status_counts = db.query(
        BookingModel.status,
        func.count(BookingModel.id)
    ).group_by(BookingModel.status).all()
    
    return {
        "total_bookings": total_bookings,
        "by_status": {status: count for status, count in status_counts},
        "message": "Booking statistike uspešno učitane"
    }
    return {"message": "Zahtev za čas je uspešno obrisan"}
