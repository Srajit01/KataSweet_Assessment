import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Candy, ShoppingCart, Shield, Search } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-pink-500" />,
      title: 'Easy Shopping',
      description: 'Browse and purchase your favorite sweets with just a few clicks.'
    },
    {
      icon: <Search className="h-8 w-8 text-blue-500" />,
      title: 'Smart Search',
      description: 'Find exactly what you want with advanced filtering by category and price.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: 'Secure & Fast',
      description: 'Your transactions are protected with enterprise-level security.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="flex justify-center mb-8">
          <Candy className="h-24 w-24 text-pink-500" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Sweet Shop
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover a world of delicious treats! From chocolates to gummy bears, 
          we have everything to satisfy your sweet tooth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-pink-600 transition-colors"
            >
              Browse Sweets
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-pink-500 text-pink-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-pink-50 transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Sweet Shop?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best sweet shopping experience 
            with modern technology and premium quality treats.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl py-16 px-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of sweet lovers who trust our platform for their treats!
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="bg-white text-pink-500 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Create Account
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;