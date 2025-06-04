import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'it', name: 'IT', flag: '🇮🇹' },
    { code: 'en', name: 'EN', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-md transition-all duration-300"
        aria-label="Change language"
      >
        <span>{currentLanguage.flag}</span>
        <span className="font-medium">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${
                lang.code === i18n.language ? 'bg-gray-50' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;