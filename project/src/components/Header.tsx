import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-bold font-montserrat">
          <span className={`transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
            MARIO SERVICE
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#servizi" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
            {t('nav.services')}
          </a>
          <a href="#galleria" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
            {t('nav.gallery')}
          </a>
          <a href="#chi-siamo" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
            {t('nav.about')}
          </a>
          <a href="#contatti" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
            <Phone size={18} />
            {t('nav.contact')}
          </a>
          <LanguageSwitcher isScrolled={isScrolled} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher isScrolled={isScrolled} />
          <button 
            className="p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a 
              href="#servizi" 
              className="py-2 px-4 text-gray-800 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.services')}
            </a>
            <a 
              href="#galleria" 
              className="py-2 px-4 text-gray-800 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.gallery')}
            </a>
            <a 
              href="#chi-siamo" 
              className="py-2 px-4 text-gray-800 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
            <a 
              href="#contatti"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 mx-4 mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone size={18} />
              {t('nav.contact')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;