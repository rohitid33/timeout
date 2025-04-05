import React from 'react';
import { Link } from 'react-router-dom';

// Following Single Responsibility Principle - CallToAction only handles the CTA section
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to connect with new people?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Join Tymout today and start discovering tables or host your own to meet people who share your interests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/signup"
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg"
          >
            Sign Up Now
          </Link>
          <Link
            to="/discover"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Browse Tables
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
