import React, { useEffect, useState } from 'react';
import { MessageCircle, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="relative h-screen min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-montserrat transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {t('hero.title')}
        </h1>
        <p 
          className={`text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-light transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {t('hero.subtitle')}
        </p>
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <a 
            href="https://wa.me/393206611519" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 text-lg"
          >
            <MessageCircle size={20} />
            {t('hero.whatsapp')}
          </a>
          <a 
            href="#contatti"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 text-lg"
          >
            <FileText size={20} />
            {t('hero.quote')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;