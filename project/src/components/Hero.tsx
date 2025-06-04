import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    navigate('/quote');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+393206611519', '_blank');
  };

  return (
    <div className="relative h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-montserrat">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 15.55C16.4 16.31 15.3 16.96 14.47 17.23C13.93 17.41 13.24 17.55 10.82 16.42C7.74 15.01 5.77 11.88 5.6 11.65C5.44 11.42 4.34 9.91 4.34 8.34C4.34 6.77 5.11 6.03 5.4 5.73C5.64 5.48 6.02 5.37 6.38 5.37C6.49 5.37 6.59 5.37 6.69 5.38C6.98 5.39 7.12 5.41 7.31 5.89C7.54 6.5 8.16 8.07 8.24 8.25C8.32 8.43 8.4 8.67 8.28 8.9C8.17 9.14 8.07 9.25 7.89 9.46C7.71 9.67 7.54 9.83 7.36 10.05C7.2 10.24 7.02 10.45 7.23 10.8C7.44 11.14 8.16 12.31 9.22 13.26C10.59 14.5 11.72 14.89 12.11 15.05C12.41 15.17 12.76 15.15 12.97 14.92C13.24 14.62 13.57 14.09 13.91 13.57C14.15 13.19 14.45 13.14 14.77 13.26C15.1 13.37 16.65 14.14 17.01 14.32C17.37 14.5 17.61 14.58 17.69 14.73C17.77 14.88 17.77 15.55 17.52 16.32L16.64 15.55Z"
              />
            </svg>
            {t('hero.whatsapp')}
          </button>
          <button
            onClick={handleQuoteClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            {t('hero.quote')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;