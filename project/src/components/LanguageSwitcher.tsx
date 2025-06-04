import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled = false }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`transition-all duration-300 px-3 py-2 rounded-md ${
        isScrolled
          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
      }`}
      aria-label="Change language"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;