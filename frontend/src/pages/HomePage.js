import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedTables from '../components/home/FeaturedTables';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

// Following Single Responsibility Principle - HomePage only composes other components
const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedTables />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
