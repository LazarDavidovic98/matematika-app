import React, { useState, useEffect } from 'react';
import { Search, BookMarked, Hash, Filter, Copy, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Definicije = () => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const categories = [
    { value: '', label: 'Sve kategorije' },
    { value: 'algebra', label: 'Algebra' },
    { value: 'geometrija', label: 'Geometrija' },
    { value: 'trigonometrija', label: 'Trigonometrija' },
    { value: 'analiza', label: 'Analiza' },
    { value: 'statistika', label: 'Statistika' },
    { value: 'teorija brojeva', label: 'Teorija brojeva' },
    { value: 'logika', label: 'Matematička logika' }
  ];

  const levels = [
    { value: '', label: 'Svi nivoi' },
    { value: 'osnovna', label: 'Osnovna matematika' },
    { value: 'srednja', label: 'Srednja škola' },
    { value: 'viša', label: 'Viša matematika' }
  ];

  // Mock podaci
  const mockDefinitions = [
    {
      id: 1,
      term: 'Funkcija',
      definition: 'Funkcija je pravilo koje svakom elementu iz domena (polazni skup) dodeljuje tačno jedan element iz kodomena (odredišni skup).',
      category: 'algebra',
      level: 'srednja',
      example: 'f(x) = 2x + 1 je linearna funkcija koja svakom broju x dodeljuje vrednost 2x + 1.',
      formula: 'f: A → B, gde je A domen, B kodomen'
    },
    {
      id: 2,
      term: 'Izvod funkcije',
      definition: 'Izvod funkcije u tački predstavlja granicu količnika priraštaja funkcije i priraštaja argumenta kada priraštaj argumenta teži nuli.',
      category: 'analiza',
      level: 'viša',
      example: 'Izvod funkcije f(x) = x² je f\'(x) = 2x',
      formula: 'f\'(x) = lim[h→0] (f(x+h) - f(x))/h'
    },
    {
      id: 3,
      term: 'Pitagorina teorema',
      definition: 'U pravouglom trouglu, kvadrat hipotenuze jednak je zbiru kvadrata kateta.',
      category: 'geometrija',
      level: 'osnovna',
      example: 'U trouglu sa katetama a=3, b=4, hipotenuza je c=5, jer 3² + 4² = 5²',
      formula: 'a² + b² = c²'
    },
    {
      id: 4,
      term: 'Sinus',
      definition: 'Sinus ugla u pravouglom trouglu je odnos dužine naspramne katete i hipotenuze.',
      category: 'trigonometrija',
      level: 'srednja',
      example: 'Za ugao od 30°, sin(30°) = 1/2',
      formula: 'sin(α) = naspramna kateta / hipotenuza'
    },
    {
      id: 5,
      term: 'Standardna devijacija',
      definition: 'Mera raspršenosti podataka oko aritmetičke sredine. Pokazuje koliko se u proseku podaci razlikuju od srednje vrednosti.',
      category: 'statistika',
      level: 'viša',
      example: 'Za niz podataka [2, 4, 4, 4, 5, 5, 7, 9] standardna devijacija je približno 2.',
      formula: 'σ = √(Σ(xi - μ)² / N)'
    },
    {
      id: 6,
      term: 'Prost broj',
      definition: 'Prirodan broj veći od 1 koji ima tačno dva delioca: 1 i sebe.',
      category: 'teorija brojeva',
      level: 'osnovna',
      example: 'Brojevi 2, 3, 5, 7, 11, 13 su prosti brojevi.',
      formula: 'p je prost ⟺ p > 1 ∧ d|p ⟹ d ∈ {1, p}'
    },
    {
      id: 7,
      term: 'Integral',
      definition: 'Integral funkcije predstavlja površinu između krive funkcije i x-ose na određenom intervalu.',
      category: 'analiza',
      level: 'viša',
      example: '∫₀¹ x dx = 1/2 (površina trougla)',
      formula: '∫ₐᵇ f(x)dx = F(b) - F(a)'
    },
    {
      id: 8,
      term: 'Matrica',
      definition: 'Pravougaona tabela brojeva organizovana u redove i kolone.',
      category: 'algebra',
      level: 'srednja',
      example: 'A = [1 2; 3 4] je matrica 2×2',
      formula: 'A = [aᵢⱼ]ₘₓₙ'
    }
  ];

  useEffect(() => {
    // Simuliramo API poziv
    setTimeout(() => {
      setDefinitions(mockDefinitions);
      setLoading(false);
    }, 800);
  }, []);

  const filteredDefinitions = definitions.filter(def => {
    const matchesSearch = def.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         def.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (def.example && def.example.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || def.category === selectedCategory;
    const matchesLevel = !selectedLevel || def.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Ovde bismo dodali toast notifikaciju
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'osnovna': return 'text-accent-600 bg-accent-100';
      case 'srednja': return 'text-primary-600 bg-primary-100';
      case 'viša': return 'text-secondary-600 bg-secondary-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      algebra: 'bg-blue-100 text-blue-800',
      geometrija: 'bg-green-100 text-green-800',
      trigonometrija: 'bg-purple-100 text-purple-800',
      analiza: 'bg-red-100 text-red-800',
      statistika: 'bg-yellow-100 text-yellow-800',
      'teorija brojeva': 'bg-indigo-100 text-indigo-800',
      logika: 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800';
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="bg-neutral-200 h-6 rounded mb-4"></div>
                <div className="bg-neutral-200 h-20 rounded mb-4"></div>
                <div className="bg-neutral-200 h-4 rounded"></div>
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
            Matematičke{' '}
            <span className="gradient-text">Definicije</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Kompletna baza matematičkih pojmova, definicija i formula. Brzo pronađite 
            objašnjenje za svaki matematički termin.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 text-accent-600">
              <BookMarked size={20} />
              <span className="font-medium">{definitions.length}+ definicija</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Hash size={20} />
              <span className="font-medium">Sve oblasti matematike</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <Search size={20} />
              <span className="font-medium">Napredna pretraga</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pretraga i filteri */}
      <div className="section-padding">
        <div className="container-max">
          <div className="card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Pretraga */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    type="text"
                    placeholder="Pretražite definicije..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Kategorija */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nivo */}
              <div>
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
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-neutral-600">
                Pronađeno {filteredDefinitions.length} definicija
              </div>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedLevel('');
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Poništi filtere
              </button>
            </div>
          </div>

          {/* Statistika */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {categories.slice(1).map((category, index) => {
              const count = definitions.filter(d => d.category === category.value).length;
              return (
                <div key={index} className="card text-center p-4">
                  <div className="text-lg font-bold text-primary-600 mb-1">
                    {count}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {category.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista definicija */}
      <div className="section-padding">
        <div className="container-max">
          {filteredDefinitions.length === 0 ? (
            <div className="text-center py-12">
              <BookMarked size={48} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                Nema rezultata za vašu pretragu
              </h3>
              <p className="text-neutral-500">
                Pokušajte sa drugim ključnim rečima ili filtrima
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDefinitions.map((definition) => (
                <div key={definition.id} className="card hover-lift p-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-neutral-800 flex-1">
                        {definition.term}
                      </h3>
                      <button 
                        onClick={() => copyToClipboard(definition.term)}
                        className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                        title="Kopiraj termin"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(definition.category)}`}>
                        {categories.find(c => c.value === definition.category)?.label}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(definition.level)}`}>
                        {levels.find(l => l.value === definition.level)?.label}
                      </span>
                    </div>
                  </div>

                  {/* Definicija */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-600 mb-2">Definicija:</h4>
                      <p className="text-neutral-700 leading-relaxed">
                        {definition.definition}
                      </p>
                    </div>

                    {/* Formula */}
                    {definition.formula && (
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-600 mb-2">Formula:</h4>
                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                          <code className="text-primary-700 font-mono text-sm">
                            {definition.formula}
                          </code>
                          <button 
                            onClick={() => copyToClipboard(definition.formula)}
                            className="ml-2 p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                            title="Kopiraj formulu"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Primer */}
                    {definition.example && (
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-600 mb-2">Primer:</h4>
                        <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                          <p className="text-accent-800 text-sm">
                            {definition.example}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Akcije */}
                  <div className="pt-4 border-t border-neutral-100 flex gap-2">
                    <button className="btn-secondary text-sm flex-1 flex items-center justify-center space-x-1">
                      <ExternalLink size={14} />
                      <span>Više detalja</span>
                    </button>
                    <button 
                      onClick={() => copyToClipboard(`${definition.term}: ${definition.definition}`)}
                      className="btn-secondary text-sm flex items-center space-x-1 px-4"
                    >
                      <Copy size={14} />
                      <span>Kopiraj</span>
                    </button>
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
            Nedostaje vam neka definicija?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Naša baza definicija se stalno proširuje. Predložite nam nove termine 
            koje želite da vidite u našoj kolekciji.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-medium py-3 px-8 rounded-lg hover:bg-neutral-50 transition-colors">
              Predloži definiciju
            </button>
            <button className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              Kontaktiraj nas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Definicije;
