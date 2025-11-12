# 📚 LESSONS ROUTER - API ENDPOINTS ZA LEKCIJE I PDF MATERIJALE
# =============================================================
# Ovaj router upravlja lekcijama koje pripadaju kursevima
# Uključuje i file serving za PDF materijale

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse  # Za vraćanje fajlova (PDF-ovi)
from sqlalchemy.orm import Session
from typing import List
import os              # Za file system operacije
from pathlib import Path  # Modern way za rad sa putanjama
from ..database import get_db
from ..models import Lesson as LessonModel
from ..schemas import Lesson, LessonCreate, LessonUpdate

# 🛣️ LESSONS ROUTER SETUP
router = APIRouter(
    prefix="/api/lessons",  # Svi endpoint-i počinju sa /api/lessons
    tags=["lessons"]       # Swagger UI grupa
)

# ➕ CREATE NEW LESSON - POST /api/lessons/
@router.post("/", response_model=Lesson)
def create_lesson(lesson: LessonCreate, db: Session = Depends(get_db)):
    """
    📝 KREIRANJE NOVE LEKCIJE
    
    Lekcija pripada određenom kursu (course_id Foreign Key).
    Može sadržavati tekst, link ka PDF-u, video URL, itd.
    
    Primer JSON request-a:
    {
        "title": "Uvod u algebru",
        "content": "Ova lekcija pokriva osnove...",
        "course_id": 1,
        "pdf_file": "algebra_uvod.pdf",
        "difficulty": "pocetnik"
    }
    """
    # SQLAlchemy CREATE operacija
    db_lesson = LessonModel(**lesson.dict())  # Pydantic → SQLAlchemy konverzija
    db.add(db_lesson)      # Dodaj u session
    db.commit()            # Sačuvaj u bazu
    db.refresh(db_lesson)  # Refresh sa auto-generated podacima (id, timestamp)
    return db_lesson

# 📋 GET ALL LESSONS - GET /api/lessons/ 
@router.get("/", response_model=List[Lesson])
def get_lessons(
    # 📄 PAGINATION PARAMETERS
    skip: int = 0,          # ?skip=10 - preskoči prvih 10 rezultata
    limit: int = 100,       # ?limit=20 - maksimalno 20 po stranici
    
    # 🎯 FILTERING PARAMETERS  
    course_id: int = None,      # ?course_id=1 - lekcije samo za određeni kurs
    difficulty: str = None,     # ?difficulty=pocetnik - filtriranje po težini
    free_only: bool = None,     # ?free_only=true - samo besplatne lekcije
    
    # 💉 DEPENDENCY INJECTION
    db: Session = Depends(get_db)
):
    """Dobijanje liste svih lekcija"""
    query = db.query(LessonModel)
    
    if course_id:
        query = query.filter(LessonModel.course_id == course_id)
    
    if difficulty:
        query = query.filter(LessonModel.difficulty == difficulty)
        
    if free_only is not None:
        query = query.filter(LessonModel.is_free == free_only)
    
    # Sortiranje po redosledu u kursu
    lessons = query.order_by(LessonModel.course_id, LessonModel.order_number).offset(skip).limit(limit).all()
    return lessons

@router.get("/course/{course_id}", response_model=List[Lesson])
def get_lessons_by_course(course_id: int, db: Session = Depends(get_db)):
    """Dobijanje svih lekcija za određeni kurs"""
    lessons = db.query(LessonModel).filter(
        LessonModel.course_id == course_id
    ).order_by(LessonModel.order_number).all()
    return lessons

@router.get("/{lesson_id}", response_model=Lesson)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    """Dobijanje određene lekcije"""
    lesson = db.query(LessonModel).filter(LessonModel.id == lesson_id).first()
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lekcija nije pronađena"
        )
    return lesson

@router.put("/{lesson_id}", response_model=Lesson)
def update_lesson(
    lesson_id: int, 
    lesson_update: LessonUpdate, 
    db: Session = Depends(get_db)
):
    """Ažuriranje lekcije"""
    lesson = db.query(LessonModel).filter(LessonModel.id == lesson_id).first()
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lekcija nije pronađena"
        )
    
    update_data = lesson_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(lesson, field, value)
    
    db.commit()
    db.refresh(lesson)
    return lesson

@router.delete("/{lesson_id}")
def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
    """Brisanje lekcije"""
    lesson = db.query(LessonModel).filter(LessonModel.id == lesson_id).first()
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lekcija nije pronađena"
        )
    
    db.delete(lesson)
    db.commit()
    return {"message": "Lekcija je uspešno obrisana"}

@router.get("/download/{filename}")
def download_file(filename: str):
    """Download PDF fajlova"""
    # Kreiranje putanje do fajla
    file_path = Path("uploads/materials") / filename
    
    # Proveravamo da li fajl postoji
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fajl nije pronađen"
        )
    
    # Vraćamo fajl kao FileResponse
    return FileResponse(
        path=str(file_path),
        filename=filename,
        media_type='application/pdf'
    )

@router.get("/view/{filename}")
def view_file(filename: str):
    """Pregled PDF fajlova u browseru"""
    # Kreiranje putanje do fajla
    file_path = Path("uploads/materials") / filename
    
    # Proveravamo da li fajl postoji
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Fajl nije pronađen"
        )
    
    # Vraćamo fajl za pregled u browseru
    return FileResponse(
        path=str(file_path),
        media_type='application/pdf',
        headers={"Content-Disposition": "inline"}
    )
