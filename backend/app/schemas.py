from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# Course schemas
class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    level: Optional[str] = None
    duration_weeks: Optional[int] = None
    price: Optional[str] = None
    is_active: bool = True

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    level: Optional[str] = None
    duration_weeks: Optional[int] = None
    price: Optional[str] = None
    is_active: Optional[bool] = None

class Course(CourseBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
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

# Definition schemas
class DefinitionBase(BaseModel):
    term: str
    definition: str
    category: Optional[str] = None
    level: Optional[str] = None
    example: Optional[str] = None
    formula: Optional[str] = None

class DefinitionCreate(DefinitionBase):
    pass

class DefinitionUpdate(BaseModel):
    term: Optional[str] = None
    definition: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    example: Optional[str] = None
    formula: Optional[str] = None

class Definition(DefinitionBase):
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
