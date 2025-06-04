import React, { useState, useRef, useEffect } from 'react';
import { Send, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { submitQuote } from '../services/api';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  privacy: boolean;
}

interface FormErrors extends Partial<FormData> {
  submit?: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    privacy: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    
    // Clear error when checkbox is changed
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.name');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.form.errors.phone');
    } else if (!/^[0-9+\s]+$/.test(formData.phone)) {
      newErrors.phone = t('contact.form.errors.phoneInvalid');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid');
    }
    
    if (!formData.service) {
      newErrors.service = t('contact.form.errors.service');
    }
    
    if (!formData.privacy) {
      newErrors.privacy = t('contact.form.errors.privacy');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Submit the quote using the API
        const { privacy, ...quoteData } = formData;
        await submitQuote(quoteData);
        
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
          privacy: false
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error: any) {
        setErrors(prev => ({
          ...prev,
          submit: error.message || t('contact.form.errors.submit')
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contatti" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-montserrat text-gray-800">
          <span className="border-b-4 border-orange-500 pb-2">{t('contact.title')}</span>
        </h2>
        
        <div 
          ref={formRef}
          className={`max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{t('contact.form.success')}</h3>
              <p className="text-gray-600">
                {t('contact.form.successMessage')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-gray-700 font-medium mb-2"
                  >
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-gray-700 font-medium mb-2"
                  >
                    {t('contact.form.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+39 123 456 7890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="email" 
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="service" 
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.form.service')} *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.service ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('contact.form.selectService')}</option>
                  <option value="plumbing">{t('gallery.categories.plumbing')}</option>
                  <option value="shutters">{t('gallery.categories.shutters')}</option>
                  <option value="locks">{t('gallery.categories.locks')}</option>
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="message" 
                  className="block text-gray-700 font-medium mb-2"
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder={t('contact.form.messagePlaceholder')}
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {t('contact.form.privacy')}
                  </span>
                </label>
                {errors.privacy && (
                  <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>
                )}
              </div>

              {errors.submit && (
                <div className="mb-6">
                  <p className="text-red-500 text-sm">{errors.submit}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{t('contact.form.sending')}</span>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;