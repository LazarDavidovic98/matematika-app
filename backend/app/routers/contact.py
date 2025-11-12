# 📧 CONTACT ROUTER - API ZA KONTAKT FORMU I PORUKE
# ===================================================
# Ovaj router upravlja kontakt formom na sajtu
# Čuva poruke u bazi i šalje email notifikacije instruktoru

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import ContactMessage as ContactMessageModel
from ..schemas import ContactMessage, ContactMessageCreate, APIResponse
from ..services.mailer import send_contact_message_notification  # Email service

# 🛣️ CONTACT ROUTER SETUP
router = APIRouter(
    prefix="/api/contact",  # Svi endpoint-i počinju sa /api/contact
    tags=["contact"]       # Swagger UI grupa
)

# ✉️ SEND CONTACT MESSAGE - POST /api/contact/
@router.post("/", response_model=APIResponse)
async def send_contact_message(contact: ContactMessageCreate, db: Session = Depends(get_db)):
    """
    ✉️ SLANJE KONTAKT PORUKE
    
    Workflow:
    1. Korisnik popuni kontakt formu (ime, email, poruka)
    2. Frontend pozove ovaj endpoint
    3. Poruka se čuva u bazi za praćenje
    4. Automatski se šalje email instruktoru
    5. Korisnik dobije potvrdu
    
    Args:
        contact: ContactMessageCreate sa podacima forme
        db: Database session
        
    Returns:
        APIResponse: Potvrda o slanju poruke
    """
    try:
        # 💾 SAVE TO DATABASE - čuvanje poruke za istoriju
        db_contact = ContactMessageModel(**contact.dict())  # Pydantic → SQLAlchemy
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)  # Get auto-generated ID
        
        # 📧 EMAIL NOTIFICATION - obavesti instruktora o novoj poruci
        await send_contact_message_notification(contact)
        
        # ✅ SUCCESS RESPONSE
        return APIResponse(
            success=True,
            message="Vaša poruka je uspešno poslata! Uskoro ćemo vam odgovoriti.",
            data={"message_id": db_contact.id}
        )
        
    except Exception as e:
        # 🔄 DATABASE ROLLBACK na greška
        db.rollback()
        
        # 🚨 ERROR RESPONSE
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Greška pri slanju poruke: {str(e)}"
        )

# 📋 GET CONTACT MESSAGES - GET /api/contact/
@router.get("/", response_model=List[ContactMessage])
def get_contact_messages(
    skip: int = 0,           # Pagination offset
    limit: int = 100,        # Max rezultata
    unread_only: bool = False, # Filter za nepročitane poruke
    db: Session = Depends(get_db)
):
    """
    📋 ADMIN PANEL - Lista kontakt poruka
    
    Query Parameters:
    - skip: Pagination (default: 0)
    - limit: Max poruka (default: 100)
    - unread_only: Samo nepročitane (default: false)
    
    Returns:
        List[ContactMessage]: Sortiran lista poruka (najnovije prve)
    """
    # 🔍 BASE QUERY
    query = db.query(ContactMessageModel)
    
    # 🔍 CONDITIONAL FILTER - samo nepročitane ako je traženo
    if unread_only:
        query = query.filter(ContactMessageModel.is_read == False)
    
    # 📊 ORDERING & PAGINATION - najnovije poruke prve
    messages = query.order_by(
        ContactMessageModel.created_at.desc()  # ORDER BY created_at DESC
    ).offset(skip).limit(limit).all()
    
    return messages

# ✅ MARK AS READ - PUT /api/contact/{message_id}/read
@router.put("/{message_id}/read")
def mark_message_as_read(message_id: int, db: Session = Depends(get_db)):
    """
    ✅ OZNAČAVANJE PORUKE KAO PROČITANE
    
    Admin funkcija za organizaciju inbox-a
    Pomaže da se prate koje poruke su odgovorene
    """
    # 🔍 FIND MESSAGE BY ID
    message = db.query(ContactMessageModel).filter(ContactMessageModel.id == message_id).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Poruka nije pronađena"
        )
    
    # ✅ MARK AS READ - boolean flag update
    message.is_read = True  # Postavi flag na True
    db.commit()             # Sačuvaj izmenu
    
    return {
        "message": "Poruka je označena kao pročitana",
        "message_id": message_id,
        "is_read": True
    }


# 📊 CONTACT STATISTICS - GET /api/contact/stats
@router.get("/stats/summary") 
def get_contact_stats(db: Session = Depends(get_db)):
    """
    📊 ADMIN DASHBOARD - Statistike kontakt poruka
    
    Vraća pregled za admin panel:
    - Ukupan broj poruka
    - Broj nepročitanih
    - Poslednje poruke
    """
    from sqlalchemy import func
    
    # 📈 AGGREGATE QUERIES
    total_messages = db.query(func.count(ContactMessageModel.id)).scalar()
    unread_messages = db.query(func.count(ContactMessageModel.id)).filter(
        ContactMessageModel.is_read == False
    ).scalar()
    
    # 📝 LATEST MESSAGES - poslednje 3 poruke
    latest_messages = db.query(ContactMessageModel).order_by(
        ContactMessageModel.created_at.desc()
    ).limit(3).all()
    
    return {
        "total_messages": total_messages,
        "unread_messages": unread_messages,  
        "latest_messages": [
            {
                "id": msg.id,
                "name": msg.name,
                "email": msg.email,
                "subject": msg.subject,
                "created_at": msg.created_at.isoformat(),
                "is_read": msg.is_read
            } 
            for msg in latest_messages
        ]
    }
