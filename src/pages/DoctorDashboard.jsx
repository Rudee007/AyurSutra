import { useUser, SignOutButton } from '@clerk/clerk-react';
import { Users, Calendar, FileText, Activity } from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dr. {user?.firstName}</h1>
            <p className="text-gray-600">Doctor Dashboard</p>
          </div>
          <SignOutButton>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Sign Out
            </button>
          </SignOutButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Patients</h3>
            <p className="text-gray-600">Manage patient records</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Calendar className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Schedule</h3>
            <p className="text-gray-600">View appointments</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FileText className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Prescriptions</h3>
            <p className="text-gray-600">Write prescriptions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Activity className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold text-gray-800">Analytics</h3>
            <p className="text-gray-600">Patient insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;