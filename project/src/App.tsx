import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;