import { useUser } from '@clerk/clerk-react';
import { Calendar, Clock, Activity, MessageSquare, Settings } from 'lucide-react';
import { useState } from 'react';
import AppointmentBooking from '../components/AppointmentBooking';
import PatientProfileForm from '../components/PatientProfileForm';

const PatientDashboard = () => {
  const { user, isLoaded } = useUser();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'Guest';
    return user.firstName || 
           user.fullName || 
           user.username || 
           user.primaryEmailAddress?.emailAddress?.split('@')[0] || 
           'Patient';
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-slate-600 animate-pulse font-medium tracking-wide">Loading your dashboard...</div>
      </div>
    );
  }

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
            <span className="text-3xl font-black text-white">👋</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Hello, {getDisplayName()}
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Ready to take control of your health? Let's explore your wellness options.</p>
        </div>

        {/* Quick Action */}
        

        {activeSection === 'book-appointment' && (
          <div className="mb-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className="group bg-white/80 backdrop-blur-xl hover:bg-white text-slate-600 hover:text-slate-800 font-bold px-8 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-300 border border-white/30 hover:border-slate-200 hover:shadow-lg mb-8"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Dashboard</span>
            </button>
            <AppointmentBooking />
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="mb-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className="group bg-white/80 backdrop-blur-xl hover:bg-white text-slate-600 hover:text-slate-800 font-bold px-8 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-300 border border-white/30 hover:border-slate-200 hover:shadow-lg mb-8"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Dashboard</span>
            </button>
            <PatientProfileForm onComplete={() => setActiveSection('dashboard')} />
          </div>
        )}

        {/* Modern Dashboard Grid */}
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              onClick={() => setActiveSection('book-appointment')}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Calendar className="w-10 h-10 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">Book Appointment</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Find the perfect doctor for your symptoms</p>
                </div>
              </div>
            </div>
          
            <div 
              onClick={() => setActiveSection('profile')}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Settings className="w-10 h-10 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">Manage Profile</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Update your personal information</p>
                </div>
              </div>
            </div>
          
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Clock className="w-10 h-10 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">My Schedule</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">View upcoming appointments</p>
                </div>
              </div>
            </div>
          
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Activity className="w-10 h-10 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">Health Tracking</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Monitor your wellness journey</p>
                </div>
              </div>
            </div>
          
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <MessageSquare className="w-10 h-10 text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">Support</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Get help and share feedback</p>
                </div>
              </div>
            </div>
          
            <div className="group relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center space-y-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/30">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-black mb-3">Quick Actions</h3>
                  <p className="text-white/90 font-medium leading-relaxed">Emergency contacts & shortcuts</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;