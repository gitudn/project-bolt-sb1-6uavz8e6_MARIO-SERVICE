import React, { useState } from 'react';
import { submitQuote } from '../services/api';

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  service: 'plumbing' | 'shutters' | 'locks';
  message: string;
}

const QuoteRequest: React.FC = () => {
  const [form, setForm] = useState<QuoteForm>({
    name: '',
    email: '',
    phone: '',
    service: 'plumbing',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await submitQuote(form);
      setSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'plumbing',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit quote request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Request a Quote</h1>
          
          {success ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Quote Request Submitted!</h2>
              <p className="text-green-600 mb-4">We'll contact you soon to discuss your request.</p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Submit Another Quote
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                <select
                  id="service"
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="plumbing">Plumbing</option>
                  <option value="shutters">Shutters</option>
                  <option value="locks">Locks</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest; 