-- Početni podaci za Matematika App
-- Ovaj fajl se automatski izvršava prilikom kreiranja PostgreSQL kontejnera

-- Umetanje primer kursa
INSERT INTO courses (title, description, level, duration_weeks, price, is_active) VALUES
('Uvod u matematičku logiku', 'Osnove matematičke logike, logičke formule, iskazna logika i osnove dokazivanja. Materijali dostupni u PDF formatu sa detaljnim objašnjenjima i primerima.', 'osnovna', 4, 'Besplatno', true);

-- Umetanje primer lekcije (samo PDF materijali)
INSERT INTO lessons (title, content, course_id, order_number, pdf_url, difficulty, is_free) VALUES
('Uvod u matematičku logiku', 'Osnove matematičke logike, logičke formule, iskazna logika i osnove dokazivanja. Detaljno objašnjenje sa primerima logičkih formula i osnovnih pravila zaključivanja.', 1, 1, 'Uvod u matematičku logiku.pdf', 'lako', true);

-- Kreiranje indeksa za bolje performanse (PostgreSQL sintaksa)
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_free ON lessons(is_free);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(is_read);
