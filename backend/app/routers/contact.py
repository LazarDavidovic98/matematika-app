from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import ContactMessage as ContactMessageModel
from ..schemas import ContactMessage, ContactMessageCreate, APIResponse
from ..services.mailer import send_contact_message_notification

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", response_model=APIResponse)
async def send_contact_message(contact: ContactMessageCreate, db: Session = Depends(get_db)):
    """Slanje kontakt poruke"""
    try:
        # Čuvanje poruke u bazi
        db_contact = ContactMessageModel(**contact.dict())
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        
        # Slanje email notifikacije
        await send_contact_message_notification(contact)
        
        return APIResponse(
            success=True,
            message="Vaša poruka je uspešno poslata! Uskoro ćemo vam odgovoriti.",
            data={"message_id": db_contact.id}
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Greška pri slanju poruke: {str(e)}"
        )

@router.get("/", response_model=List[ContactMessage])
def get_contact_messages(
    skip: int = 0,
    limit: int = 100,
    unread_only: bool = False,
    db: Session = Depends(get_db)
):
    """Dobijanje kontakt poruka (admin funkcija)"""
    query = db.query(ContactMessageModel)
    
    if unread_only:
        query = query.filter(ContactMessageModel.is_read == False)
    
    messages = query.order_by(ContactMessageModel.created_at.desc()).offset(skip).limit(limit).all()
    return messages

@router.put("/{message_id}/read")
def mark_message_as_read(message_id: int, db: Session = Depends(get_db)):
    """Označavanje poruke kao pročitane"""
    message = db.query(ContactMessageModel).filter(ContactMessageModel.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Poruka nije pronađena"
        )
    
    message.is_read = True
    db.commit()
    return {"message": "Poruka je označena kao pročitana"}
