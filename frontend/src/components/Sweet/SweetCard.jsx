import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { sweetService } from '../../services/sweetService';
import { ShoppingCart, CreditCard as Edit, Trash2, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const SweetCard = ({ sweet, onUpdate, onEdit }) => {
  const { isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const categoryColors = {
    chocolate: 'bg-amber-100 text-amber-800',
    candy: 'bg-red-100 text-red-800',
    gummy: 'bg-green-100 text-green-800',
    'hard candy': 'bg-blue-100 text-blue-800',
    toffee: 'bg-yellow-100 text-yellow-800',
    lollipop: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const handlePurchase = async () => {
    if (purchaseQuantity > sweet.quantity) {
      toast.error(`Only ${sweet.quantity} items available`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await sweetService.purchaseSweet(sweet._id, { quantity: purchaseQuantity });
      toast.success(`Purchased ${result.purchased} items for $${result.total.toFixed(2)}`);
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Purchase failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${sweet.name}"?`)) return;

    setIsLoading(true);
    try {
      await sweetService.deleteSweet(sweet._id);
      toast.success('Sweet deleted successfully');
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Delete failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={sweet.imageUrl || 'https://images.pexels.com/photos/1684718/pexels-photo-1684718.jpeg'}
          alt={sweet.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{sweet.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[sweet.category]}`}>
            {sweet.category}
          </span>
        </div>
        
        {sweet.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{sweet.description}</p>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-600">${sweet.price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            <Package className="h-4 w-4 text-gray-500" />
            <span className={`text-sm font-medium ${sweet.quantity === 0 ? 'text-red-500' : 'text-gray-600'}`}>
              {sweet.quantity} left
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {sweet.quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <select
                value={purchaseQuantity}
                onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={isLoading}
              >
                {Array.from({ length: Math.min(sweet.quantity, 10) }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{isLoading ? 'Buying...' : 'Buy'}</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-2 text-red-500 font-medium">
              Out of Stock
            </div>
          )}

          {isAdmin && (
            <div className="flex space-x-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => onEdit?.(sweet)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;