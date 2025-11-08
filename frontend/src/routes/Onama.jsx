import React from 'react';
import { GraduationCap, Target, Award, Heart, Users } from 'lucide-react';

const Onama = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'Stručnost',
      description: 'Dugogodišnje iskustvo u nastavi matematike i radu sa studentima različitih uzrasta.'
    },
    {
      icon: Target,
      title: 'Individualni pristup',
      description: 'Prilagođavamo metode nastave svakom studentu prema njegovim potrebama i tempu učenja.'
    },
    {
      icon: Award,
      title: 'Dokazani rezultati',
      description: 'Naši studenti postižu odlične rezultate na ispitima i takmičenjima iz matematike.'
    },
    {
      icon: Heart,
      title: 'Strast prema nastavi',
      description: 'Matematiku volimo i tu ljubav prenosimo na naše studente kroz zanimljivu nastavu.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Uspešnih studenata', color: 'primary' },
    { number: '5+', label: 'Godina iskustva', color: 'accent' },
    { number: '100%', label: 'Zadovoljstvo roditelja', color: 'secondary' },
    { number: '24/7', label: 'Podrška online', color: 'primary' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero sekcija */}
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl border border-neutral-200">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
                  Dobrodošli u{' '}
                  <span className="gradient-text">Matematika App</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Vaš put ka razumevanju matematike počinje ovde. Pružamo kvalitetno obrazovanje 
                  kroz moderne metode nastave i personalizovan pristup svakom studentu.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  📚 Online kursevi
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800">
                  👨‍🏫 Privatni časovi
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                  📖 Besplatni materijali
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="btn-primary">
                  Započni učenje
                </button>
                <button className="btn-secondary">
                  Zakaži privatni čas
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-200 to-accent-200 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                    <img src="/logo-bulb.png" alt="Matematika Logo" className="w-45 h-45 object-contain" />
                  </div>
                  <div className="text-black">
                    <h3 className="text-2xl font-bold mb-2">Učenje matematike</h3>
                    <p className="text-primary-100">Jednostavno i efikasno</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistike */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="card text-center p-6 hover-lift"
              >
                <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Naše vrednosti */}
      <div className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Zašto izabrati nas?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Naš pristup obrazovanju zasnovan je na dokazanim metodama i dubokome razumevanju 
              potreba svakog studenta.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="card-gradient p-8 hover-lift"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-800">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Naša misija */}
      <div className="section-padding bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">
            Naša Misija
          </h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            Verujemo da svaki student može da uspe u matematici uz pravi pristup i podršku. 
            Naša misija je da činimo matematiku pristupačnom, razumljivom i zanimljivom kroz 
            inovativne metode nastave i personalizovan pristup.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="space-y-2">
              <Users size={32} className="mx-auto mb-2 opacity-90" />
              <h4 className="font-semibold">Za sve uzraste</h4>
              <p className="text-sm opacity-80">Od osnovne do visokih škola</p>
            </div>
            <div className="space-y-2">
              <Target size={32} className="mx-auto mb-2 opacity-90" />
              <h4 className="font-semibold">Ciljan pristup</h4>
              <p className="text-sm opacity-80">Prema individualnim potrebama</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-2">
                <img src="/logo-bulb.png" alt="Matematika Logo" className="w-8 h-8 object-contain opacity-90" />
              </div>
              <h4 className="font-semibold">Kvalitetni materijali</h4>
              <p className="text-sm opacity-80">Stalno ažuriranje sadržaja</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kontakt poziv */}
      <div className="section-padding">
        <div className="container-max">
          <div className="card-gradient text-center p-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Spremni ste da počnete?
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Kontaktirajte nas već danas i zakazite besplatno konsultovanje. 
              Pomoći ćemo vam da definišete svoj put ka uspehu u matematici.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8">
                Zakaži besplatno konsultovanje
              </button>
              <button className="btn-secondary text-lg px-8">
                Pogledaj kurseve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onama;
