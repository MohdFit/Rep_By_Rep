import React, { useState } from 'react';
import { Search, Phone, XCircle, Check, X } from 'lucide-react';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Omar gggg', email: 'omar.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'Blocked' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 5, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 6, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 7, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 8, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'Blocked' },
    { id: 9, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
    { id: 10, name: 'Sarah Johnson', email: 'sarah.j@email.com', joinedDate: 'Aug 17, 2025', status: 'ACTIVE' },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toString().includes(searchQuery);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-orange-500 mb-1 border-b-2 border-orange-500 pb-2 inline-block">
            Users Management
          </h1>
          <p className="text-sm text-gray-500 mt-2">Manage customer accounts and user data</p>
        </div>

        
        <div className="bg-white rounded-lg shadow">
          
          <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900">All Users</h2>
            
            
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" size={18} />
              <input
                type="text"
                placeholder="Search by order number ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-sm"
              />
            </div>
          </div>

          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              
              <div className="grid grid-cols-[2.5fr_1.5fr_1.2fr_1fr] gap-4 px-6 py-3  border-gray-200 bg-white">
                <div className="text-lg font-Poppins text-gray-700">User</div>
                <div className="text-lg font-Poppins text-gray-700">Joined Date</div>
                <div className="text-lg font-Poppins text-gray-700">Status</div>
                <div className="text-lg font-Poppins text-gray-700">Actions</div>
              </div>

              
              <div>
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="grid grid-cols-[2.5fr_1.5fr_1.2fr_1fr] gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
                  >
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 text-lg">👤</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                    </div>

                    
                    <div className="text-sm text-gray-700">{user.joinedDate}</div>

                    
                    <div>
                      {user.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <div className="w-4 h-4 rounded-full bg-green-700 flex items-center justify-center">
                            <Check size={12} className="text-white" strokeWidth={3} />
                          </div>
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          <div className="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center">
                            <X size={12} className="text-white" strokeWidth={3} />
                          </div>
                          Blocked
                        </span>
                      )}
                    </div>

                    
                    <div className="flex items-center gap-2">
                      <button className="w-9 h-6 flex items-center justify-center hover:bg-green-100 rounded-sm border border-gray-300 transition-colors" title="Call">
                        <Phone size={16} className="text-gray-600" />
                      </button>
                      <button className="w-9 h-6 flex items-center justify-center hover:bg-red-100 rounded-sm border border-gray-300 transition-colors" title="Block">
                        <XCircle size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="block sm:hidden">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 border-b border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-xl">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-0.5 truncate">{user.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 truncate">{user.email}</p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Joined:</span> {user.joinedDate}
                    </p>
                  </div>
                  <div>
                    {user.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <Check size={12} />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        <X size={12} />
                        Blocked
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors text-xs font-medium text-gray-700">
                    <Phone size={14} />
                    Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 hover:bg-red-50 rounded-md transition-colors text-xs font-medium text-gray-700">
                    <XCircle size={14} />
                    Block
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-sm">No users found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
