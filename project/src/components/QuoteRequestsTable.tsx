import React from 'react';
import QuoteActionsMenu from './QuoteActionsMenu';

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

interface QuoteRequestsTableProps {
  quotes: Quote[];
  loading?: boolean;
  selectedQuotes: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectQuote: (quoteId: string, checked: boolean) => void;
  onEditQuote?: (quoteId: string) => void;
  onViewQuote?: (quoteId: string) => void;
  onContactQuote?: (quoteId: string) => void;
  onDeleteQuote?: (quoteId: string) => void;
}

const QuoteRequestsTable: React.FC<QuoteRequestsTableProps> = ({
  quotes,
  loading = false,
  selectedQuotes,
  onSelectAll,
  onSelectQuote,
  onEditQuote = () => {},
  onViewQuote = () => {},
  onContactQuote = () => {},
  onDeleteQuote = () => {}
}) => {
  if (loading) {
    return (
      <div className="min-w-full">
        <div className="text-center py-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={quotes.length > 0 && selectedQuotes.length === quotes.length}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Privacy Consent
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {quotes.map((quote) => (
            <tr key={quote._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedQuotes.includes(quote._id)}
                  onChange={(e) => onSelectQuote(quote._id, e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {quote.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {quote.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {quote.phone}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{quote.service}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  quote.privacy_consent === 'allowed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {quote.privacy_consent}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(quote.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <QuoteActionsMenu
                  quoteId={quote._id}
                  onEdit={() => onEditQuote(quote._id)}
                  onView={() => onViewQuote(quote._id)}
                  onContact={() => onContactQuote(quote._id)}
                  onDelete={() => onDeleteQuote(quote._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteRequestsTable; 