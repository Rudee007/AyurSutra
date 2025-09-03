import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  Calendar, Users, Activity, TrendingUp, Clock, 
  Video, FileText, Settings, BarChart3, Stethoscope,
  AlertCircle, CheckCircle, DollarSign, Star
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user, isLoaded } = useUser();
  const [activeSection, setActiveSection] = useState('overview');

  const getDisplayName = () => {
    if (!user) return 'Doctor';
    return user.firstName || user.fullName || 'Doctor';
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-slate-600 animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  const stats = [
    { label: 'Today\'s Patients', value: '12', icon: Users, color: 'blue' },
    { label: 'Pending Approvals', value: '5', icon: AlertCircle, color: 'orange' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'green' },
    { label: 'Revenue Today', value: '₹8,500', icon: DollarSign, color: 'purple' }
  ];

  const patients = [
    { name: 'Rajesh Kumar', time: '10:00 AM', status: 'waiting', condition: 'Arthritis' },
    { name: 'Priya Sharma', time: '10:30 AM', status: 'in-progress', condition: 'Migraine' },
    { name: 'Amit Patel', time: '11:00 AM', status: 'scheduled', condition: 'Diabetes' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Linear Gradient Background */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: 'linear-gradient(-45deg, #a7f3d0, #d1fae5, #ecfdf5, #f0fdf4)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'linear-gradient(45deg, #bbf7d0, #dcfce7, #f0fdf4, #f7fee7)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 12s ease infinite reverse'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(90deg, #ccfbf1, #f0fdfa, #f0fdf4, #fefffe)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 18s ease infinite'
        }}
      ></div>
      
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Modern Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-2xl">
            <Stethoscope className="w-10 h-10 text-white drop-shadow-sm" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Dr. {getDisplayName()}
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Welcome to your medical practice dashboard</p>
        </div>

        {/* Navigation Sections */}
        {activeSection !== 'overview' && (
          <div className="mb-8">
            <button
              onClick={() => setActiveSection('overview')}
              className="group bg-white/80 backdrop-blur-xl hover:bg-white text-slate-600 hover:text-slate-800 font-bold px-8 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-300 border border-white/30 hover:border-slate-200 hover:shadow-lg mb-8"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        )}

        {/* Main Content */}
        <div>
          {activeSection === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                onClick={() => setActiveSection('patients')}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Users className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">Patient Management</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Manage your patients and records</p>
                  </div>
                </div>
              </div>
            
              <div 
                onClick={() => setActiveSection('consultation')}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Video className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">Consultation</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Video calls and patient records</p>
                  </div>
                </div>
              </div>
            
              <div 
                onClick={() => setActiveSection('treatment')}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <FileText className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">Treatment Planning</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Create and manage treatment plans</p>
                  </div>
                </div>
              </div>
            
              <div 
                onClick={() => setActiveSection('analytics')}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <BarChart3 className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">Analytics</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">View performance metrics</p>
                  </div>
                </div>
              </div>
            
              <div 
                onClick={() => setActiveSection('settings')}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Settings className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">Profile & Settings</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Manage your profile</p>
                  </div>
                </div>
              </div>
            
              <div className="group relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/30">
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-3">Quick Actions</h3>
                    <p className="text-white/90 font-medium leading-relaxed">Emergency & shortcuts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'patients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">Patient Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Add Patient
                </button>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>All Patients</option>
                      <option>Active Treatment</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {patients.map((patient, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{patient.name}</p>
                            <p className="text-sm text-slate-600">{patient.condition}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                            View Records
                          </button>
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                            Consult
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'consultation' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Consultation Interface</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Video Consultation</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                      <Video className="w-16 h-16 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Start Call
                      </button>
                      <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        End Call
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Patient Records</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900">Current Patient</p>
                      <p className="text-sm text-slate-600">Priya Sharma</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900">Condition</p>
                      <p className="text-sm text-slate-600">Chronic Migraine</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900">AI Analysis</p>
                      <p className="text-sm text-slate-600">Vata imbalance detected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'treatment' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Treatment Planning</h2>
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">Create Treatment Plan</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Patient</label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Select Patient</option>
                        <option>Rajesh Kumar</option>
                        <option>Priya Sharma</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Treatment Type</label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Select Treatment</option>
                        <option>Panchakarma</option>
                        <option>Herbal Medicine</option>
                        <option>Yoga Therapy</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Treatment Plan</label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter detailed treatment plan..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Save Plan
                    </button>
                    <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-300 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Patient Outcomes</h3>
                  </div>
                  <div className="p-6">
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-slate-400" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">Revenue Analytics</h3>
                  </div>
                  <div className="p-6">
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-16 h-16 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Profile & Settings</h2>
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">Professional Profile</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue={`Dr. ${getDisplayName()}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue="Ayurvedic Medicine"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Consultation Fee</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      defaultValue="500"
                    />
                  </div>
                  
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;