-- Početni podaci za Matematika App
-- Ovaj fajl se automatski izvršava prilikom kreiranja PostgreSQL kontejnera

-- Umetanje primer kurseva
INSERT INTO courses (title, description, level, duration_weeks, price, is_active) VALUES
('Osnove Algebre', 'Kompletnu kurs algebre za početnike. Naučićete osnovne algebarske operacije, jednačine, nejednačine i sisteme jednačina.', 'osnovna', 8, 'Besplatno', true),
('Geometrija - Osnove', 'Osnovni koncepti geometrije, figure, površine i zapremine. Praktični pristup sa mnogo primera.', 'osnovna', 6, '3000 RSD', true),
('Trigonometrija', 'Kompletan kurs trigonometrije - od osnovnih funkcija do složenih identiteta i jednačina.', 'srednja', 10, '5000 RSD', true),
('Analiza - Izvodi', 'Duboko razumevanje koncept izvoda, primene u geometriji i fizici, optimizacija funkcija.', 'viša', 12, '7500 RSD', true),
('Statistika i Verovatnoća', 'Praktičan pristup statistici i teoriji verovatnoće sa realnim primerima i slučajevima.', 'viša', 14, '8500 RSD', true),
('Priprema za Maturu', 'Kompletan kurs pripreme za državnu maturu iz matematike. Svi tipovi zadataka i strategije rešavanja.', 'srednja', 16, '6000 RSD', true);

-- Umetanje primer lekcija
INSERT INTO lessons (title, content, course_id, order_number, difficulty, is_free) VALUES
('Uvod u algebru', 'Osnovni pojmovi algebre, varijable i konstante. U ovoj lekciji ćemo objasniti šta je algebra i zašto je važna.', 1, 1, 'lako', true),
('Linearne jednačine', 'Rešavanje linearnih jednačina sa jednom nepoznatom. Naučićete različite metode rešavanja.', 1, 2, 'lako', true),
('Kvadratne jednačine', 'Rešavanje kvadratnih jednačina različitim metodama: faktorizacijom, kvadratnom formulom.', 1, 3, 'srednje', false),
('Osnove geometrije', 'Tačke, prave, uglovi i osnovne geometrijske figure. Fundamentalni koncepti geometrije.', 2, 1, 'lako', true),
('Trouglovi', 'Vrste trouglova, teorema o trouglovima, računanje površina i obima.', 2, 2, 'srednje', true),
('Trigonometrijske funkcije', 'Sin, cos, tan funkcije i njihove osnove. Jedinična kružnica i osnovni identiteti.', 3, 1, 'teško', false);

-- Umetanje primer definicija
INSERT INTO definitions (term, definition, category, level, example, formula) VALUES
('Funkcija', 'Funkcija je pravilo koje svakom elementu iz domena (polazni skup) dodeljuje tačno jedan element iz kodomena (odredišni skup).', 'algebra', 'srednja', 'f(x) = 2x + 1 je linearna funkcija koja svakom broju x dodeljuje vrednost 2x + 1.', 'f: A → B, gde je A domen, B kodomen'),
('Pitagorina teorema', 'U pravouglom trouglu, kvadrat hipotenuze jednak je zbiru kvadrata kateta.', 'geometrija', 'osnovna', 'U trouglu sa katetama a=3, b=4, hipotenuza je c=5, jer 3² + 4² = 5²', 'a² + b² = c²'),
('Sinus', 'Sinus ugla u pravouglom trouglu je odnos dužine naspramne katete i hipotenuze.', 'trigonometrija', 'srednja', 'Za ugao od 30°, sin(30°) = 1/2', 'sin(α) = naspramna kateta / hipotenuza'),
('Izvod funkcije', 'Izvod funkcije u tački predstavlja granicu količnika priraštaja funkcije i priraštaja argumenta kada priraštaj argumenta teži nuli.', 'analiza', 'viša', 'Izvod funkcije f(x) = x² je f\'(x) = 2x', 'f\'(x) = lim[h→0] (f(x+h) - f(x))/h'),
('Standardna devijacija', 'Mera raspršenosti podataka oko aritmetičke sredine. Pokazuje koliko se u proseku podaci razlikuju od srednje vrednosti.', 'statistika', 'viša', 'Za niz podataka [2, 4, 4, 4, 5, 5, 7, 9] standardna devijacija je približno 2.', 'σ = √(Σ(xi - μ)² / N)'),
('Prost broj', 'Prirodan broj veći od 1 koji ima tačno dva delioca: 1 i sebe.', 'teorija brojeva', 'osnovna', 'Brojevi 2, 3, 5, 7, 11, 13 su prosti brojevi.', 'p je prost ⟺ p > 1 ∧ d|p ⟹ d ∈ {1, p}'),
('Integral', 'Integral funkcije predstavlja površinu između krive funkcije i x-ose na određenom intervalu.', 'analiza', 'viša', '∫₀¹ x dx = 1/2 (površina trougla)', '∫ₐᵇ f(x)dx = F(b) - F(a)'),
('Matrica', 'Pravougaona tabela brojeva organizovana u redove i kolone.', 'algebra', 'srednja', 'A = [1 2; 3 4] je matrica 2×2', 'A = [aᵢⱼ]ₘₓₙ');

-- Kreiranje indeksa za bolje performanse
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_free ON lessons(is_free);
CREATE INDEX IF NOT EXISTS idx_definitions_category ON definitions(category);
CREATE INDEX IF NOT EXISTS idx_definitions_level ON definitions(level);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(is_read);
