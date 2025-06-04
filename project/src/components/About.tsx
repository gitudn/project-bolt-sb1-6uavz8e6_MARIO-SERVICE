import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="chi-siamo" className="py-16 md:py-24 bg-gray-50">
      <div 
        ref={aboutRef}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-gray-800">
          <span className="border-b-4 border-orange-500 pb-2">{t('about.title')}</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 font-montserrat text-gray-800">{t('hero.title')}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('about.mission')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3">
                  <Award size={28} />
                </div>
                <span className="text-2xl font-bold text-gray-800">500+</span>
                <span className="text-gray-600">{t('about.stats.clients')}</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3">
                  <Clock size={28} />
                </div>
                <span className="text-2xl font-bold text-gray-800">20+</span>
                <span className="text-gray-600">{t('about.stats.experience')}</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3">
                  <MapPin size={28} />
                </div>
                <span className="text-2xl font-bold text-gray-800">100+</span>
                <span className="text-gray-600">{t('about.stats.areas')}</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`h-80 md:h-96 rounded-lg overflow-hidden shadow-lg transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22450.17543195521!2d12.030069099999999!3d45.4882761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ed2efc18372bd%3A0x529f2efab9414b56!2s30036%20Santa%20Maria%20di%20Sala%20VE!5e0!3m2!1sit!2sit!4v1694087654321!5m2!1sit!2sit"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Santa Maria di Sala"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;