from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List
from ..database import get_db
from ..models import Definition as DefinitionModel
from ..schemas import Definition, DefinitionCreate, DefinitionUpdate

router = APIRouter(prefix="/api/definitions", tags=["definitions"])

@router.post("/", response_model=Definition)
def create_definition(definition: DefinitionCreate, db: Session = Depends(get_db)):
    """Kreiranje nove definicije"""
    db_definition = DefinitionModel(**definition.dict())
    db.add(db_definition)
    db.commit()
    db.refresh(db_definition)
    return db_definition

@router.get("/", response_model=List[Definition])
def get_definitions(
    skip: int = 0, 
    limit: int = 100,
    category: str = None,
    level: str = None,
    search: str = Query(None, description="Pretraga po terminu ili definiciji"),
    db: Session = Depends(get_db)
):
    """Dobijanje liste svih definicija"""
    query = db.query(DefinitionModel)
    
    if category:
        query = query.filter(DefinitionModel.category == category)
    
    if level:
        query = query.filter(DefinitionModel.level == level)
    
    if search:
        # Pretraga po terminu ili definiciji
        search_filter = or_(
            DefinitionModel.term.ilike(f"%{search}%"),
            DefinitionModel.definition.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    definitions = query.order_by(DefinitionModel.term).offset(skip).limit(limit).all()
    return definitions

@router.get("/categories", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    """Dobijanje svih kategorija definicija"""
    categories = db.query(DefinitionModel.category).distinct().all()
    return [cat[0] for cat in categories if cat[0]]

@router.get("/{definition_id}", response_model=Definition)
def get_definition(definition_id: int, db: Session = Depends(get_db)):
    """Dobijanje određene definicije"""
    definition = db.query(DefinitionModel).filter(DefinitionModel.id == definition_id).first()
    if not definition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Definicija nije pronađena"
        )
    return definition

@router.put("/{definition_id}", response_model=Definition)
def update_definition(
    definition_id: int, 
    definition_update: DefinitionUpdate, 
    db: Session = Depends(get_db)
):
    """Ažuriranje definicije"""
    definition = db.query(DefinitionModel).filter(DefinitionModel.id == definition_id).first()
    if not definition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Definicija nije pronađena"
        )
    
    update_data = definition_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(definition, field, value)
    
    db.commit()
    db.refresh(definition)
    return definition

@router.delete("/{definition_id}")
def delete_definition(definition_id: int, db: Session = Depends(get_db)):
    """Brisanje definicije"""
    definition = db.query(DefinitionModel).filter(DefinitionModel.id == definition_id).first()
    if not definition:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Definicija nije pronađena"
        )
    
    db.delete(definition)
    db.commit()
    return {"message": "Definicija je uspešno obrisana"}
