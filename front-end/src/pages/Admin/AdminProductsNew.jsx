import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Edit2, Trash2, Plus, Check, UploadCloud, X } from 'lucide-react';
import { 
  getAllProducts, 
  getAllPlans, 
  addProduct, 
  createPlan, 
  updateProduct, 
  updatePlan, 
  deleteProduct, 
  deletePlan,
  togglePlanStatus 
} from '../../services/productService';

const ProductsDashboard = () => {
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    level: '',
    duration: '',
    sizes: [],
    colors: [],
    stock: '',
    image: '',
    isActive: true
  });

  const categories = ['All', 'MEN', 'WOMEN', 'Training Programs'];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [productsRes, plansRes] = await Promise.all([
        getAllProducts(),
        getAllPlans()
      ]);
      
      if (productsRes.success) {
        setProducts(productsRes.data || []);
      }
      if (plansRes.success) {
        setPlans(plansRes.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      if (type === 'product') {
        await deleteProduct(item._id);
      } else {
        await deletePlan(item._id);
      }
      await fetchAllData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}`);
    }
  };

  const handleToggleStatus = async (item, type) => {
    try {
      if (type === 'product') {
        await updateProduct(item._id, { isActive: !item.isActive });
      } else {
        await togglePlanStatus(item._id);
      }
      await fetchAllData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.category === 'Training Programs') {
        // Create Plan
        await createPlan({
          title: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          level: formData.level,
          duration: formData.duration
        });
      } else {
        // Create Product (T-Shirt)
        await addProduct({
          title: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          sizes: formData.sizes,
          colors: formData.colors,
          stock: parseInt(formData.stock),
          image: formData.image,
          isActive: formData.isActive
        });
      }
      
      setView('list');
      setFormData({
        category: '',
        name: '',
        description: '',
        price: '',
        level: '',
        duration: '',
        sizes: [],
        colors: [],
        stock: '',
        image: '',
        isActive: true
      });
      await fetchAllData();
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item');
    }
  };

  // Combine products and plans for display
  const allItems = [
    ...products.map(p => ({ 
      ...p, 
      type: 'product', 
      category: 'MEN/WOMEN',
      displayName: p.title,
      displayStatus: p.isActive ? 'ACTIVE' : 'INACTIVE'
    })),
    ...plans.map(p => ({ 
      ...p, 
      type: 'plan', 
      category: 'Training Programs',
      displayName: p.title,
      displayStatus: p.isActive ? 'ACTIVE' : 'INACTIVE'
    }))
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.displayName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Training Programs' && item.type === 'plan') ||
      (selectedCategory !== 'Training Programs' && item.type === 'product');
    return matchesSearch && matchesCategory;
  });

  if (view === 'form') {
    return <ProductForm 
      formData={formData} 
      setFormData={setFormData} 
      onSubmit={handleSubmit} 
      onCancel={() => setView('list')} 
    />;
  }

  return (
    <div className="min-h-screen bg-white-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">
              Products & Plans Management
            </h1>
            <p className="text-sm text-gray-600">Manage merchandise and training programs</p>
          </div>
          <button
            onClick={() => setView('form')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={20} />
            Add New Item
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-orange-500 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                />
              </div>

              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : filteredItems.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={`${item.type}-${item._id}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.displayName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">${item.price}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(item, item.type)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.displayStatus === 'ACTIVE'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.displayStatus}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDelete(item, item.type)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">No items found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Form Component
const ProductForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="min-h-screen bg-white-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block">
            Add New Item
          </h1>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
          >
            Back to List
          </button>
        </div>

        <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Category</option>
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="Training Programs">Training Programs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {formData.category === 'Training Programs' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 4 weeks, 8 weeks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
            />
            <label className="text-sm text-gray-700">Active (Visible to customers)</label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Create Item
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsDashboard;
