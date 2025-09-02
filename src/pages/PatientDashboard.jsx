import { useUser } from '@clerk/clerk-react';
import { Calendar, Clock, Activity, MessageSquare } from 'lucide-react';

const PatientDashboard = () => {
  const { user, isLoaded } = useUser();

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
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-green-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600 animate-pulse font-light tracking-wide">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-green-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent animate-pulse mb-4">
            Welcome back, {getDisplayName()}
          </h1>
          <p className="text-slate-600 text-lg font-light tracking-wide">Your wellness journey continues ✨</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group bg-gradient-to-br from-white to-emerald-50/50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100/50 hover:border-emerald-200 cursor-pointer hover:-translate-y-4 hover:scale-105 animate-fade-in-up">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Calendar className="w-8 h-8 text-emerald-600 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">Book Appointment</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Schedule with centers</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100/50 hover:border-blue-200 cursor-pointer hover:-translate-y-4 hover:scale-105 animate-fade-in-up delay-100">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:from-blue-500 group-hover:to-blue-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Clock className="w-8 h-8 text-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">View Schedule</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Check your appointments</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-white to-purple-50/50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100/50 hover:border-purple-200 cursor-pointer hover:-translate-y-4 hover:scale-105 animate-fade-in-up delay-200">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:from-purple-500 group-hover:to-purple-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Activity className="w-8 h-8 text-purple-600 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">Therapy Tracking</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Monitor your progress</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-white to-orange-50/50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100/50 hover:border-orange-200 cursor-pointer hover:-translate-y-4 hover:scale-105 animate-fade-in-up delay-300">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:from-orange-500 group-hover:to-orange-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <MessageSquare className="w-8 h-8 text-orange-600 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">Feedback</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Share your experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;