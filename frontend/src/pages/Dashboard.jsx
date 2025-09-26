import React, { useState, useEffect } from 'react';
import { sweetService } from '../services/sweetService';
import { useAuth } from '../context/AuthContext';
import SweetCard from '../components/Sweet/SweetCard';
import SearchFilters from '../components/Sweet/SearchFilters';
import SweetForm from '../components/Sweet/SweetForm';
import { Plus, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const loadSweets = async () => {
    setIsLoading(true);
    try {
      const response = await sweetService.getSweets();
      setSweets(response.sweets);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load sweets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (params) => {
    setIsLoading(true);
    setSearchActive(true);
    try {
      const response = await sweetService.searchSweets(params);
      setSweets(response.sweets);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setSearchActive(false);
    loadSweets();
  };

  const handleFormSubmit = async (data) => {
    setIsFormLoading(true);
    try {
      if (editingSweet) {
        await sweetService.updateSweet(editingSweet._id, data);
        toast.success('Sweet updated successfully');
      } else {
        await sweetService.createSweet(data);
        toast.success('Sweet created successfully');
      }
      setShowForm(false);
      setEditingSweet(null);
      loadSweets();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Sweet Shop Dashboard</h1>
        {isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Sweet</span>
          </button>
        )}
      </div>

      <SearchFilters onSearch={handleSearch} onReset={handleResetSearch} />

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-pink-500" />
          <span className="ml-2 text-gray-600">Loading sweets...</span>
        </div>
      ) : sweets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet._id}
              sweet={sweet}
              onUpdate={searchActive ? () => handleSearch({}) : loadSweets}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchActive ? 'No sweets found matching your search criteria.' : 'No sweets available yet.'}
          </div>
          {isAdmin && !searchActive && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
            >
              Add Your First Sweet
            </button>
          )}
        </div>
      )}

      {showForm && (
        <SweetForm
          onSubmit={handleFormSubmit}
          initialData={editingSweet || undefined}
          onCancel={handleCancelForm}
          isLoading={isFormLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;