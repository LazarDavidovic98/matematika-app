from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Course(Base):
    """Model za kurseve matematike"""
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text)
    level = Column(String(50))  # osnovna, srednja, viša matematika
    duration_weeks = Column(Integer)
    price = Column(String(50))  # može biti "besplatno" ili cifra
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    lessons = relationship("Lesson", back_populates="course")

class Lesson(Base):
    """Model za pojedinačne lekcije"""
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    content = Column(Text)
    course_id = Column(Integer, ForeignKey("courses.id"))
    order_number = Column(Integer)  # redosled lekcija u kursu
    video_url = Column(String(500))  # link ka video materijalu
    pdf_url = Column(String(500))    # link ka PDF materijalu
    difficulty = Column(String(50))  # lako, srednje, teško
    is_free = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    course = relationship("Course", back_populates="lessons")

class Definition(Base):
    """Model za matematičke definicije i pojmove"""
    __tablename__ = "definitions"
    
    id = Column(Integer, primary_key=True, index=True)
    term = Column(String(200), nullable=False, index=True)  # matematički pojam
    definition = Column(Text, nullable=False)  # definicija
    category = Column(String(100))  # algebra, geometrija, analiza, itd.
    level = Column(String(50))  # osnovna, srednja, viša matematika
    example = Column(Text)  # primer korišćenja
    formula = Column(String(500))  # matematička formula (LaTeX)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Booking(Base):
    """Model za zakazivanje privatnih časova"""
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
