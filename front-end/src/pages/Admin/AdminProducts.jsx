import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';
import { getAllPlans, createPlan, updatePlan, deletePlan } from '../../services/productService';

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    level: 'Beginner',
    duration: '',
    image: '',
    isActive: true
  });

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllPlans();
      if (res.success) {
        setPlans(res.data || []);
      } else {
        setError(res.message || 'Failed to load plans');
      }
    } catch (err) {
      setError(err.message || 'Error fetching plans');
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filter for performance
  const filteredPlans = useMemo(() => {
    return plans.filter(plan =>
      plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.level?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [plans, searchQuery]);

  const handleAddNew = useCallback(() => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      level: 'Beginner',
      duration: '',
      image: '',
      isActive: true
    });
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((plan) => {
    setEditingId(plan._id);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      level: plan.level,
      duration: plan.duration,
      image: plan.image,
      isActive: plan.isActive
    });
    setShowForm(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePlan(editingId, formData);
      } else {
        await createPlan(formData);
      }
      setShowForm(false);
      fetchPlans();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save plan');
    }
  }, [editingId, formData, fetchPlans]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this training program?')) {
      try {
        await deletePlan(id);
        fetchPlans();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete plan');
      }
    }
  }, [fetchPlans]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingId(null);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Training Programs</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            <Plus size={20} />
            Add Program
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search programs by name, level, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex justify-between items-center p-6 border-b bg-white">
                <h2 className="text-2xl font-bold">
                  {editingId ? 'Edit Training Program' : 'Add New Training Program'}
                </h2>
                <button onClick={handleCloseForm} className="text-2xl font-bold hover:text-gray-600">
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Program Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 12-Week Strength Training"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Level *</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (weeks) *</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    placeholder="Describe the training program..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm font-medium">Active</label>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading training programs...</div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? 'No programs found matching your search.' : 'No training programs yet. Create your first one!'}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan, idx) => (
                  <tr key={plan._id} className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{plan.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{plan.level}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${plan.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{plan.duration} weeks</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          plan.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total Programs</p>
            <p className="text-2xl font-bold text-orange-500">{plans.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Active Programs</p>
            <p className="text-2xl font-bold text-green-500">{plans.filter(p => p.isActive).length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Search Results</p>
            <p className="text-2xl font-bold text-blue-500">{filteredPlans.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
