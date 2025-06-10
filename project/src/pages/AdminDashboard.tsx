import React, { useEffect, useState } from 'react';
import {
  fetchQuotes,
  updateQuoteStatus,
  deleteQuote,
  bulkDeleteQuotes,
  bulkUpdateQuoteStatus
} from '../services/api';
import QuoteRequestsTable from '../components/QuoteRequestsTable';
import EditStatusModal from '../components/EditStatusModal';
import ViewQuoteModal from '../components/ViewQuoteModal';
import ContactOptionsModal from '../components/ContactOptionsModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import BulkStatusUpdateModal from '../components/BulkStatusUpdateModal';

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

interface FilterState {
  status: string;
  service: string;
  dateRange: string;
  searchQuery: string;
  page: number;
  limit: number;
}

interface PaginationData {
  total: number;
  page: number;
  totalPages: number;
}

const AdminDashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [editingQuote, setEditingQuote] = useState<{ id: string; status: string } | null>(null);
  const [viewingQuote, setViewingQuote] = useState<Quote | null>(null);
  const [contactingQuote, setContactingQuote] = useState<Quote | null>(null);
  const [deletingQuote, setDeletingQuote] = useState<Quote | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [bulkStatusUpdate, setBulkStatusUpdate] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'Any',
    service: 'Any',
    dateRange: '',
    searchQuery: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    totalPages: 1
  });

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setLoading(true);
        const response = await fetchQuotes(filters);
        setQuotes(response.quotes);
        setPagination({
          total: response.total,
          page: response.page,
          totalPages: response.totalPages
        });
        // Clear selection when data changes
        setSelectedQuotes([]);
      } catch (err: any) {
        setError(err.message || 'Error fetching quotes');
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, [filters]); // Re-fetch when filters change

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'page' ? Number(value) : value,
      // Reset page when changing filters except when changing page itself
      page: key !== 'page' ? 1 : Number(value)
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedQuotes(checked ? quotes.map(quote => quote._id) : []);
  };

  const handleSelectQuote = (quoteId: string, checked: boolean) => {
    setSelectedQuotes(prev =>
      checked
        ? [...prev, quoteId]
        : prev.filter(id => id !== quoteId)
    );
  };

  const handleEditQuote = (quoteId: string) => {
    const quote = quotes.find(q => q._id === quoteId);
    if (quote) {
      setEditingQuote({ id: quoteId, status: quote.status });
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!editingQuote) return;

    try {
      setLoading(true);
      await updateQuoteStatus(editingQuote.id, newStatus);
      
      // Update the quote in the local state
      setQuotes(prevQuotes =>
        prevQuotes.map(quote =>
          quote._id === editingQuote.id
            ? { ...quote, status: newStatus as Quote['status'] }
            : quote
        )
      );

      setEditingQuote(null);
    } catch (err: any) {
      setError(err.message || 'Error updating quote status');
    } finally {
      setLoading(false);
    }
  };

  const handleViewQuote = (quoteId: string) => {
    const quote = quotes.find(q => q._id === quoteId);
    if (quote) {
      setViewingQuote(quote);
    }
  };

  const handleContactQuote = (quoteId: string) => {
    const quote = quotes.find(q => q._id === quoteId);
    if (quote) {
      setContactingQuote(quote);
    }
  };

  const handleDeleteQuote = (quoteId: string) => {
    const quote = quotes.find(q => q._id === quoteId);
    if (quote) {
      setDeletingQuote(quote);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingQuote) return;

    try {
      setLoading(true);
      await deleteQuote(deletingQuote._id);
      
      // Update the quotes list in the local state
      setQuotes(prevQuotes => prevQuotes.filter(quote => quote._id !== deletingQuote._id));
      
      // Update pagination if necessary
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1,
        totalPages: Math.ceil((prev.total - 1) / filters.limit)
      }));

      // Clear selection if the deleted quote was selected
      if (selectedQuotes.includes(deletingQuote._id)) {
        setSelectedQuotes(prev => prev.filter(id => id !== deletingQuote._id));
      }

      setDeletingQuote(null);
    } catch (err: any) {
      setError(err.message || 'Error deleting quote');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteQuotes(selectedQuotes);
      
      // Update the quotes list in the local state
      setQuotes(prevQuotes => prevQuotes.filter(quote => !selectedQuotes.includes(quote._id)));
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: prev.total - selectedQuotes.length,
        totalPages: Math.ceil((prev.total - selectedQuotes.length) / filters.limit)
      }));

      // Clear selection
      setSelectedQuotes([]);
      setBulkDeleting(false);
    } catch (err: any) {
      setError(err.message || 'Error deleting quotes');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    try {
      setLoading(true);
      await bulkUpdateQuoteStatus(selectedQuotes, newStatus);
      
      // Update the quotes in the local state
      setQuotes(prevQuotes =>
        prevQuotes.map(quote =>
          selectedQuotes.includes(quote._id)
            ? { ...quote, status: newStatus as Quote['status'] }
            : quote
        )
      );

      // Clear selection
      setSelectedQuotes([]);
      setBulkStatusUpdate(false);
    } catch (err: any) {
      setError(err.message || 'Error updating quotes status');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const startIndex = (pagination.page - 1) * filters.limit + 1;
  const endIndex = Math.min(startIndex + filters.limit - 1, pagination.total);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Quote Requests</h1>
            {selectedQuotes.length > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {selectedQuotes.length} selected
                </span>
                <button
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => setBulkDeleting(true)}
                >
                  Delete Selected
                </button>
                <button
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setBulkStatusUpdate(true)}
                >
                  Update Status
                </button>
              </div>
            )}
          </div>
          
          {/* Filters Section */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="Any">Any</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
              <select
                id="service"
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="Any">Any</option>
                <option value="Tapparelle">Tapparelle</option>
                <option value="Serramenti">Serramenti</option>
                <option value="Zanzariere">Zanzariere</option>
                <option value="Tende">Tende</option>
              </select>
            </div>

            {/* Search Bar */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                placeholder="Search..."
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <QuoteRequestsTable
                  quotes={quotes}
                  loading={loading}
                  selectedQuotes={selectedQuotes}
                  onSelectAll={handleSelectAll}
                  onSelectQuote={handleSelectQuote}
                  onEditQuote={handleEditQuote}
                  onViewQuote={handleViewQuote}
                  onContactQuote={handleContactQuote}
                  onDeleteQuote={handleDeleteQuote}
                />
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex}</span> to{' '}
              <span className="font-medium">{endIndex}</span> of{' '}
              <span className="font-medium">{pagination.total}</span> results
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handleFilterChange('page', Math.max(1, filters.page - 1))}
                  disabled={filters.page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    filters.page === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handleFilterChange('page', filters.page + 1)}
                  disabled={filters.page >= pagination.totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    filters.page >= pagination.totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>

          {/* Edit Status Modal */}
          {editingQuote && (
            <EditStatusModal
              isOpen={true}
              onClose={() => setEditingQuote(null)}
              onSave={handleStatusUpdate}
              currentStatus={editingQuote.status}
            />
          )}

          {/* View Quote Modal */}
          {viewingQuote && (
            <ViewQuoteModal
              isOpen={true}
              onClose={() => setViewingQuote(null)}
              quote={viewingQuote}
            />
          )}

          {/* Contact Options Modal */}
          {contactingQuote && (
            <ContactOptionsModal
              isOpen={true}
              onClose={() => setContactingQuote(null)}
              name={contactingQuote.name}
              email={contactingQuote.email}
              phone={contactingQuote.phone}
            />
          )}

          {/* Delete Confirmation Modal */}
          {deletingQuote && (
            <DeleteConfirmationModal
              isOpen={true}
              onClose={() => setDeletingQuote(null)}
              onConfirm={handleConfirmDelete}
              title="Delete Quote Request"
              message={`Are you sure you want to delete the quote request from ${deletingQuote.name}? This action cannot be undone.`}
            />
          )}

          {/* Bulk Delete Confirmation Modal */}
          {bulkDeleting && (
            <DeleteConfirmationModal
              isOpen={true}
              onClose={() => setBulkDeleting(false)}
              onConfirm={handleBulkDelete}
              title="Delete Quote Requests"
              message={`Are you sure you want to delete ${selectedQuotes.length} quote requests? This action cannot be undone.`}
            />
          )}

          {/* Bulk Status Update Modal */}
          {bulkStatusUpdate && (
            <BulkStatusUpdateModal
              isOpen={true}
              onClose={() => setBulkStatusUpdate(false)}
              onSave={handleBulkStatusUpdate}
              selectedCount={selectedQuotes.length}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 