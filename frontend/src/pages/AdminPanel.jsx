import React, { useState, useEffect } from 'react';
import { sweetService } from '../services/sweetService';
import { Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSweets = async () => {
    setIsLoading(true);
    try {
      const response = await sweetService.getSweets(1, 100); // Load all sweets
      setSweets(response.sweets);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load sweets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestock = async (sweetId, quantity) => {
    try {
      await sweetService.restockSweet(sweetId, { quantity });
      toast.success(`Restocked ${quantity} items successfully`);
      loadSweets();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Restock failed');
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // Calculate statistics
  const totalSweets = sweets.length;
  const totalValue = sweets.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
  const lowStockItems = sweets.filter(sweet => sweet.quantity <= 5).length;
  const outOfStockItems = sweets.filter(sweet => sweet.quantity === 0).length;

  const stats = [
    {
      title: 'Total Products',
      value: totalSweets,
      icon: <Package className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Inventory Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Out of Stock',
      value: outOfStockItems,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Management Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sweets.map((sweet) => (
                <tr key={sweet._id} className={sweet.quantity === 0 ? 'bg-red-50' : sweet.quantity <= 5 ? 'bg-yellow-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={sweet.imageUrl || 'https://images.pexels.com/photos/1684718/pexels-photo-1684718.jpeg'}
                        alt={sweet.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{sweet.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                      {sweet.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${sweet.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      sweet.quantity === 0 ? 'text-red-600' : 
                      sweet.quantity <= 5 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {sweet.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(sweet.price * sweet.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        defaultValue="10"
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        id={`restock-${sweet._id}`}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById(`restock-${sweet._id}`);
                          const quantity = parseInt(input.value);
                          if (quantity > 0) {
                            handleRestock(sweet._id, quantity);
                          }
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sweets.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No products found in inventory.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;