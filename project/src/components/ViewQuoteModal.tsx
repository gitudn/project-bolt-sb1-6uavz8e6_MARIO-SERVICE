import React from 'react';

interface Quote {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  privacy_consent: 'allowed' | 'not allowed';
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
}

interface ViewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote;
}

export const ViewQuoteModal: React.FC<ViewQuoteModalProps> = ({
  isOpen,
  onClose,
  quote
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Quote Request Details
                </h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Client Information</h4>
                    <p className="mt-1 text-sm text-gray-900">{quote.name}</p>
                    <p className="mt-1 text-sm text-gray-900">{quote.email}</p>
                    <p className="mt-1 text-sm text-gray-900">{quote.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Service</h4>
                    <p className="mt-1 text-sm text-gray-900">{quote.service}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <span className={`mt-1 inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                      quote.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : quote.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : quote.status === 'contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {quote.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Privacy Consent</h4>
                    <span className={`mt-1 inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                      quote.privacy_consent === 'allowed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {quote.privacy_consent}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(quote.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Message</h4>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                      {quote.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuoteModal; 