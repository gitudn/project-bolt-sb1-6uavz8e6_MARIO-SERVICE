import React, { useRef, useEffect, useState } from 'react';
import { DropletIcon, ArrowUpFromLine, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, titleKey, descriptionKey, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col items-center text-center transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="text-blue-600 mb-5 bg-blue-100 p-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-4 font-montserrat text-gray-800">{t(titleKey)}</h3>
      <p className="text-gray-600 leading-relaxed">{t(descriptionKey)}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="servizi" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-gray-800">
          <span className="border-b-4 border-orange-500 pb-2">{t('services.title')}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<DropletIcon size={42} />}
            titleKey="services.plumbing.title"
            descriptionKey="services.plumbing.description"
            delay={0}
          />
          
          <ServiceCard
            icon={<ArrowUpFromLine size={42} />}
            titleKey="services.shutters.title"
            descriptionKey="services.shutters.description"
            delay={200}
          />
          
          <ServiceCard
            icon={<Lock size={42} />}
            titleKey="services.locks.title"
            descriptionKey="services.locks.description"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;