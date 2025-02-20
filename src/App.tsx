import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Activity,
  Terminal as TerminalIcon,
  Database,
  Search,
  Brain,
  Lock,
  Radar,
  MessageSquare,
  Bell,
  User,
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Background3D from './components/Background3D';
import ChatWindow from './components/ChatWindow';
import Terminal from './components/Terminal';
import { useSecurityStore } from './store/securityStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const { startScan, isScanning, scanResults } = useSecurityStore();

  const stats = [
    { label: 'Threats Detected', value: '24', trend: '+3', icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
    { label: 'System Health', value: '98%', trend: '+1%', icon: <Activity className="w-5 h-5 text-green-500" /> },
    { label: 'Active Scans', value: '3', trend: '0', icon: <Radar className="w-5 h-5 text-blue-500" /> },
    { label: 'Log Entries', value: '1.2M', trend: '+2.3k', icon: <Database className="w-5 h-5 text-purple-500" /> },
  ];

  const handleQuickScan = async () => {
    if (isScanning) {
      toast.error('A scan is already in progress');
      return;
    }
    
    toast.promise(startScan(), {
      loading: 'Starting security scan...',
      success: 'Scan completed successfully',
      error: 'Failed to complete scan',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100/90 relative">
      <Background3D />
      <Toaster position="top-right" />
      
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">CSAA</span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
              <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm shadow-lg h-[calc(100vh-4rem)] relative z-10">
          <nav className="mt-5 px-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Activity className="mr-3 h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('threats')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full mt-1 transition-colors ${
                activeTab === 'threats' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <AlertTriangle className="mr-3 h-5 w-5" />
              Threat Detection
            </button>
            <button
              onClick={() => setShowTerminal(true)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full mt-1 transition-colors ${
                showTerminal ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TerminalIcon className="mr-3 h-5 w-5" />
              Terminal
            </button>
            <button
              onClick={() => setActiveTab('intelligence')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full mt-1 transition-colors ${
                activeTab === 'intelligence' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Brain className="mr-3 h-5 w-5" />
              Intelligence
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Security Overview</h1>
              <div className="flex space-x-4">
                <button
                  onClick={handleQuickScan}
                  disabled={isScanning}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Quick Scan
                </button>
                <button
                  onClick={() => setShowChat(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask Assistant
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                    {stat.icon}
                  </div>
                  <div className="mt-4">
                    <span className={`text-sm ${
                      stat.trend.startsWith('+') ? 'text-green-600' : stat.trend === '0' ? 'text-gray-600' : 'text-red-600'
                    }`}>
                      {stat.trend} today
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Security Events */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Events</h2>
                <div className="space-y-4">
                  {[
                    { type: 'warning', message: 'Unusual login attempt detected', time: '2 minutes ago' },
                    { type: 'error', message: 'Failed SSH authentication', time: '5 minutes ago' },
                    { type: 'info', message: 'System scan completed', time: '10 minutes ago' },
                    ...scanResults.map(result => ({
                      type: result.type,
                      message: result.message,
                      time: 'Just now'
                    }))
                  ].map((event, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        event.type === 'warning' ? 'bg-yellow-400' : 
                        event.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.message}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
                <div className="space-y-4">
                  {[
                    { label: 'CPU Usage', value: '45%', color: 'bg-green-500' },
                    { label: 'Memory Usage', value: '62%', color: 'bg-yellow-500' },
                    { label: 'Network Traffic', value: '78%', color: 'bg-blue-500' },
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                        <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${metric.color} transition-all duration-500`}
                          style={{ width: metric.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showChat && <ChatWindow />}
      <Terminal isVisible={showTerminal} onClose={() => setShowTerminal(false)} />
    </div>
  );
}

export default App;