import React, { useState } from 'react';
import { LogIn, User, Lock, BookOpen } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simuliramo malo delay za bolje korisničko iskustvo
    setTimeout(() => {
      if (credentials.username === 'Lazar' && credentials.password === 'Davidovic') {
        onLogin();
      } else {
        setError('Netačno korisničko ime ili lozinka');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Uklanjamo grešku kad korisnik počne da kuca
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-accent-50 to-secondary-100">
      <div className="max-w-md w-full space-y-8 p-8 login-fade-in">
        {/* Logo i naslov */}
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mx-auto mb-6">
            <img 
              src="/logo-bulb.png" 
              alt="Matematika Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold gradient-text">
            Matematika App
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Prijavite se za pristup aplikaciji
          </p>
        </div>

        {/* Login forma */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-2">
                Korisničko ime
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Unesite korisničko ime"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Lozinka
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Unesite lozinku"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Prijavljivanje...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Prijavite se
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 text-center">
              <strong>Demo podaci:</strong><br />
              Korisničko ime: Lazar<br />
              Lozinka: Davidovic
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-neutral-500">
            © 2025 Matematika App - Lazar Davidović
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
