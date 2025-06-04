import React, { useState, useRef, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/6474482/pexels-photo-6474482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Riparazione tapparelle",
      category: t('gallery.categories.shutters')
    },
    {
      id: 2,
      src: "/idraulica.webp",
      alt: "Sistema di tubature professionali",
      category: t('gallery.categories.plumbing')
    },
    {
      id: 3,
      src: "/serratura.jpg",
      alt: "Serratura di sicurezza professionale",
      category: t('gallery.categories.locks')
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg",
      alt: "Riparazione sanitari",
      category: t('gallery.categories.plumbing')
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/4114905/pexels-photo-4114905.jpeg",
      alt: "Installazione tapparelle elettriche",
      category: t('gallery.categories.shutters')
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg",
      alt: "Serratura di sicurezza avanzata",
      category: t('gallery.categories.locks')
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Marco Rossi",
      rating: 5,
      text: "Servizio eccellente! Hanno risolto un problema idraulico urgente in meno di un'ora. Professionalità e competenza al top.",
      service: t('gallery.categories.plumbing')
    },
    {
      id: 2,
      name: "Laura Bianchi",
      rating: 5,
      text: "Ho chiamato per un problema alla tapparella elettrica. Sono intervenuti rapidamente e hanno risolto il problema. Molto soddisfatta!",
      service: t('gallery.categories.shutters')
    },
    {
      id: 3,
      name: "Giuseppe Verdi",
      rating: 5,
      text: "Ottimo servizio di sostituzione serratura. Lavoro preciso e pulito. Consigliatissimi!",
      service: t('gallery.categories.locks')
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const openLightbox = (image: GalleryImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="galleria" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-gray-800">
          <span className="border-b-4 border-orange-500 pb-2">{t('gallery.title')}</span>
        </h2>
        
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`overflow-hidden rounded-lg shadow-md transform transition-all duration-700 cursor-pointer relative ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => openLightbox(image)}
            >
              <div className="relative aspect-w-4 aspect-h-3">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80">
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-gray-800">
            <span className="border-b-4 border-orange-500 pb-2">{t('reviews.title')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{review.name}</span>
                  <span className="text-sm text-blue-600">{review.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl max-h-[90vh] px-4">
            <img 
              src={currentImage.src} 
              alt={currentImage.alt} 
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl">{currentImage.category}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;