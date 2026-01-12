import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';

const AdminReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      date: 'Jan 17, 2024 at 3:00 PM',
      product: 'T-Shirt',
      rating: 4,
      text: 'The fabric is very comfortable and breathable during workouts, and the size fits perfectly. The color is nice, but it might fade after a few washes if care instructions are not followed.',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      date: 'Jan 17, 2024 at 3:00 PM',
      product: 'T-Shirt',
      rating: 4,
      text: 'The fabric is very comfortable and breathable during workouts, and the size fits perfectly. The color is nice, but it might fade after a few washes if care instructions are not followed.',
      status: 'hidden',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      author: 'Sarah Johnson',
      date: 'Jan 17, 2024 at 3:00 PM',
      product: 'T-Shirt',
      rating: 4,
      text: 'The fabric is very comfortable and breathable during workouts, and the size fits perfectly. The color is nice, but it might fade after a few washes if care instructions are not followed.',
      status: 'approved',
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=100&h=100&fit=crop'
    }
  ]);

  const stats = {
    total: 50,
    avgRating: 4.2,
    pending: 2,
    approved: 40
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      hidden: 'bg-pink-100 text-pink-700',
      approved: 'bg-green-100 text-green-700'
    };
    return colors[status];
  };

  const handleStatusChange = (reviewId, newStatus) => {
    setReviews(reviews.map(review =>
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="p-4 bg-white-100">
      <div className="max-w-8xl">
        
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">Reviews & Feedback</h1>
          <p className="text-lg text-black-500 pb-1">Moderate customer reviews and ratings</p>
        </div>

        
        <div className="grid grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-lg border flex flex-col rounded-2xl shadow-lg items-center justify-center" style={{
            width: "250px",
            height: "174px",
          }}>
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>

          
          <div className="bg-white p-5 rounded-lg border flex flex-col rounded-2xl shadow-lg items-center justify-center" style={{
            width: "250px",
            height: "174px",
          }}>
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2 flex items-center gap-1">
              {stats.avgRating}
              <Star size={24} className="fill-orange-500 text-orange-500" />
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>

          
          <div className="bg-white p-5 rounded-lg border flex flex-col rounded-2xl shadow-lg items-center justify-center" style={{
            width: "250px",
            height: "174px",
          }}>
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>

          
          <div className="bg-white p-5 rounded-lg border flex flex-col rounded-2xl shadow-lg items-center justify-center" style={{
            width: "250px",
            height: "174px",
          }}>
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
        </div>

        
        <div className="p-6 flex items-center justify-between gap-4 ">

          
          <h2 className="text-2xl font-bold text-gray-900">All Reviews</h2>

          
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-1 sm:justify-end lg:max-w-xl">

            
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40 pl-10 pr-8 py-2 border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="hidden">Hidden</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
        </div>

        


        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-2xl">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{review.author}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(review.status)}`}>
                  {review.status}
                </span>
              </div>

              
              <div className="flex flex-col sm:flex-row gap-4">
                
                <div className="flex-shrink-0">
                  <img
                    src={review.image}
                    alt={review.product}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                  />
                </div>

                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{review.product}</h4>
                    <div className="flex items-center gap-1 ml-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  
                  <p className="text-[#0E1830] text-sm text-Poppins leading-relaxed max-w-2xl">
                    "{review.text}"
                  </p>
                </div>
              </div>

              
              <div className="flex justify-end gap-2 mt-4 pt-2 border-gray-100">
                <button
                  onClick={() => handleStatusChange(review.id, 'approved')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${review.status === 'approved'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Show
                </button>
                <button
                  onClick={() => handleStatusChange(review.id, 'hidden')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${review.status === 'hidden'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Hide
                </button>
              </div>
            </div>
          ))}
        </div>

        
        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>

  );
};

export default AdminReviews;



