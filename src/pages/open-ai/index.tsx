// pages/index.js
import { Search, Bell, Home, History, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <Search className="text-gray-500 w-6 h-6" />
        <div className="text-xl font-semibold">AC Management</div>
        <Bell className="text-gray-500 w-6 h-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Total AC Units</div>
          <div className="text-2xl font-bold">2300</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Buildings</div>
          <div className="text-2xl font-bold">20+</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Total Floors</div>
          <div className="text-2xl font-bold">120</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Rooms</div>
          <div className="text-2xl font-bold">1100</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Non-operational ACs</div>
          <div className="text-2xl font-bold">210</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">ACs Under Maintenance</div>
          <div className="text-2xl font-bold">20</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Broken ACs</div>
          <div className="text-2xl font-bold">190</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Broken ACs Under Repair</div>
          <div className="text-2xl font-bold">120</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-gray-500">Pending Repairs</div>
          <div className="text-2xl font-bold">70</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center bg-white p-4 shadow-lg border-t border-gray-200">
        <div className="flex flex-col items-center text-gray-500">
          <Home className="w-6 h-6" />
          <span className="text-sm">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <History className="w-6 h-6" />
          <span className="text-sm">History</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <Settings className="w-6 h-6" />
          <span className="text-sm">Settings</span>
        </div>
      </div>
    </div>
  );
}
