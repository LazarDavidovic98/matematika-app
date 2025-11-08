from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Lesson as LessonModel
from ..schemas import Lesson, LessonCreate, LessonUpdate

router = APIRouter(prefix="/api/lessons", tags=["lessons"])

@router.post("/", response_model=Lesson)
def create_lesson(lesson: LessonCreate, db: Session = Depends(get_db)):
    """Kreiranje nove lekcije"""
    db_lesson = LessonModel(**lesson.dict())
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

@router.get("/", response_model=List[Lesson])
def get_lessons(
    skip: int = 0, 
    limit: int = 100,
    course_id: int = None,
    difficulty: str = None,
    free_only: bool = None,
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
