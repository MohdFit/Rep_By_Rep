 import React, { useEffect, useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { getPendingReviews, updateReviewStatus } from '../../services/reviewService';

const AdminReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getPendingReviews({ page, limit: 10 });
        if (res.success) {
          setReviews(res.data || []);
          setPages(res.pagination?.pages || 1);
          setTotal(res.pagination?.total || (res.data ? res.data.length : 0));
        } else {
          setError(res.message || 'Failed to load reviews');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      rejected: 'bg-red-100 text-red-700',
      approved: 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleStatusChange = async (reviewId, newStatus) => {
    try {
      await updateReviewStatus(reviewId, newStatus);
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update review status');
    }
  };
  const filteredReviews = reviews.filter(review => {
    const haystack = `${review.title || ''} ${review.comment || ''} ${review.userId?.name || review.userId?.email || ''}`.toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: total || reviews.length,
    avgRating: filteredReviews.length
      ? (filteredReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / filteredReviews.length).toFixed(1)
      : '0.0',
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
  };

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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="p-6 bg-white rounded-lg border text-gray-600">Loading reviews...</div>
          ) : error ? (
            <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>
          ) : filteredReviews.length === 0 ? (
            <div className="p-6 bg-white rounded-lg border text-gray-600">No reviews found.</div>
          ) : (
            filteredReviews.map((review) => {
              const author = review.userId?.name || review.userId?.email || 'Anonymous';
              const productName = review.productId?.name || review.productId?.title || 'Product';
              const productImage = review.productId?.image || review.productId?.images?.[0] || 'https://via.placeholder.com/120x120?text=Product';
              const createdAt = review.createdAt ? new Date(review.createdAt).toLocaleString() : '';

              return (
                <div key={review._id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{author}</h3>
                      <p className="text-sm text-gray-500">{createdAt}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{productName}</h4>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating || 0)}
                          <span className="text-sm text-gray-500 ml-2">{review.rating || 0}.0</span>
                        </div>
                      </div>

                      {review.title && (
                        <p className="text-gray-800 font-semibold mb-1">{review.title}</p>
                      )}
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {review.comment}
                      </p>
                      {review.verified && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                    <button
                      className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-semibold"
                      onClick={() => handleStatusChange(review._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold"
                      onClick={() => handleStatusChange(review._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">Page {page} of {pages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-full border text-sm font-semibold disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="px-4 py-2 rounded-full border text-sm font-semibold disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;



