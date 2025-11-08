import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, User } from 'lucide-react';
import axios from 'axios';

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'lazar.davidovic98@gmail.com',
      description: 'Pošaljite nam email u bilo koje vreme'
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '+381 60 123 4567',
      description: 'Pozovite nas radnim danima 9-17h'
    },
    {
      icon: MapPin,
      title: 'Lokacija',
      content: 'Beograd, Srbija',
      description: 'Časovi se održavaju online ili kod vas'
    },
    {
      icon: Clock,
      title: 'Radno vreme',
      content: 'Pon - Pet: 9:00 - 17:00',
      description: 'Vikendom po dogovoru'
    }
  ];

  const subjects = [
    'Opšte pitanje',
    'Zakazivanje privatnog časa',
    'Pitanje o kursu',
    'Tehnička podrška',
    'Saradnja',
    'Ostalo'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/contact/', formData);

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.detail || 'Greška pri slanju poruke. Pokušajte ponovo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero sekcija */}
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl border border-neutral-200">
        <div className="container-max text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            Kontaktirajte{' '}
            <span className="gradient-text">Nas</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Imate pitanje, potrebna vam je pomoć ili želite da zakažete čas? 
            Tu smo da odgovorimo na sva vaša pitanja.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 text-accent-600">
              <MessageCircle size={20} />
              <span className="font-medium">Brze reakcije</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <Clock size={20} />
              <span className="font-medium">24h podrška</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <User size={20} />
              <span className="font-medium">Personalizovana pomoć</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kontakt informacije */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-4">
                  Dođite u kontakt
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Spremni smo da vam pomognemo u vašem putu učenja matematike. 
                  Kontaktirajte nas putem bilo kog od sledećih načina.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="card-gradient p-6 hover-lift">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-neutral-800">
                            {info.title}
                          </h3>
                          <p className="text-primary-600 font-medium">
                            {info.content}
                          </p>
                          <p className="text-neutral-600 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mapa placeholder */}
              <div className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                  Gde se nalazimo
                </h3>
                <div className="h-48 bg-gradient-to-br from-primary-200 to-accent-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin size={48} className="mx-auto mb-2 opacity-80" />
                    <p className="font-semibold">Beograd, Srbija</p>
                    <p className="text-sm opacity-80">Online časovi dostupni svuda</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontakt forma */}
            <div className="card-gradient p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold gradient-text mb-2">
                  Pošaljite nam poruku
                </h2>
                <p className="text-neutral-600">
                  Popunite formu i odgovoriće vam se u najkraćem roku.
                </p>
              </div>

              {/* Status poruke */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  submitStatus.type === 'success' 
                    ? 'bg-accent-50 border-accent-200 text-accent-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center space-x-2">
                    {submitStatus.type === 'success' ? (
                      <div className="w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                    )}
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
                      <User size={16} />
                      <span>Ime i prezime *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Vaše ime i prezime"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
                      <Mail size={16} />
                      <span>Email adresa *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="vas.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
                    <MessageCircle size={16} />
                    <span>Naslov poruke</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Izaberite naslov...</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Vaša poruka *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Opišite vaše pitanje ili zahtev..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full flex items-center justify-center space-x-2 text-lg ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Šalje se...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Pošalji poruku</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-sm text-neutral-500">
                  <p>
                    * Obavezna polja. Odgovoriće vam se u roku od 24 sata.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ sekcija */}
      <div className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Često postavljana pitanja
            </h2>
            <p className="text-xl text-neutral-600">
              Možda ćete pronaći odgovor na vaše pitanje ovde
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Koliko košta privatni čas?',
                answer: 'Cena privatnog časa je 2000 RSD po času (60 minuta). Nudimo i pakete sa popustom.'
              },
              {
                question: 'Da li se časovi održavaju online?',
                answer: 'Da, časovi se mogu održavati online preko Zoom-a ili uživo, prema vašoj želji.'
              },
              {
                question: 'Kako da zakažem čas?',
                answer: 'Možete zakazati čas putem forme na stranici "Časovi" ili direktno kontaktiranjem.'
              },
              {
                question: 'Da li ima besplatnih materijala?',
                answer: 'Da, imamo mnoge besplatne video lekcije i materijale dostupne svima.'
              },
              {
                question: 'Za koje uzraste držite časove?',
                answer: 'Držimo časove za sve uzraste - od osnovne škole do fakulteta.'
              },
              {
                question: 'Kako da platim čas?',
                answer: 'Plaćanje je moguće unapred putem bankovnog transfera ili nakon časa.'
              }
            ].map((faq, index) => (
              <div key={index} className="card-gradient p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA sekcija */}
      <div className="section-padding bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">
            Spremni za prvi čas?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Ne oklевajte - kontaktirajte nas već danas i napravite prvi korak 
            ka boljem razumevanju matematike.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-medium py-3 px-8 rounded-lg hover:bg-neutral-50 transition-colors">
              Zakaži besplatno konsultovanje
            </button>
            <button className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              Pozovi odmah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;
