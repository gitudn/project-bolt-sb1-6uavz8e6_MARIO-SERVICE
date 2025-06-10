import React from 'react';

interface ContactOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  phone: string;
}

export const ContactOptionsModal: React.FC<ContactOptionsModalProps> = ({
  isOpen,
  onClose,
  name,
  email,
  phone
}) => {
  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?subject=Re: Quote Request - Mario Service`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

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
                  Contact {name}
                </h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <button
                      onClick={handleEmailClick}
                      className="mt-1 w-full text-left px-4 py-2 text-sm text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md"
                    >
                      {email}
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <button
                      onClick={handlePhoneClick}
                      className="mt-1 w-full text-left px-4 py-2 text-sm text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md"
                    >
                      {phone}
                    </button>
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

export default ContactOptionsModal; 