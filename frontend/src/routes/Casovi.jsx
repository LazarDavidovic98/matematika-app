// 📅 ČASOVI KOMPONENTA - STRANICA ZA ZAKAZIVANJE PRIVATNIH ČASOVA
// ===============================================================
// Ova stranica prikazuje informacije o privatnim časovima i omogućava zakazivanje

import React from 'react';
import BookingForm from '../components/BookingForm';  // Form komponenta za booking
// 🎨 Lucide React ikone za benefits sekciju
import { Clock, Users, Award, CheckCircle, Calendar, MessageCircle } from 'lucide-react';

// 📅 GLAVNA ČASOVI KOMPONENTA
const Casovi = () => {
  
  // 🎯 BENEFITS DATA - prednosti privatnih časova
  // Array objekata koji se mapira u Benefits sekciju
  const benefits = [
    {
      icon: Users,                      // React komponenta ikone
      title: 'Individualan pristup',    // Naslov benefita
      description: 'Jedan nastavnik, jedan student - maksimalna pažnja i prilagođen tempo'
    },
    {
      icon: Clock,
      title: 'Fleksibilno vreme', 
      description: 'Zakažite čas kada vama odgovara - radni dani, vikendom, online ili uživo'
    },
    {
      icon: Award,
      title: 'Garantovani rezultat',
      description: 'Poboljšanje ocena i razumevanja matematike ili povraćaj novca'
    },
    {
      icon: CheckCircle,
      title: 'Stručni nastavnici',
      description: 'Samo proveren kadar sa iskustvom i dokazanim rezultatima'
    }
  ];

  const packages = [
    {
      name: 'Jednokratni čas',
      price: '2000 RSD',
      duration: '60 minuta',
      description: 'Idealno za rešavanje konkretnih problema',
      features: [
        'Individualni pristup',
        'Materijali uključeni',
        'Online ili uživo',
        'Fleksibilno zakazivanje'
      ],
      popular: false
    },
    {
      name: 'Paket od 4 časa',
      price: '7200 RSD',
      originalPrice: '8000 RSD',
      duration: '4 x 60 minuta',
      description: 'Najpopularniji izbor za kontinuirano učenje',
      features: [
        'Sve iz osnovnog paketa',
        'Popust od 10%',
        'Personalizovan plan učenja',
        'Praćenje napretka',
        'WhatsApp podrška'
      ],
      popular: true
    },
    {
      name: 'Mesečni paket',
      price: '12000 RSD',
      originalPrice: '16000 RSD',
      duration: '8 x 60 minuta',
      description: 'Za ozbiljnu pripremu i dublje razumevanje',
      features: [
        'Sve iz premium paketa',
        'Popust od 25%',
        'Dodatni materijali',
        'Probni testovi',
        'Email konsultacije',
        'Garantovano poboljšanje'
      ],
      popular: false
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Popunite formu',
      description: 'Recite nam o sebi i šta želite da učite',
      icon: MessageCircle
    },
    {
      step: '2', 
      title: 'Dobijte potvrdu',
      description: 'Kontaktiraćemo vas u roku od 24h',
      icon: CheckCircle
    },
    {
      step: '3',
      title: 'Započnite učenje',
      description: 'Prvi čas možete zakazati odmah',
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero sekcija */}
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl border border-neutral-200">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
              Privatni Časovi{' '}
              <span className="gradient-text">Matematike</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              Individualni pristup koji garantuje rezultate. Bez čekanja, bez gubitka vremena - 
              fokus samo na vas i vaše ciljeve.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2 text-accent-600">
                <CheckCircle size={20} />
                <span className="font-medium">Dokazani rezultati</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-600">
                <CheckCircle size={20} />
                <span className="font-medium">Fleksibilno vreme</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary-600">
                <CheckCircle size={20} />
                <span className="font-medium">Online i uživo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prednosti */}
      <div className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Zašto privatni časovi?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Individualna nastava omogućava maksimalno iskorišćenje vremena i prilagođavanje vašem tempu učenja.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="card-gradient p-8 hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-800">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cenovnik */}
      <div className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Izaberite paket
            </h2>
            <p className="text-xl text-neutral-600">
              Transparentne cene bez skrivenih troškova
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`card relative p-8 ${pkg.popular ? 'ring-2 ring-primary-500 shadow-xl' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Najpopularniji
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-primary-600">
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-neutral-400 line-through">
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-500">{pkg.duration}</p>
                  </div>
                  <p className="text-neutral-600 mt-4">
                    {pkg.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle size={16} className="text-accent-500 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md hover:shadow-lg' 
                      : 'border-2 border-primary-200 text-primary-600 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  Izaberi paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proces zakazivanja */}
      <div className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50 rounded-2xl">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Kako to funkcioniše?
            </h2>
            <p className="text-xl text-neutral-600">
              Jednostavan proces u samo 3 koraka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Forma za zakazivanje */}
      <div className="section-padding">
        <div className="container-max">
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default Casovi;
