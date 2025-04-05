import React from 'react';

// Following Single Responsibility Principle - Testimonials only handles displaying testimonials
const Testimonials = () => {
  // Testimonials data - separated from presentation logic
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Regular Attendee',
      image: 'priya.jpg',
      quote: 'Tymout helped me find my community when I moved to a new city. I have made genuine friends through the tables I have attended.'
    },
    {
      id: 2,
      name: 'Arjun Patel',
      role: 'Table Host',
      image: 'arjun.jpg',
      quote: "Hosting tables has been an incredible experience. I've met diverse people and had meaningful conversations I wouldn't have had otherwise."
    },
    {
      id: 3,
      name: 'Neha Gupta',
      role: 'Regular Attendee',
      image: 'neha.jpg',
      quote: "As an introvert, I was hesitant at first, but the structured format of Tymout tables made it easy to connect with others."
    }
  ];

  // TestimonialCard component - following SRP by separating the card display logic
  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
          <span className="text-gray-600 text-xs">[Photo]</span>
        </div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{testimonial.quote}"</p>
    </div>
  );

  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from people who have found meaningful connections through Tymout.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
