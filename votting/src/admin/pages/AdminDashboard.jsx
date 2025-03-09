import React, { useState } from 'react';
import Header1 from '../components/Header1'; 
import w1 from '../../assets/images/w1.png';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Include Header1 */}
      <Header1 onSidebarToggle={handleSidebarToggle} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6" style={{marginLeft:"260px"}}>
          <h3 className="text-2xl font-bold mb-4">Dashboard Overview</h3>

          {/* Image */}
          <div className={`flex-1 mt-6 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <img src={w1} alt="Dashboard Overview" className="w-full h-auto" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
