import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import About from '../components/About';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    navigate('/quote');
  };

  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <ContactForm />
    </>
  );
};

export default Home; 