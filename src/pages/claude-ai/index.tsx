import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ThermometerSun, 
  AlertCircle, 
  Settings, 
  BarChart3,
  Power,
  Building2,
  Calendar,
  Wrench,
  History,
  Bell,
  ChevronDown,
  RefreshCcw,
  Menu
} from 'lucide-react';

const ACManagementDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Separate main navigation items into bottom nav and sidebar
  const bottomNavItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'monitoring', icon: ThermometerSun, label: 'Monitor' },
    { id: 'maintenance', icon: Wrench, label: 'Service' },
  ];

  const sidebarItems = [
    { id: 'scheduling', icon: Calendar, label: 'Scheduling' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
  ];

  const quickStats = [
    { label: 'Total AC Units', value: '247', icon: ThermometerSun, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Active Units', value: '180', icon: Power, color: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'Need Maintenance', value: '12', icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50' },
    { label: 'Energy Usage', value: '1,247 kWh', icon: BarChart3, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 w-64 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out z-30`}>
        <div className="p-6 bg-blue-600 text-white">
          <div className="flex items-center space-x-2">
            <ThermometerSun size={24} />
            <h1 className="text-xl font-bold">AC Management</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center space-x-3 w-full p-4 rounded-lg mb-2 transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center space-x-3 w-full p-4 rounded-lg hover:bg-gray-50 text-gray-600">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={24} />
              </button>

              <div className="flex-1 flex items-center space-x-4 ml-4">
                <div className="relative flex-1 max-w-xs">
                  <select 
                    className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 transition-colors"
                    onChange={(e) => setSelectedBuilding(e.target.value)}
                    value={selectedBuilding}
                  >
                    <option value="">Select Building</option>
                    <option value="1">Rectorate Building</option>
                    <option value="2">Engineering Faculty</option>
                    <option value="3">Library Building</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {selectedBuilding && (
                  <div className="relative flex-1 max-w-xs hidden sm:block">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 transition-colors"
                      onChange={(e) => setSelectedFloor(e.target.value)}
                      value={selectedFloor}
                    >
                      <option value="">Select Floor</option>
                      <option value="1">Floor 1</option>
                      <option value="2">Floor 2</option>
                      <option value="3">Floor 3</option>
                      <option value="4">Floor 4</option>
                      <option value="5">Floor 5</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button 
                  onClick={handleRefresh}
                  className={`p-2 hover:bg-gray-50 rounded-full transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                >
                  <RefreshCcw size={20} className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-all">
                  <AlertCircle size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto pb-16 sm:pb-0">
          <div className="p-4 sm:p-6">
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm">{stat.label}</p>
                          <p className="text-xl sm:text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div className={`${stat.bgColor} p-2 sm:p-3 rounded-lg`}>
                          <stat.icon size={24} className={stat.color} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AC Units Grid */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4 sm:mb-6">AC Units Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="border border-gray-100 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold text-gray-800">AC Unit {index + 1}</h4>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-sm font-medium ${
                            index % 3 === 0 
                              ? 'bg-green-50 text-green-600' 
                              : index % 3 === 1 
                              ? 'bg-yellow-50 text-yellow-600' 
                              : 'bg-red-50 text-red-600'
                          }`}>
                            {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Standby' : 'Service Required'}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Temperature</span>
                            <span className="font-medium">24°C</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Runtime</span>
                            <span className="font-medium">8.5 hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Last Service</span>
                            <span className="font-medium">2024-03-15</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'monitoring' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Real-time Monitoring</h3>
                <p className="text-gray-500">Monitoring content will be displayed here</p>
              </div>
            )}

            {activeSection === 'maintenance' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
                <p className="text-gray-500">Maintenance content will be displayed here</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Bar - Visible only on mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-20">
          <div className="flex justify-around items-center h-16">
            {bottomNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  activeSection === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for sidebar on mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ACManagementDashboard;