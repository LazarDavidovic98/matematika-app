# 📋 PYDANTIC SCHEMAS - VALIDACIJA I SERIALIZATION PODATAKA  
# ===========================================================
# Pydantic automatski validira ulazne podatke i konvertuje ih između JSON ↔ Python objekta
# Različiti schemi za različite operacije (Create, Update, Response)

from pydantic import BaseModel, EmailStr
from datetime import datetime  
from typing import List, Optional

# 📚 COURSE SCHEMAS - Za validaciju API podataka o kursevima

class CourseBase(BaseModel):
    """
    🏗️ BAZNA KLASA ZA COURSE SCHEMI
    
    Sadrži sva zajednička polja koja se koriste u Create i Update operacijama.
    Inheritance pattern - nasleđivanje da izbegnemo duplikovanje koda.
    """
    title: str                              # Obavezno polje - ime kursa
    description: Optional[str] = None       # Opciono - duži opis kursa
    level: Optional[str] = None             # Opciono - "osnovna", "srednja", "viša"  
    duration_weeks: Optional[int] = None    # Opciono - trajanje u nedeljama
    price: Optional[str] = None             # Opciono - cena kao string ("5000 RSD", "besplatno")
    is_active: bool = True                  # Default True - kurs je aktivan

class CourseCreate(CourseBase):
    """
    ➕ SCHEMA ZA KREIRANJE NOVOG KURSA
    
    Nasleđuje sva polja iz CourseBase.
    Korisnik šalje JSON koji se automatski validira protiv ovog schema-a.
    
    Primer JSON request-a:
    {
        "title": "Algebra za početnike", 
        "description": "Osnove algebre...",
        "level": "osnovna",
        "duration_weeks": 8,
        "price": "5000 RSD"
    }
    """
    pass  # Koristi sva polja iz CourseBase bez izmena

class CourseUpdate(BaseModel):
    """
    ✏️ SCHEMA ZA AŽURIRANJE POSTOJEĆEG KURSA
    
    Sva polja su Optional jer možda želimo da ažuriramo samo neki deo.
    PATCH semantika - parcijalno ažuriranje.
    
    Primer JSON request-a:
    {
        "title": "Novo ime kursa",
        "is_active": false
    }
    """
    title: Optional[str] = None             # Možda želimo da menjamo samo naziv
    description: Optional[str] = None       # Možda želimo da menjamo samo opis
    level: Optional[str] = None             # Možda želimo da menjamo samo nivo
    duration_weeks: Optional[int] = None    # Možda želimo da menjamo samo trajanje
    price: Optional[str] = None             # Možda želimo da menjamo samo cenu
    is_active: Optional[bool] = None        # Možda želimo da menjamo samo status

class Course(CourseBase):
    """
    📤 SCHEMA ZA RESPONSE - Šta API vraća klijentu
    
    Nasleđuje polja iz CourseBase + dodaje metadata polja (id, timestamps).
    Ovo je ono što frontend dobija kada pozove GET /api/courses/
    """
    id: int                                 # Auto-generated primary key iz baze
    created_at: datetime                    # Timestamp kada je kurs kreiran
    updated_at: Optional[datetime] = None   # Timestamp poslednje izmene
    
    class Config:
        from_attributes = True

# Lesson schemas - PDF materijali
class LessonBase(BaseModel):
    title: str
    content: Optional[str] = None
    course_id: Optional[int] = None
    order_number: Optional[int] = None
    pdf_url: str  # obavezno PDF polje
    difficulty: Optional[str] = None
    is_free: bool = True

class LessonCreate(LessonBase):
    pass

class LessonUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    course_id: Optional[int] = None
    order_number: Optional[int] = None
    pdf_url: Optional[str] = None
    difficulty: Optional[str] = None
    is_free: Optional[bool] = None

class Lesson(LessonBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Booking schemas
class BookingBase(BaseModel):
    student_name: str
    student_email: EmailStr
    student_phone: Optional[str] = None
    subject: Optional[str] = None
    preferred_date: Optional[datetime] = None
    preferred_time: Optional[str] = None
    message: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    student_name: Optional[str] = None
    student_email: Optional[EmailStr] = None
    student_phone: Optional[str] = None
    subject: Optional[str] = None
    preferred_date: Optional[datetime] = None
    preferred_time: Optional[str] = None
    message: Optional[str] = None
    status: Optional[str] = None

class Booking(BookingBase):
    id: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Contact message schemas
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Response schemas
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
