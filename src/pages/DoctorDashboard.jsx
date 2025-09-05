import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Video,
  FileText,
  Settings,
  BarChart3,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Star,
} from "lucide-react";
import { doctorAuthService } from "../services/doctorAuthService";
import { appointmentManager } from "../services/appointmentManager";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [appointments, setAppointments] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    // Check if doctor is logged in
    const currentDoctor = doctorAuthService.getCurrentDoctor();
    if (!currentDoctor) {
      navigate("/doctor-login");
      return;
    }

    setDoctorInfo(currentDoctor);

    // Load appointments for this doctor
    const doctorAppointments = appointmentManager.getDoctorAppointments(
      currentDoctor.username
    );
    setAppointments(doctorAppointments);
  }, [navigate]);

  const getDisplayName = () => {
    return doctorInfo?.name || "Doctor";
  };

  if (!doctorInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-slate-600 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Today's Patients", value: "12", icon: Users, color: "blue" },
    {
      label: "Pending Approvals",
      value: "5",
      icon: AlertCircle,
      color: "orange",
    },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "green" },
    {
      label: "Revenue Today",
      value: "₹8,500",
      icon: DollarSign,
      color: "purple",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateAppointmentStatus = (appointmentIndex, newStatus) => {
    const appointment = appointments[appointmentIndex];
    const success = appointmentManager.updateAppointmentStatus(
      doctorInfo.username,
      appointment.id,
      newStatus
    );

    if (success) {
      // Update local state
      const updatedAppointments = appointments.map((apt, idx) =>
        idx === appointmentIndex ? { ...apt, status: newStatus } : apt
      );
      setAppointments(updatedAppointments);
    }
  };

  const handleLogout = () => {
    doctorAuthService.logout();
    navigate("/doctor-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Medical + Ayurvedic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Herbal Leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.img
            key={`leaf-${i}`}
            src="/img/ayurvedic-leaf.svg"
            alt=""
            animate={{
              y: [0, -20, 0],
              x: [0, 15 * Math.sin(i), 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute opacity-15"
            style={{
              width: `${40 + i * 8}px`,
              height: `${40 + i * 8}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}

        {/* Mandala Patterns in Corners */}
        {[...Array(2)].map((_, i) => (
          <motion.img
            key={`mandala-${i}`}
            src="/img/mandala-pattern.svg"
            alt=""
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute opacity-8"
            style={{
              width: "120px",
              height: "120px",
              left: i === 0 ? "5%" : "85%",
              top: i === 0 ? "10%" : "70%",
            }}
          />
        ))}

        {/* Medical Cross Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.img
            key={`cross-${i}`}
            src="/img/medical-cross.svg"
            alt=""
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
            className="absolute"
            style={{
              width: "30px",
              height: "30px",
              left: `${70 + i * 10}%`,
              top: `${30 + i * 20}%`,
            }}
          />
        ))}

        {/* ECG Line */}
        <motion.img
          src="/img/ecg-line.svg"
          alt=""
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            width: "200px",
            height: "60px",
            left: "40%",
            top: "80%",
          }}
        />

        {/* Medicine Bottles */}
        {[...Array(2)].map((_, i) => (
          <motion.img
            key={`bottle-${i}`}
            src="/img/medicine-bottle.svg"
            alt=""
            animate={{
              y: [0, -8, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 4,
            }}
            className="absolute"
            style={{
              width: "40px",
              height: "60px",
              left: `${15 + i * 60}%`,
              top: `${60 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-2xl"
          >
            <Stethoscope className="w-10 h-10 text-white drop-shadow-sm" />
          </motion.div>
          <div className="flex items-center justify-between mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-green-600 bg-clip-text text-transparent tracking-tight"
            >
              Dr. {getDisplayName()}
            </motion.h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            🌿 Welcome to your Ayurvedic practice dashboard
          </motion.p>
        </motion.div>

        {/* Navigation Sections */}
        {activeSection !== "overview" && (
          <div className="mb-8">
            <button
              onClick={() => setActiveSection("overview")}
              className="group bg-white/80 backdrop-blur-xl hover:bg-white text-slate-600 hover:text-slate-800 font-bold px-8 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-300 border border-white/30 hover:border-slate-200 hover:shadow-lg mb-8"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        )}

        {/* Main Content */}
        <div>
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                onClick={() => setActiveSection("patients")}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Users className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      Patient Management
                    </h3>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-emerald-600">
                        {appointments.length}
                      </div>
                      <p className="text-slate-500 font-medium">
                        Manage Your Patient
                      </p>
                      <div className="flex justify-center space-x-4 text-sm">
                        <span className="text-yellow-600 font-medium">
                          {
                            appointments.filter(
                              (apt) => apt.status === "pending"
                            ).length
                          }{" "}
                          Pending
                        </span>
                        <span className="text-green-600 font-medium">
                          {
                            appointments.filter(
                              (apt) => apt.status === "confirmed"
                            ).length
                          }{" "}
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("consultation")}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Video className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                      Consultation
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Video calls and patient records
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("treatment")}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <FileText className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                      Treatment Planning
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Create and manage treatment plans
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("analytics")}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <BarChart3 className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">
                      Analytics
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      View performance metrics
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveSection("settings")}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Settings className="w-10 h-10 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">
                      Profile & Settings
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Manage your profile
                    </p>
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
                    <p className="text-white/90 font-medium leading-relaxed">
                      Emergency & shortcuts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "patients" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900">
                  Patient Management
                </h2>
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
                    {appointments.length > 0 ? (
                      appointments.map((appointment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-slate-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {appointment.patientName}
                              </p>
                              <p className="text-sm text-slate-600">
                                Age: {appointment.age} | Phone:{" "}
                                {appointment.phone}
                              </p>
                              <p className="text-sm text-slate-500">
                                Symptoms: {appointment.symptoms}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                            <select
                              value={appointment.status}
                              onChange={(e) =>
                                updateAppointmentStatus(index, e.target.value)
                              }
                              className="px-2 py-1 border border-slate-300 rounded text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>No appointments found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "consultation" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                Consultation Interface
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">
                      Video Consultation
                    </h3>
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
                    <h3 className="text-xl font-bold text-slate-900">
                      Patient Records
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900">
                        Specialization
                      </p>
                      <p className="text-sm text-slate-600">
                        {doctorInfo?.panchakarma}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900">
                        Total Appointments
                      </p>
                      <p className="text-sm text-slate-600">
                        {appointments.length}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="font-semibold text-slate-900">Pending</p>
                      <p className="text-sm text-slate-600">
                        {
                          appointments.filter((apt) => apt.status === "pending")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "treatment" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                Treatment Planning
              </h2>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">
                    Create Treatment Plan
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Patient
                      </label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Select Patient</option>
                        {appointments.map((appointment, index) => (
                          <option key={index} value={appointment.patientName}>
                            {appointment.patientName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Treatment Type
                      </label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Select Treatment</option>
                        <option>
                          {doctorInfo?.panchakarma || "Panchakarma"}
                        </option>
                        <option>Herbal Medicine</option>
                        <option>Yoga Therapy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Treatment Plan
                    </label>
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

          {activeSection === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                Analytics Dashboard
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">
                      Patient Outcomes
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">
                      Revenue Analytics
                    </h3>
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

          {activeSection === "settings" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                Profile & Settings
              </h2>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">
                    Professional Profile
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue={`Dr. ${getDisplayName()}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Specialization
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue={
                          doctorInfo?.panchakarma || "Ayurvedic Medicine"
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Consultation Fee
                    </label>
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
