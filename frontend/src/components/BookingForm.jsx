import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, BookOpen, MessageCircle, Send } from 'lucide-react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    subject: '',
    preferred_date: '',
    preferred_time: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const timeSlots = [
    'ujutru (9:00 - 12:00)',
    'popodne (13:00 - 17:00)',
    'veče (18:00 - 21:00)',
    'fleksibilno vreme'
  ];

  const mathTopics = [
    'Osnovna matematika',
    'Algebra',
    'Geometrija',
    'Trigonometrija',
    'Analiza (izvodi, integrali)',
    'Statistika i verovatnoća',
    'Priprema za prijemni ispit',
    'Priprema za maturu',
    'Ostalo (navedite u poruci)'
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
      const response = await axios.post('/api/bookings/', {
        ...formData,
        preferred_date: formData.preferred_date || null
      });

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message
        });
        // Reset form
        setFormData({
          student_name: '',
          student_email: '',
          student_phone: '',
          subject: '',
          preferred_date: '',
          preferred_time: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.detail || 'Greška pri slanju zahteva. Pokušajte ponovo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card-gradient p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Zakažite Privatni Čas
          </h2>
          <p className="text-neutral-600 text-lg">
            Popunite formu i uskoro ćete dobiti potvrdu termina
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
          {/* Lični podaci */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
                <User size={16} />
                <span>Ime i prezime *</span>
              </label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
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
                name="student_email"
                value={formData.student_email}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="vas.email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
              <Phone size={16} />
              <span>Broj telefona</span>
            </label>
            <input
              type="tel"
              name="student_phone"
              value={formData.student_phone}
              onChange={handleInputChange}
              className="input-field"
              placeholder="+381 60 123 4567"
            />
          </div>

          {/* Detalji časa */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
              <BookOpen size={16} />
              <span>Tema/Oblast matematike</span>
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Izaberite temu...</option>
              {mathTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
                <Calendar size={16} />
                <span>Željeni datum</span>
              </label>
              <input
                type="date"
                name="preferred_date"
                value={formData.preferred_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
                <Clock size={16} />
                <span>Željeno vreme</span>
              </label>
              <select
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Izaberite vreme...</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center space-x-2">
              <MessageCircle size={16} />
              <span>Dodatne informacije</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Opišite konkretno šta želite da radite na času, vaš nivo znanja, specifične probleme..."
            />
          </div>

          <div className="pt-6">
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
                  <span>Pošaljite Zahtev</span>
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
  );
};

export default BookingForm;
