import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for featured tables - in a real app, this would come from an API
const featuredTablesData = [
  {
    id: 1,
    title: 'Coffee & Conversation',
    host: 'Priya M.',
    location: 'Brew Haven Café, Mumbai',
    date: 'Sat, Apr 10 • 4:00 PM',
    attendees: 6,
    maxAttendees: 8,
    tags: ['Coffee', 'Casual', 'Networking'],
    image: 'coffee-table.jpg'
  },
  {
    id: 2,
    title: 'Tech Enthusiasts Meetup',
    host: 'Rahul S.',
    location: 'Digital Hub, Bangalore',
    date: 'Sun, Apr 11 • 2:00 PM',
    attendees: 4,
    maxAttendees: 10,
    tags: ['Technology', 'Networking', 'Learning'],
    image: 'tech-table.jpg'
  },
  {
    id: 3,
    title: 'Book Club: Fiction Lovers',
    host: 'Ananya K.',
    location: 'Page Turner Bookstore, Delhi',
    date: 'Wed, Apr 14 • 6:30 PM',
    attendees: 7,
    maxAttendees: 12,
    tags: ['Books', 'Discussion', 'Fiction'],
    image: 'book-table.jpg'
  }
];

// TableCard component - following SRP by separating the card display logic
const TableCard = ({ table }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <p className="text-gray-500 text-center">[Image for {table.title}]</p>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{table.title}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {table.attendees}/{table.maxAttendees} spots
          </span>
        </div>
        <p className="text-gray-600 mb-2">Hosted by {table.host}</p>
        <p className="text-gray-700 mb-2">{table.location}</p>
        <p className="text-gray-700 mb-4">{table.date}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {table.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <Link 
          to={`/tables/${table.id}`} 
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// FeaturedTables component - following SRP by focusing only on displaying featured tables
const FeaturedTables = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Tables</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover interesting conversations and meet new people who share your interests.
            Join a table or host your own!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTablesData.map(table => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/discover" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Discover More Tables
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTables;
