# 📡 COURSES ROUTER - API ENDPOINTS ZA KURSEVE
# ==============================================
# Ovaj fajl definiše sve API endpoint-e vezane za kurseve matematike
# REST API konvencije: GET (čitanje), POST (kreiranje), PUT (ažuriranje), DELETE (brisanje)

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session  # Za rad sa bazom podataka
from typing import List            # Za tip hinting u Python-u
from ..database import get_db      # Dependency za database session
from ..models import Course as CourseModel     # SQLAlchemy model
from ..schemas import Course, CourseCreate, CourseUpdate  # Pydantic schemi za validaciju

# 🛣️ KREIRANJE ROUTER-a
# APIRouter grupiše povezane endpoint-e
router = APIRouter(
    prefix="/api/courses",  # Svi endpoint-i će počinjati sa /api/courses
    tags=["courses"]        # Grupa u API dokumentaciji (Swagger UI)
)

# 📝 CREATE COURSE - POST /api/courses/
@router.post("/", response_model=Course)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    """
    🆕 KREIRANJE NOVOG KURSA
    
    HTTP POST metoda - šalje se JSON sa podacima o kursu
    Pydantic CourseCreate schema automatski validira ulazne podatke
    """
    # Kreiranje novog Course objekta u bazi podataka
    db_course = CourseModel(**course.dict())  # Unpack-ovanje Pydantic objekta u SQLAlchemy
    db.add(db_course)      # Dodaj u database session
    db.commit()            # Potvrdi promene (COMMIT transaction)
    db.refresh(db_course)  # Refresh objekat sa podacima iz baze (npr. auto-generated ID)
    return db_course

# 📋 GET ALL COURSES - GET /api/courses/
@router.get("/", response_model=List[Course])
def get_courses(
    skip: int = 0,          # Query parameter: ?skip=10 (pagination)
    limit: int = 100,       # Query parameter: ?limit=20 (pagination)
    level: str = None,      # Query parameter: ?level=osnovna (filtering)
    active_only: bool = True, # Query parameter: ?active_only=false (filtering)
    db: Session = Depends(get_db)  # Dependency injection za database
):
    """
    📚 DOBIJANJE LISTE SVIH KURSEVA
    
    GET metoda sa query parameters za filtriranje i pagination:
    - skip: preskoči prvih N rezultata (za pagination)
    - limit: maksimalno N rezultata po stranici  
    - level: filtriraj po nivou matematike
    - active_only: prikaži samo aktivne kurseve
    """
    # 🔍 BUILDING QUERY - gradimo SQL upit postupno
    query = db.query(CourseModel)  # SELECT * FROM courses
    
    # 🎯 FILTERING - dodajemo WHERE uslove
    if active_only:
        query = query.filter(CourseModel.is_active == True)  # WHERE is_active = true
    
    if level:
        query = query.filter(CourseModel.level == level)  # WHERE level = 'osnovna'
    
    courses = query.offset(skip).limit(limit).all()
    return courses

@router.get("/{course_id}", response_model=Course)
def get_course(course_id: int, db: Session = Depends(get_db)):
    """Dobijanje određenog kursa"""
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kurs nije pronađen"
        )
    return course

@router.put("/{course_id}", response_model=Course)
def update_course(
    course_id: int, 
    course_update: CourseUpdate, 
    db: Session = Depends(get_db)
):
    """Ažuriranje kursa"""
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kurs nije pronađen"
        )
    
    update_data = course_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(course, field, value)
    
    db.commit()
    db.refresh(course)
    return course

@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    """Brisanje kursa"""
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kurs nije pronađen"
        )
    
    db.delete(course)
    db.commit()
    return {"message": "Kurs je uspešno obrisan"}
