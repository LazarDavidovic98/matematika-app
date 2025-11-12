# 🎓 STEP-BY-STEP LEARNING PATH za FULL STACK DEVELOPMENT
# =====================================================

## 📚 REDOSLED UČENJA (Od početnika do naprednog)

### **NIVO 1: WEB OSNOVE** (1-2 meseca)
```bash
# HTML & CSS
- Semantički HTML elementi
- CSS flexbox i grid
- Responsive design (media queries)
- CSS frameworks (Bootstrap, Tailwind)

# JavaScript ES6+
- Variables (let, const)
- Functions (arrow functions, async/await)
- Arrays & Objects manipulation
- DOM manipulation
- Fetch API za HTTP requests
```

### **NIVO 2: FRONTEND FRAMEWORK** (2-3 meseca)
```jsx
// React koncepti
- Components (functional components)
- JSX sintaksa
- Props i State (useState hook)
- Event handling
- useEffect za side effects
- Routing (React Router)
- State management (Context API ili Redux)

// Primer jednostavne komponente:
function CourseCard({ course }) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={() => setIsEnrolled(true)}>
        Prijaviť se
      </button>
    </div>
  );
}
```

### **NIVO 3: BACKEND OSNOVE** (2-3 meseca)  
```python
# Python osnove
- Functions, classes, modules
- List comprehensions
- Error handling (try/except)
- Working with JSON
- Virtual environments

# FastAPI/Flask
- HTTP methods (GET, POST, PUT, DELETE)
- Route handlers
- Request/Response objects
- Middleware
- Authentication & Authorization

# Primer API endpoint-a:
@app.get("/api/courses")
def get_courses(level: str = None):
    if level:
        courses = db.query(Course).filter(Course.level == level)
    else:
        courses = db.query(Course).all()
    return courses
```

### **NIVO 4: DATABASE & ORM** (1-2 meseca)
```sql
-- SQL osnove
SELECT * FROM courses WHERE level = 'osnovna';
INSERT INTO lessons (title, course_id) VALUES ('Algebra', 1);
UPDATE courses SET is_active = false WHERE id = 5;
DELETE FROM bookings WHERE status = 'cancelled';

-- Relacione baze (Foreign Keys, JOINs)
SELECT c.title, l.title as lesson_title 
FROM courses c 
JOIN lessons l ON c.id = l.course_id;
```

```python
# SQLAlchemy ORM
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    lessons = relationship("Lesson", back_populates="course")

# Query-ji kroz ORM
courses = session.query(Course).filter(Course.is_active == True).all()
```

### **NIVO 5: ADVANCED KONCEPTI** (3-6 meseci)
```bash
# DevOps & Deployment
- Docker containerization
- CI/CD pipelines (GitHub Actions)
- Cloud deployment (AWS, Heroku, DigitalOcean)
- Environment management (.env files)
- Logging i monitoring

# Performance & Scalability  
- Database indexing
- Caching (Redis)
- Load balancing
- API rate limiting
- Code splitting (frontend)

# Security
- Authentication (JWT tokens)
- Authorization (RBAC)
- Input validation & sanitization  
- HTTPS & SSL certificates
- SQL injection prevention
```

## 🛠️ PRAKTIČNI PROJEKTI ZA VEŽBU:

### **Projekt 1: Todo App** (2 nedelje)
```
Frontend: React sa localStorage
Backend: FastAPI sa SQLite
Features: CRUD operacije, filtriranje, search
```

### **Projekt 2: Blog Platform** (1 mesec) 
```
Frontend: React + React Router
Backend: FastAPI + PostgreSQL
Features: Posts, comments, kategorije, paginacija
```

### **Projekt 3: E-commerce** (2 meseca)
```
Frontend: React + Redux/Context
Backend: FastAPI + PostgreSQL + Redis
Features: Proizvodi, korpa, checkout, user accounts
```

### **Projekt 4: Real-time Chat** (1 mesec)
```
Frontend: React + WebSockets
Backend: FastAPI + WebSockets + PostgreSQL  
Features: Real-time messaging, rooms, online status
```

## 🎯 DEBUGGING & PROBLEM SOLVING:

### **Frontend Debugging**
```jsx
// Console logging za state debugging
console.log('Current state:', state);

// React DevTools u browser-u
// Network tab za API calls
// Error boundaries za error handling

try {
  const response = await fetch('/api/courses');
  const data = await response.json();
  setCourses(data);
} catch (error) {
  console.error('Error fetching courses:', error);
  setError('Failed to load courses');
}
```

### **Backend Debugging**
```python
# Logging u FastAPI
import logging
logging.info(f"Received request for course {course_id}")

# FastAPI automatic API docs na /docs
# Database query debugging
print(str(query))  # Vidi SQL koji se generiše

# Error handling
try:
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
except Exception as e:
    logging.error(f"Database error: {str(e)}")
    raise HTTPException(status_code=500, detail="Internal server error")
```

## 📈 KAKO DALJE NAPREDOVATI:

1. **Čitajte dokumentaciju**: FastAPI docs, React docs
2. **Pratite best practices**: kod organizacija, naming conventions
3. **Učite od drugih**: GitHub projekti, Stack Overflow
4. **Gradite portfolio**: deployujte projekte na cloud
5. **Uključite se u zajednicu**: Discord/Slack grupe, meetup-ovi
