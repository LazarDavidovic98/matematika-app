import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Star, Users, Play, FileText, Award } from 'lucide-react';
import axios from 'axios';

const Kursevi = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('');

  const levels = [
    { value: '', label: 'Svi nivoi' },
    { value: 'osnovna', label: 'Osnovna matematika' },
    { value: 'srednja', label: 'Srednja škola' },
    { value: 'viša', label: 'Viša matematika' },
    { value: 'fakultet', label: 'Fakultet' }
  ];

  // Mock podaci dok ne implementiramo backend pozive
  const mockCourses = [
    {
      id: 1,
      title: 'Osnove Algebre',
      description: 'Kompletnu kurs algebre za početnike. Naučićete osnovne algebarske operacije, jednačine, nejednačine i sisteme jednačina.',
      level: 'osnovna',
      duration_weeks: 8,
      price: 'Besplatno',
      is_active: true,
      lessons_count: 12,
      difficulty: 'Početni',
      rating: 4.8,
      students: 156
    },
    {
      id: 2,
      title: 'Geometrija - Osnove',
      description: 'Osnovni koncepti geometrije, figure, površine i zapremine. Praktični pristup sa mnogo primera.',
      level: 'osnovna',
      duration_weeks: 6,
      price: '3000 RSD',
      is_active: true,
      lessons_count: 10,
      difficulty: 'Početni',
      rating: 4.7,
      students: 98
    },
    {
      id: 3,
      title: 'Trigonometrija',
      description: 'Kompletan kurs trigonometrije - od osnovnih funkcija do složenih identiteta i jednačina.',
      level: 'srednja',
      duration_weeks: 10,
      price: '5000 RSD',
      is_active: true,
      lessons_count: 15,
      difficulty: 'Srednji',
      rating: 4.9,
      students: 234
    },
    {
      id: 4,
      title: 'Analiza - Izvodi',
      description: 'Duboko razumevanje koncept izvoda, primene u geometriji i fizici, optimizacija funkcija.',
      level: 'viša',
      duration_weeks: 12,
      price: '7500 RSD',
      is_active: true,
      lessons_count: 18,
      difficulty: 'Napredni',
      rating: 4.6,
      students: 87
    },
    {
      id: 5,
      title: 'Statistika i Verovatnoća',
      description: 'Praktičan pristup statistici i teoriji verovatnoće sa realnim primerima i slučajevima.',
      level: 'fakultet',
      duration_weeks: 14,
      price: '8500 RSD',
      is_active: true,
      lessons_count: 20,
      difficulty: 'Napredni',
      rating: 4.8,
      students: 145
    },
    {
      id: 6,
      title: 'Priprema za Maturu',
      description: 'Kompletan kurs pripreme za državnu maturu iz matematike. Svi tipovi zadataka i strategije rešavanja.',
      level: 'srednja',
      duration_weeks: 16,
      price: '6000 RSD',
      is_active: true,
      lessons_count: 24,
      difficulty: 'Srednji',
      rating: 4.9,
      students: 312
    }
  ];

  useEffect(() => {
    // Simuliramo API poziv
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = selectedLevel 
    ? courses.filter(course => course.level === selectedLevel)
    : courses;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Početni': return 'text-accent-600 bg-accent-100';
      case 'Srednji': return 'text-primary-600 bg-primary-100';
      case 'Napredni': return 'text-secondary-600 bg-secondary-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="bg-neutral-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-neutral-200 h-6 rounded mb-2"></div>
                <div className="bg-neutral-200 h-4 rounded mb-4"></div>
                <div className="bg-neutral-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero sekcija */}
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl border border-neutral-200">
        <div className="container-max text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            Matematički{' '}
            <span className="gradient-text">Kursevi</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Strukturirani kursevi za sve nivoe znanja. Od osnovnih pojmova do naprednih tema - 
            svaki kurs je pažljivo dizajniran da maksimalno ubrza vaše učenje.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 text-accent-600">
              <BookOpen size={20} />
              <span className="font-medium">Strukturirani sadržaj</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Play size={20} />
              <span className="font-medium">Video lekcije</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <Award size={20} />
              <span className="font-medium">Sertifikat po završetku</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filteri */}
      <div className="section-padding">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nivo obrazovanja
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="input-field"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={() => setSelectedLevel('')}
                className="btn-secondary h-12"
              >
                Poništi filtere
              </button>
            </div>
          </div>

          {/* Statistika */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {courses.length}
              </div>
              <div className="text-neutral-600">Dostupnih kurseva</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-accent-600 mb-2">
                1000+
              </div>
              <div className="text-neutral-600">Studenata</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-secondary-600 mb-2">
                4.8★
              </div>
              <div className="text-neutral-600">Prosečna ocena</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                95%
              </div>
              <div className="text-neutral-600">Završava kurs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista kurseva */}
      <div className="section-padding">
        <div className="container-max">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                Nema kurseva za izabrani filter
              </h3>
              <p className="text-neutral-500">
                Pokušajte sa drugim kriterijumima pretrage
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="card hover-lift overflow-hidden">
                  {/* Course image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-200 via-accent-200 to-secondary-200 flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen size={48} className="mx-auto mb-2 opacity-80" />
                      <p className="font-semibold">{course.title}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-neutral-500">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-800">
                        {course.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                    
                    {/* Metapodaci */}
                    <div className="space-y-2 text-sm text-neutral-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{course.duration_weeks} nedelja</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText size={14} />
                          <span>{course.lessons_count} lekcija</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{course.students} studenata</span>
                      </div>
                    </div>
                    
                    {/* Cena i akcija */}
                    <div className="pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-primary-600">
                            {course.price}
                          </span>
                          {course.price !== 'Besplatno' && (
                            <span className="text-sm text-neutral-500 ml-1">
                              / kurs
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className="btn-primary w-full">
                          {course.price === 'Besplatno' ? 'Počni besplatno' : 'Kupi kurs'}
                        </button>
                        <button className="btn-secondary w-full text-sm">
                          Pogledaj program
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA sekcija */}
      <div className="section-padding bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ne vidite kurs koji tražite?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Kontaktirajte nas i predložite temu. Redovno dodajemo nove kurseve 
            na osnovu potreba naših studenata.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-medium py-3 px-8 rounded-lg hover:bg-neutral-50 transition-colors">
              Predloži kurs
            </button>
            <button className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              Zakaži konsultacije
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kursevi;
