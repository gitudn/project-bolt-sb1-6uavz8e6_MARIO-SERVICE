import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/393206611519"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="sr-only">Chiedi aiuto su WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;