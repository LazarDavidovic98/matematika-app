# 🗄️ DATABASE MODELI - STRUKTURA PODATAKA U BAZI
# ================================================
# Ovaj fajl definiše kako izgledaju tabele u našoj bazi podataka
# SQLAlchemy ORM (Object Relational Mapping) omogućava rad sa bazom kroz Python klase

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship  # Za definisanje veza između tabela
from sqlalchemy.sql import func          # Za SQL funkcije kao što je NOW()
from .database import Base              # Base klasa za sve modele

# 📚 COURSE MODEL - TABELA ZA KURSEVE MATEMATIKE
class Course(Base):
    """
    🎓 MODEL ZA KURSEVE MATEMATIKE
    
    Ova klasa se mapira na "courses" tabelu u bazi podataka.
    Svaki atribut predstavlja kolonu u tabeli.
    """
    __tablename__ = "courses"  # Ime tabele u bazi podataka
    
    # 🔑 PRIMARY KEY - jedinstven identifikator svakog kursa
    id = Column(Integer, primary_key=True, index=True)
    
    # 📝 OSNOVE INFORMACIJE O KURSU
    title = Column(String(200), nullable=False, index=True)  # Ime kursa (obavezno)
    description = Column(Text)                               # Duži opis kursa
    level = Column(String(50))        # "osnovna", "srednja", "viša matematika"
    duration_weeks = Column(Integer)  # Koliko nedelja traje kurs
    price = Column(String(50))        # Cena (može biti "besplatno" ili "5000 RSD")
    
    # 📊 STATUS I METADATA
    is_active = Column(Boolean, default=True)  # Da li je kurs trenutno aktivan
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # Kad je kreiran
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())        # Kad je poslednji put menjan
    
    # 🔗 RELACIJE SA DRUGIM TABELAMA
    # One-to-Many: Jedan kurs može imati više lekcija
    lessons = relationship("Lesson", back_populates="course")

# 📖 LESSON MODEL - TABELA ZA POJEDINAČNE LEKCIJE
class Lesson(Base):
    """
    📚 MODEL ZA POJEDINAČNE LEKCIJE
    
    Svaka lekcija pripada nekom kursu (Foreign Key relaciona baza)
    Lekcije sadrže PDF materijale, video linkove, zadatke
    """
    __tablename__ = "lessons"  # Ime tabele u bazi podataka
    
    # 🔑 PRIMARY KEY
    id = Column(Integer, primary_key=True, index=True)
    
    # 📝 SADRŽAJ LEKCIJE
    title = Column(String(200), nullable=False, index=True)  # Naslov lekcije
    content = Column(Text)                                   # Tekstualni sadržaj/opis
    
    # 🔗 FOREIGN KEY - veza sa courses tabelom
    course_id = Column(Integer, ForeignKey("courses.id"))  # ID kursa kome pripada
    
    # 📊 DODATNE INFORMACIJE O LEKCIJI
    order_number = Column(Integer)        # Redosled lekcija u kursu (1, 2, 3...)
    pdf_url = Column(String(500))         # Relativna putanja do PDF fajla
    difficulty = Column(String(50))       # "lako", "srednje", "teško"
    is_free = Column(Boolean, default=True)  # Da li je lekcija besplatna
    
    # 📅 TIMESTAMPS - automatski se setuju
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 🔗 SQLALCHEMY RELATIONSHIPS - objektno-relaciono mapiranje
    # Omogućava course.lessons i lesson.course pristup
    course = relationship("Course", back_populates="lessons")

# 📅 BOOKING MODEL - TABELA ZA ZAKAZIVANJE PRIVATNIH ČASOVA
class Booking(Base):
    """
    📅 MODEL ZA ZAKAZIVANJE PRIVATNIH ČASOVA
    
    Kada student želi privatni čas, popunjava formu koja kreira Booking zapis.
    Instruktor dobija email notifikaciju sa svim detaljima.
    """
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(200), nullable=False)
    student_email = Column(String(200), nullable=False)
    student_phone = Column(String(50))
    subject = Column(String(200))  # tema časa
    preferred_date = Column(DateTime)
    preferred_time = Column(String(50))  # "popodne", "veče", "ujutru"
    message = Column(Text)  # dodatna poruka od studenta
    status = Column(String(50), default="pending")  # pending, confirmed, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ContactMessage(Base):
    """Model za poruke sa kontakt forme"""
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(200))
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
