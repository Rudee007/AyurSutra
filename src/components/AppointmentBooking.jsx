import React, { useState } from 'react';
import { User, Stethoscope, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { appointmentService } from '../services/appointmentService';

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    symptoms: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // API call to backend using service
      const result = await appointmentService.bookAppointment(formData);
      setDoctors(result.recommendedDoctors || []);
      setShowDoctors(true);
      


    } catch (err) {
      setError(err.message || 'Unable to book appointment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showDoctors) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => {
              setShowDoctors(false);
              setFormData({ symptoms: '' });
              setDoctors([]);
            }}
            className="group bg-white/60 backdrop-blur-xl hover:bg-white/80 text-emerald-600 hover:text-emerald-700 font-black px-8 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-500 border border-white/30 hover:border-emerald-300/50 hover:shadow-[0_8px_32px_rgba(16,185,129,0.2)] hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          >
            <span>← Search Again</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-[2rem]"></div>
          <div className="relative bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_60%)]"></div>
            <div className="relative">
              <h2 className="text-4xl font-black tracking-tight mb-3 drop-shadow-sm">Recommended Doctors</h2>
              <p className="text-white/90 font-semibold text-lg drop-shadow-sm">AI-matched specialists for your symptoms</p>
            </div>
          </div>

          <div className="p-6">
            {loadingDoctors ? (
              <div className="text-center py-16">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto animate-ping opacity-20"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Your Symptoms</h3>
                <p className="text-gray-600">Our AI is finding the perfect doctors for you...</p>
              </div>
            ) : doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctors.map((doctor, index) => (
                  <div key={index} className="group bg-gradient-to-br from-white via-white to-emerald-50/50 border-2 border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200">
                    <div className="flex items-start space-x-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{doctor.name}</h3>
                        <p className="text-emerald-600 font-bold mb-3 text-lg">{doctor.specialization}</p>
                        <p className="text-gray-600 mb-4 font-medium">{doctor.experience} years experience</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                              <span className="text-yellow-500 text-lg">★</span>
                              <span className="font-bold text-gray-800">{doctor.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">({doctor.reviews} reviews)</span>
                          </div>
                          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1 transform active:scale-95">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Doctors Found</h3>
                <p className="text-gray-600">We couldn't find any doctors matching your symptoms. Please try again or contact support.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-[2rem]"></div>
        <div className="relative bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_60%)]"></div>
          <div className="relative flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 shadow-lg">
              <Stethoscope className="w-8 h-8 drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight drop-shadow-sm">Find Your Doctor</h2>
              <p className="text-white/90 font-medium drop-shadow-sm">AI-powered symptom analysis</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative p-8 space-y-8">
          {error && (
            <div className="bg-gradient-to-r from-red-500/10 via-pink-500/5 to-red-500/10 backdrop-blur-xl border border-red-200/30 rounded-3xl p-6 flex items-center space-x-4 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertCircle className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <label className="block text-xl font-black text-gray-900 mb-4 tracking-tight">
              Describe Your Symptoms *
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="Tell us what you're experiencing... (e.g., headache, fever, stomach pain)"
                className="relative w-full p-8 border-0 rounded-3xl focus:ring-4 focus:ring-emerald-500/30 transition-all duration-500 resize-none text-lg bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] focus:bg-white/80 placeholder:text-gray-400"
                rows="6"
                disabled={isLoading}
                maxLength="500"
              />
              <div className="absolute bottom-6 right-6 px-3 py-1 bg-gray-100/80 backdrop-blur-sm rounded-full text-sm text-gray-500 font-medium">
                {formData.symptoms.length}/500
              </div>
            </div>
          </div>



          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <button
              type="submit"
              disabled={isLoading || !formData.symptoms.trim()}
              className="group relative w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white py-6 px-8 rounded-3xl font-black text-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_20px_60px_rgba(16,185,129,0.4)] hover:-translate-y-2 transform active:scale-95 shadow-[0_8px_32px_rgba(16,185,129,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center space-x-4">
                {isLoading ? (
                  <>
                    <div className="relative">
                      <Loader2 className="w-7 h-7 animate-spin" />
                      <div className="absolute inset-0 w-7 h-7 animate-ping opacity-20">
                        <Loader2 className="w-7 h-7" />
                      </div>
                    </div>
                    <span className="tracking-wide">Analyzing Symptoms...</span>
                  </>
                ) : (
                  <>
                    <User className="w-7 h-7 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <span className="tracking-wide">Search Nearby Doctors</span>
                    <div className="w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default AppointmentBooking;