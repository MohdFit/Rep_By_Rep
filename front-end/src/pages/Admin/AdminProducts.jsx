
import React, { useState } from 'react';
// CHANGED: Added icons needed for the new form
import { Search, ChevronDown, Edit2, Trash2, Plus, Check, UploadCloud } from 'lucide-react';
import product1 from '../../assets/images/productWomen/woman.jpg'

const ProductsDashboard = () => {
  // --- STATE ---
  // CHANGED: Added 'view' state to toggle between 'list' and 'form'
  const [view, setView] = useState('list');

  // State for the list
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'T-Shirt', category: 'MEN', sales: 40, rating: 4.6, status: 'ACTIVE', image: '👕' },
    { id: 2, name: 'T-Shirt', category: 'WOMEN', sales: 40, rating: 4.6, status: 'INACTIVE', image: '👕' },
    { id: 3, name: 'Back Workouts', category: 'Training Programs', sales: 40, rating: 4.6, status: 'ACTIVE', image: '💪' },
    { id: 4, name: 'T-Shirt', category: 'MEN', sales: 40, rating: 4.6, status: 'ACTIVE', image: '👕' },
    { id: 5, name: 'T-Shirt', category: 'WOMEN', sales: 40, rating: 4.6, status: 'ACTIVE', image: '👕' },
    { id: 6, name: 'Back Workouts', category: 'Training Programs', sales: 40, rating: 4.6, status: 'INACTIVE', image: '💪' },
    { id: 7, name: 'T-Shirt', category: 'MEN', sales: 40, rating: 4.6, status: 'ACTIVE', image: '👕' },
    { id: 8, name: 'T-Shirt', category: 'WOMEN', sales: 40, rating: 4.6, status: 'ACTIVE', image: '👕' },
    { id: 9, name: 'Back Workouts', category: 'Training Programs', sales: 40, rating: 4.6, status: 'ACTIVE', image: '💪' },
    { id: 10, name: 'T-Shirt', category: 'WOMEN', sales: 40, rating: 4.6, status: 'ACTIVE', image: '👕' },
  ]);

  // State for the form
  // CHANGED: Added 'category' state for the form's conditional variants
  const [category, setCategory] = useState('');

  // --- LIST LOGIC ---
  const categories = ['All', 'MEN', 'WOMEN', 'Training Programs'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery);
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // --- FORM LOGIC ---
  // CHANGED: Added function to render conditional variants based on category
  const renderVariants = () => {
    switch (category) {
      case 'Training Programs':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Available Levels</label>
            <div className="space-y-2">
              <Checkbox label="Beginner" />
              <Checkbox label="Intermediate" />
              <Checkbox label="Advanced" />
            </div>
            <p className="text-xs text-gray-500">You can select one or multiple options</p>
          </div>
        );
      case 'MEN':
      case 'WOMEN':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Sizes */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Available Sizes</label>
              <div className="space-y-2">
                <Checkbox label="S" />
                <Checkbox label="M" />
                <Checkbox label="L" />
                <Checkbox label="XL" />
                <Checkbox label="2XL" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Custom size" className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
            {/* Colors */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Available Colors</label>
              <div className="space-y-2">
                <ColorCheckbox label="Black" color="#000000" />
                <ColorCheckbox label="White" color="#FFFFFF" border />
                <ColorCheckbox label="Red" color="#EF4444" />
                <ColorCheckbox label="Orange" color="#F97316" />
                <ColorCheckbox label="Blue" color="#3B82F6" />
                <ColorCheckbox label="Pink" color="#EC4899" />
                <ColorCheckbox label="Yellow" color="#EAB308" />
                <ColorCheckbox label="Green" color="#22C55E" />
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-sm text-gray-500">Select a category to see variant options.</p>;
    }
  };

  // --- CONDITIONAL RENDER ---

  // CHANGED: If view is 'form', render the Add New Product Form
  if (view === 'form') {
    return (
      <div className="min-h-screen bg-white-50 p-2 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">Add New Product</h1>
            <p className="text-lg text-black-500 pb-2">Create a new product for your catalog</p>
          </div>
          <button
            onClick={() => setView('list')} // This button goes back to the list
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
          >
            Back to Products
          </button>
        </div>

        {/* Form sections */}
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Product Details */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left side inputs */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Performance Training Tee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="MEN">MEN</option>
                    <option value="WOMEN">WOMEN</option>
                    <option value="Training Programs">Training Programs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600">Visible to customers</p>
                    <ToggleSwitch />
                  </div>
                </div>
              </div>
              {/* Right side image upload */}
              <div className="md:col-span-1">
                <div className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer">
                  <UploadCloud size={32} />
                  <span className="mt-2 text-sm font-medium">Click to upload</span>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Variants</h3>
            {renderVariants()}
          </div>

          {/* Pricing */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-64 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Price ($)
                </label>

                {/* 1. This new div holds the input and the text.
    - 'relative' is the anchor for the "optional" text.
    - 'w-64' sets the width for both the input and the text.
  */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="0.00"
                    className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm text-gray-400">
                    (optional)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-6 mt-8">
            <button
              onClick={() => setView('list')} // This button also goes back
              className="  w-[188px]     /* width: 188 */
  h-10          /* height: 40 */
  p-2           /* padding: 8px */
  gap-2.5       /* gap: 10px */
  rounded-lg    /* border-radius: 8px */
  border        /* border-width: 1px */
  border-gray /* Added a border color from your gradient */
"
            >
              Cancel
            </button>
            <button className="
  /* --- Layout & Spacing --- */
  text-white 
  flex items-center justify-center 
  transition-colors 
  self-start sm:self-auto

  /* --- NEW styles from your list --- */
  w-[188px]     /* width: 188 */
  h-10          /* height: 40 */
  p-2           /* padding: 8px */
  gap-2.5       /* gap: 10px */
  rounded-lg    /* border-radius: 8px */
  border        /* border-width: 1px */
  border-[#ff5800] /* Added a border color from your gradient */

  /* --- Gradient Background (from before) --- */
  bg-gradient-to-r from-[#ff5800] via-[#ff8800] to-[#ffb800]
  hover:from-[#e64f00] hover:via-[#e67a00] hover:to-[#e6a600]
  
  /* --- Font Styles (from before) --- */
  font-poppins font-normal text-base leading-none tracking-normal
">
              Save Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHANGED: If view is 'list' (the default), render your original product list
  return (
    <div className="min-h-screen bg-white-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-orange-500 mb-1 pb-1 inline-block border-b-2 border-orange-500">Products & Courses</h1>
            <p className="text-lg text-[#0E1830]">Manage your store's products and training programs</p>
          </div>
          {/* CHANGED: Added onClick to switch the view to 'form' */}
          <button onClick={() => setView('form')} className="
  /* --- Layout & Spacing --- */
  text-white 
  flex items-center justify-center 
  transition-colors 
  self-start sm:self-auto

  /* --- NEW styles from your list --- */
  w-[188px]     /* width: 188 */
  h-10          /* height: 40 */
  p-2           /* padding: 8px */
  gap-2.5       /* gap: 10px */
  rounded-lg    /* border-radius: 8px */
  border        /* border-width: 1px */
  border-[#ff5800] /* Added a border color from your gradient */

  /* --- Gradient Background (from before) --- */
  bg-gradient-to-r from-[#ff5800] via-[#ff8800] to-[#ffb800]
  hover:from-[#e64f00] hover:via-[#e67a00] hover:to-[#e6a600]
  
  /* --- Font Styles (from before) --- */
  font-poppins font-normal text-base leading-none tracking-normal
">
            <Plus size={16} />
            Add New Product
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Card Header */}
          <div className="p-6 flex items-center justify-between gap-4 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900">All Products</h2>

            <div className="flex flex-col sm:flex-row gap-3 lg:flex-1 sm:justify-end lg:max-w-xl">
              {/* Search Bar */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by order number ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-orange-500 text-Poppins rounded-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-500 text-sm"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full pl-4 pr-10 py-2 border border-orange-500 text-gray-500 text-Poppins rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer text-sm bg-white"
                >
                  <option value="">CATEGORY</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-[2fr_1.2fr_0.8fr_0.8fr_1.2fr_1fr] gap-4 px-6 py-3 border-gray-200 bg-white">
                <div className="text-lg font-Poppins text-gray-700">Product</div>
                <div className="text-lg font-Poppins text-gray-700">Category</div>
                <div className="text-lg font-Poppins text-gray-700">Sales</div>
                <div className="text-lg font-Poppins text-gray-700">Rating</div>
                <div className="text-lg font-Poppins text-gray-700">Status</div>
                <div className="text-lg font-Poppins text-gray-700">Actions</div>
              </div>

              {/* Table Body */}
              <div>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`grid grid-cols-[2fr_1.2fr_0.8fr_0.8fr_1.2fr_1fr] gap-4 px-6 py-4 border-b border-gray-100 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    {/* Product */}
                    <div className="flex items-center gap-3">
                      <img
                        src={product1}
                        alt="Product" // It's good practice to add an alt description
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                      <span className="text-sm text-gray-900">{product.name}</span>
                    </div>

                    {/* Category */}
                    <div className="text-sm text-gray-700">{product.category}</div>

                    {/* Sales */}
                    <div className="text-sm text-gray-700">{product.sales}</div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-700">{product.rating}</span>
                      <span className="text-yellow-400 text-sm">★</span>
                    </div>

                    {/* Status */}
                    <div>
                      {product.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <div className="w-4 h-4 rounded-full bg-green-700 flex items-center justify-center">
                            <Check size={12} className="text-white" strokeWidth={3} />
                          </div>
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-600 flex items-center justify-center">
                            {/* This is a simple way to make the INACTIVE icon */}
                            <div className="w-2 h-0.5 bg-gray-600 transform rotate-45 absolute"></div>
                            <div className="w-2 h-0.5 bg-gray-600 transform -rotate-45 absolute"></div>
                          </div>
                          INACTIVE
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded border border-gray-300 transition-colors" title="Edit">
                        <Edit2 size={14} className="text-gray-600" />
                      </button>

                      <button className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded border border-gray-300 transition-colors" title="Delete">
                        <Trash2 size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-sm">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS FOR THE FORM ---
// (Placed outside the main component)

const ToggleSwitch = () => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
  </label>
);

const Checkbox = ({ label }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

const ColorCheckbox = ({ label, color, border = false }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" className="sr-only peer" />
    <div className={`w-5 h-5 rounded-full peer-checked:ring-2 ring-offset-1 ring-orange-500 ${border ? 'border border-gray-300' : ''}`} style={{ backgroundColor: color }}></div>
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

export default ProductsDashboard;