import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  FileText, 
  Mail,
  LogOut 
} from 'lucide-react';

// Custom logo component
const LogoIcon = ({ size = 20 }) => (
  <img 
    src="/logo-bulb.png" 
    alt="Logo" 
    className="w-5 h-5 object-contain"
    style={{ width: size, height: size }}
  />
);

const Sidebar = ({ onLogout }) => {
  const navigationItems = [
    {
      name: 'O nama',
      path: '/',
      icon: LogoIcon,
      description: 'Saznajte više o nama'
    },
    {
      name: 'Časovi',
      path: '/casovi',
      icon: Calendar,
      description: 'Zakažite privatni čas'
    },
    {
      name: 'Kursevi',
      path: '/kursevi',
      icon: GraduationCap,
      description: 'Dostupni kursevi matematike'
    },
    {
      name: 'Lekcije',
      path: '/lekcije',
      icon: BookOpen,
      description: 'Besplatne lekcije i materijali'
    },
    {
      name: 'Kontakt',
      path: '/kontakt',
      icon: Mail,
      description: 'Kontaktirajte nas'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-primary-50 to-accent-50 w-80 min-h-screen shadow-lg border-r border-neutral-200 fixed left-0 top-0 z-30">
      {/* Logo i header */}
      <div className="p-6 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
            <img 
              src="/logo-bulb.png" 
              alt="Matematika App Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">
              Matematika App
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Učenje i privatni časovi
            </p>
          </div>
        </div>
      </div>

      {/* Navigacija */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-item group ${isActive ? 'active' : ''}`
              }
            >
              <div className="flex items-center space-x-3 w-full">
                <IconComponent 
                  size={20} 
                  className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200" 
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">
                    {item.name}
                  </div>
                  <div className="text-xs opacity-75 truncate">
                    {item.description}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer informacije */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-100 to-transparent">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-neutral-200">
          <div className="text-xs text-neutral-600 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              <span>Online učenje matematike</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse animation-delay-200"></div>
              <span>Privatni časovi</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse animation-delay-400"></div>
              <span>Besplatni materijali</span>
            </div>
          </div>

          {/* Logout dugme */}
          {onLogout && (
            <div className="mt-4 pt-3 border-t border-neutral-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>Odjavi se</span>
              </button>
            </div>
          )}
          
          <div className="mt-4 pt-3 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              © 2025 Matematika App
            </p>
            <p className="text-xs text-neutral-400 text-center mt-1">
              Lazar Davidović
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
