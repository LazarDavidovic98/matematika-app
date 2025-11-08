import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Download, Eye, Clock, Filter, Search } from 'lucide-react';
import axios from 'axios';

const Lekcije = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);

  const difficulties = [
    { value: '', label: 'Svi nivoi' },
    { value: 'lako', label: 'Početni nivo' },
    { value: 'srednje', label: 'Srednji nivo' },
    { value: 'teško', label: 'Napredni nivo' }
  ];

  const courses = [
    { value: '', label: 'Svi kursevi' },
    { value: 'algebra', label: 'Algebra' },
    { value: 'geometrija', label: 'Geometrija' },
    { value: 'trigonometrija', label: 'Trigonometrija' },
    { value: 'analiza', label: 'Matematička analiza' }
  ];

  // Mock podaci
  const mockLessons = [
    {
      id: 1,
      title: 'Uvod u algebru',
      content: 'Osnovni pojmovi algebre, varijable i konstante.',
      course: 'algebra',
      order_number: 1,
      video_url: 'https://example.com/video1',
      pdf_url: 'https://example.com/pdf1',
      difficulty: 'lako',
      is_free: true,
      duration: 15,
      views: 1250
    },
    {
      id: 2,
      title: 'Linearne jednačine',
      content: 'Rešavanje linearnih jednačina sa jednom nepoznatom.',
      course: 'algebra',
      order_number: 2,
      video_url: 'https://example.com/video2',
      pdf_url: 'https://example.com/pdf2',
      difficulty: 'lako',
      is_free: true,
      duration: 20,
      views: 980
    },
    {
      id: 3,
      title: 'Kvadratne jednačine',
      content: 'Rešavanje kvadratnih jednačina različitim metodama.',
      course: 'algebra',
      order_number: 3,
      video_url: 'https://example.com/video3',
      pdf_url: 'https://example.com/pdf3',
      difficulty: 'srednje',
      is_free: false,
      duration: 25,
      views: 756
    },
    {
      id: 4,
      title: 'Osnove geometrije',
      content: 'Tačke, prave, uglovi i osnovne geometrijske figure.',
      course: 'geometrija',
      order_number: 1,
      video_url: 'https://example.com/video4',
      pdf_url: 'https://example.com/pdf4',
      difficulty: 'lako',
      is_free: true,
      duration: 18,
      views: 1100
    },
    {
      id: 5,
      title: 'Trouglovi',
      content: 'Vrste trouglova, teorema o trouglovima.',
      course: 'geometrija',
      order_number: 2,
      video_url: 'https://example.com/video5',
      pdf_url: 'https://example.com/pdf5',
      difficulty: 'srednje',
      is_free: true,
      duration: 22,
      views: 890
    },
    {
      id: 6,
      title: 'Trigonometrijske funkcije',
      content: 'Sin, cos, tan funkcije i njihove osnove.',
      course: 'trigonometrija',
      order_number: 1,
      video_url: 'https://example.com/video6',
      pdf_url: 'https://example.com/pdf6',
      difficulty: 'teško',
      is_free: false,
      duration: 30,
      views: 650
    }
  ];

  useEffect(() => {
    // Simuliramo API poziv
    setTimeout(() => {
      setLessons(mockLessons);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || lesson.difficulty === selectedDifficulty;
    const matchesCourse = !selectedCourse || lesson.course === selectedCourse;
    const matchesFree = !freeOnly || lesson.is_free;
    
    return matchesSearch && matchesDifficulty && matchesCourse && matchesFree;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'lako': return 'text-accent-600 bg-accent-100';
      case 'srednje': return 'text-primary-600 bg-primary-100';
      case 'teško': return 'text-secondary-600 bg-secondary-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'lako': return 'Početni';
      case 'srednje': return 'Srednji';
      case 'teško': return 'Napredni';
      default: return difficulty;
    }
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="bg-neutral-200 h-40 rounded-lg mb-4"></div>
                <div className="bg-neutral-200 h-6 rounded mb-2"></div>
                <div className="bg-neutral-200 h-4 rounded mb-4"></div>
                <div className="bg-neutral-200 h-8 rounded"></div>
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
            Besplatne{' '}
            <span className="gradient-text">Lekcije</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Pristupite našoj biblioteci video lekcija i materijala. Učite u svom tempu, 
            kada vam odgovara.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 text-accent-600">
              <Play size={20} />
              <span className="font-medium">HD video kvalitet</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Download size={20} />
              <span className="font-medium">Materijali za download</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <BookOpen size={20} />
              <span className="font-medium">Detaljne beleške</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pretraga i filteri */}
      <div className="section-padding">
        <div className="container-max">
          <div className="card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Pretraga */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    type="text"
                    placeholder="Pretražite lekcije..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Težina */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="input-field"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kurs */}
              <div>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="input-field"
                >
                  {courses.map((course) => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeOnly}
                    onChange={(e) => setFreeOnly(e.target.checked)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    Samo besplatne lekcije
                  </span>
                </label>
              </div>

              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('');
                  setSelectedCourse('');
                  setFreeOnly(false);
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Poništi filtere
              </button>
            </div>
          </div>

          {/* Statistika */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {filteredLessons.length}
              </div>
              <div className="text-neutral-600">Lekcija</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-accent-600 mb-2">
                {filteredLessons.filter(l => l.is_free).length}
              </div>
              <div className="text-neutral-600">Besplatno</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-secondary-600 mb-2">
                {Math.round(filteredLessons.reduce((acc, l) => acc + l.duration, 0) / 60)}h
              </div>
              <div className="text-neutral-600">Video sadržaja</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {filteredLessons.reduce((acc, l) => acc + l.views, 0).toLocaleString()}
              </div>
              <div className="text-neutral-600">Pregleda</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista lekcija */}
      <div className="section-padding">
        <div className="container-max">
          {filteredLessons.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                Nema lekcija za zadatu pretragu
              </h3>
              <p className="text-neutral-500">
                Pokušajte sa drugim kriterijumima
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="card hover-lift overflow-hidden">
                  {/* Video thumbnail */}
                  <div className="relative h-40 bg-gradient-to-br from-primary-200 via-accent-200 to-secondary-200 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {lesson.duration} min
                    </div>
                    
                    {/* Free badge */}
                    {lesson.is_free && (
                      <div className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Besplatno
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {getDifficultyLabel(lesson.difficulty)}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-neutral-500">
                          <Eye size={14} />
                          <span>{lesson.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-neutral-800 line-clamp-2">
                        {lesson.title}
                      </h3>
                      
                      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                        {lesson.content}
                      </p>
                    </div>
                    
                    {/* Metapodaci */}
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{lesson.duration} min</span>
                      </div>
                      <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
                        {courses.find(c => c.value === lesson.course)?.label || lesson.course}
                      </span>
                    </div>
                    
                    {/* Akcije */}
                    <div className="pt-4 border-t border-neutral-100 space-y-2">
                      <button className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        lesson.is_free 
                          ? 'bg-accent-500 hover:bg-accent-600 text-white'
                          : 'bg-primary-500 hover:bg-primary-600 text-white'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          <Play size={16} />
                          <span>{lesson.is_free ? 'Pogledaj besplatno' : 'Kupi pristup'}</span>
                        </div>
                      </button>
                      
                      {lesson.pdf_url && (
                        <button className="w-full btn-secondary text-sm flex items-center justify-center space-x-2">
                          <Download size={16} />
                          <span>Preuzmi materijale</span>
                        </button>
                      )}
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
            Želite pristup svim lekcijama?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Postanite premium član i dobijte neograničen pristup svim video lekcijama, 
            materijalima i ekskluzivnim sadržajima.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-medium py-3 px-8 rounded-lg hover:bg-neutral-50 transition-colors">
              Postani premium član
            </button>
            <button className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              Saznaj više o planovima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lekcije;
