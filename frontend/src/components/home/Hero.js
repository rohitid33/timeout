import React from 'react';
import { Link } from 'react-router-dom';

// Following Single Responsibility Principle - Hero only handles the hero section display
const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connect with people who share your interests
            </h1>
            <p className="text-xl mb-8">
              Join tables, meet new people, and create meaningful connections in real life.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/discover"
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold text-center"
              >
                Find a Table
              </Link>
              <Link
                to="/create"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Host a Table
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              {/* This would be an actual image in production */}
              <div className="bg-indigo-300 bg-opacity-30 rounded-lg p-6 h-80 flex items-center justify-center">
                <p className="text-center text-lg font-medium">
                  [Hero image showing people connecting at a table]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
