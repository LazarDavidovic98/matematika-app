from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Course as CourseModel
from ..schemas import Course, CourseCreate, CourseUpdate

router = APIRouter(prefix="/api/courses", tags=["courses"])

@router.post("/", response_model=Course)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    """Kreiranje novog kursa"""
    db_course = CourseModel(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("/", response_model=List[Course])
def get_courses(
    skip: int = 0, 
    limit: int = 100,
    level: str = None,
    active_only: bool = True,
    db: Session = Depends(get_db)
):
    """Dobijanje liste svih kurseva"""
    query = db.query(CourseModel)
    
    if active_only:
        query = query.filter(CourseModel.is_active == True)
    
    if level:
        query = query.filter(CourseModel.level == level)
    
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
