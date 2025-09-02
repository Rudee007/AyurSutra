import { useUser, SignOutButton } from '@clerk/clerk-react';
import { Calendar, FileText, Heart, User } from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.firstName}</h1>
            <p className="text-gray-600">Patient Dashboard</p>
          </div>
          <SignOutButton>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Sign Out
            </button>
          </SignOutButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Calendar className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Appointments</h3>
            <p className="text-gray-600">Manage your appointments</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FileText className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Medical Records</h3>
            <p className="text-gray-600">View your health records</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Heart className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Health Tracking</h3>
            <p className="text-gray-600">Monitor your wellness</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <User className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Profile</h3>
            <p className="text-gray-600">Update your information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;