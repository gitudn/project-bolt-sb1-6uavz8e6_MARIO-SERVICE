import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">{t('hero.title')}</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">{t('footer.contacts')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0 text-blue-400" size={18} />
                <span>Via Pepe 1, Santa Maria di Sala (VE)</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0 text-blue-400" size={18} />
                <a href="tel:+393206611519" className="hover:underline">+39 320 661 1519</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0 text-blue-400" size={18} />
                <a href="mailto:marioserviceveneto@gmail.com" className="hover:underline">marioserviceveneto@gmail.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat">{t('footer.hours.title')}</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>{t('footer.hours.weekdays')}:</span>
                <span>8:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.hours.saturday')}:</span>
                <span>9:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.hours.sunday')}:</span>
                <span>{t('footer.hours.closed')}</span>
              </li>
              <li className="mt-4 text-orange-400 font-medium">
                {t('footer.hours.emergency')}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MARIO SERVICE - P.IVA 12345678911</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-2">Cookie Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;