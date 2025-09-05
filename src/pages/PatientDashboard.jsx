import { useUser } from '@clerk/clerk-react';
import { Calendar, Clock, Activity, MessageSquare, Settings, User, Heart, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentBooking from '../components/AppointmentBooking';
import PatientProfileForm from '../components/PatientProfileForm';
import PatientDetailsForm from '../components/PatientDetailsForm';
import Footer from '../components/Footer';

const PatientDashboard = () => {
  const { user, isLoaded } = useUser();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [patientDetails, setPatientDetails] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'Guest';
    return user.firstName || 
           user.fullName || 
           user.username || 
           user.primaryEmailAddress?.emailAddress?.split('@')[0] || 
           'Patient';
  };

  // Check if user has profile on component mount
  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;
      
      // Check localStorage only (no API call)
      const savedProfile = localStorage.getItem('patientProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.name) {
          setHasProfile(true);
        }
      }
      setIsCheckingProfile(false);
    };
    
    if (isLoaded) {
      checkProfile();
    }
  }, [user, isLoaded]);

  if (!isLoaded || isCheckingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl text-gray-700 font-bold tracking-wide"
          >
            Preparing your wellness dashboard...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Show profile form if user doesn't have profile
  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Welcome to Your Ayurvedic Journey
            </h1>
            <p className="text-gray-700 text-lg">
              🌿 Please complete your profile to get personalized wellness recommendations
            </p>
          </div>
          <PatientProfileForm onComplete={() => {
            setHasProfile(true);
            setActiveSection('dashboard');
          }} />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden"
    >
      {/* Ayurvedic Natural Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Ayurvedic Leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.img
            key={`ayur-leaf-${i}`}
            src="/img/ayurvedic-leaf.svg"
            alt=""
            animate={{
              x: [0, 100 * Math.sin(i * 0.8), 0],
              y: [0, 80 * Math.cos(i * 0.6), 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            className="absolute opacity-20"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 12}%`,
              top: `${15 + i * 10}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Floating Lotus Flowers */}
        {[...Array(4)].map((_, i) => (
          <motion.img
            key={`lotus-${i}`}
            src="/img/lotus-flower.svg"
            alt=""
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 4
            }}
            className="absolute"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              left: `${20 + i * 25}%`,
              top: `${20 + i * 20}%`,
              filter: 'blur(2px)'
            }}
          />
        ))}
        
        {/* Herb Branches */}
        {[...Array(6)].map((_, i) => (
          <motion.img
            key={`herb-${i}`}
            src="/img/herb-branch.svg"
            alt=""
            animate={{
              x: [0, 50 * Math.sin(i), 0],
              y: [0, 30 * Math.cos(i), 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
            className="absolute opacity-25"
            style={{
              width: `${100 + i * 25}px`,
              height: `${50 + i * 15}px`,
              left: `${5 + i * 15}%`,
              top: `${25 + i * 12}%`,
              transform: `rotate(${i * 30}deg)`
            }}
          />
        ))}
        
        {/* Brass Bowls */}
        {[...Array(3)].map((_, i) => (
          <motion.img
            key={`bowl-${i}`}
            src="/img/brass-bowl.svg"
            alt=""
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 6
            }}
            className="absolute"
            style={{
              width: `${70 + i * 20}px`,
              height: `${42 + i * 12}px`,
              left: `${25 + i * 30}%`,
              top: `${70 + i * 5}%`
            }}
          />
        ))}
        
        {/* Bamboo Stalks */}
        {[...Array(4)].map((_, i) => (
          <motion.img
            key={`bamboo-${i}`}
            src="/img/bamboo.svg"
            alt=""
            animate={{
              x: [0, 10 * Math.sin(i * 0.5), 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 4
            }}
            className="absolute opacity-30"
            style={{
              width: `${25 + i * 5}px`,
              height: `${120 + i * 20}px`,
              left: `${80 + i * 5}%`,
              top: `${10 + i * 15}%`
            }}
          />
        ))}
        
        {/* Neem Leaves */}
        {[...Array(5)].map((_, i) => (
          <motion.img
            key={`neem-${i}`}
            src="/img/neem-leaf.svg"
            alt=""
            animate={{
              rotate: [0, 360],
              x: [0, 60 * Math.cos(i), 0],
              y: [0, 40 * Math.sin(i), 0]
            }}
            transition={{
              duration: 35 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
            className="absolute opacity-20"
            style={{
              width: `${50 + i * 10}px`,
              height: `${75 + i * 15}px`,
              left: `${15 + i * 18}%`,
              top: `${5 + i * 18}%`
            }}
          />
        ))}
        
        {/* Tulsi Leaves */}
        {[...Array(4)].map((_, i) => (
          <motion.img
            key={`tulsi-${i}`}
            src="/img/tulsi-leaf.svg"
            alt=""
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 28 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 7
            }}
            className="absolute"
            style={{
              width: `${45 + i * 12}px`,
              height: `${60 + i * 18}px`,
              left: `${60 + i * 10}%`,
              top: `${40 + i * 15}%`
            }}
          />
        ))}
        
        {/* Soft Green Gradient Overlays */}
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.06) 0%, transparent 60%)
            `
          }}
        />
        
        {/* Floating Ayurvedic Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [100, -100],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              width: `${6 + Math.random() * 10}px`,
              height: `${6 + Math.random() * 10}px`,
              background: i % 4 === 0 ? '#22c55e' : i % 4 === 1 ? '#16a34a' : i % 4 === 2 ? '#84cc16' : '#f59e0b',
              borderRadius: i % 2 === 0 ? '50%' : '30% 70% 70% 30%',
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
        
        {/* Subtle Mandala Pattern */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
          style={{
            width: '600px',
            height: '300px',
            background: 'conic-gradient(from 0deg, #22c55e, #16a34a, #84cc16, #f59e0b, #22c55e)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />

      </div>

      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Header with Stats */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl mb-8 shadow-2xl relative"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-4xl">👋</span>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-20 blur-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 tracking-tight">
                Welcome back, {getDisplayName()}
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="text-green-600 font-semibold">Health Status: Excellent</span>
              </div>
              <p className="text-gray-700 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                🌿 Ready to continue your Ayurvedic wellness journey? Let's nurture your mind, body, and spirit today.
              </p>
            </motion.div>
          </div>
          

        </motion.div>

        {/* Quick Action */}
        

        <AnimatePresence mode="wait">
          {activeSection === 'patient-details' && (
            <motion.div
              key="patient-details"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => setActiveSection('dashboard')}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/90 backdrop-blur-xl hover:bg-white text-gray-700 hover:text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 border border-green-200/50 hover:border-green-300 hover:shadow-xl mb-8"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
              </motion.button>
              <PatientDetailsForm 
                onSubmit={(details) => {
                  setPatientDetails(details);
                  setActiveSection('book-appointment');
                }}
                onBack={() => setActiveSection('dashboard')}
              />
            </motion.div>
          )}

          {activeSection === 'book-appointment' && (
            <motion.div
              key="book-appointment"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => setActiveSection('patient-details')}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/90 backdrop-blur-xl hover:bg-white text-gray-700 hover:text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 border border-green-200/50 hover:border-green-300 hover:shadow-xl mb-8"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Details</span>
              </motion.button>
              <AppointmentBooking patientDetails={patientDetails} />
            </motion.div>
          )}

          {activeSection === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => setActiveSection('dashboard')}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/90 backdrop-blur-xl hover:bg-white text-gray-700 hover:text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 border border-green-200/50 hover:border-green-300 hover:shadow-xl mb-8"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
              </motion.button>
              <PatientProfileForm onComplete={() => {
                setHasProfile(true);
                setActiveSection('dashboard');
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modern Dashboard Grid */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            {/* All Cards in Single Row */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
            >
            {[
              {
                id: 'book-appointment',
                icon: Calendar,
                title: 'Book Appointment',
                description: 'AI-powered Ayurvedic doctor matching for your dosha',
                gradient: 'from-green-500 to-emerald-600',
                hoverGradient: 'from-green-500/10 via-emerald-500/5 to-teal-500/10',
                action: () => setActiveSection('patient-details'),
                delay: 0
              },
              {
                id: 'profile',
                icon: User,
                title: 'Manage Profile',
                description: 'Update your Ayurvedic health constitution & preferences',
                gradient: 'from-emerald-500 to-teal-600',
                hoverGradient: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10',
                action: () => setActiveSection('profile'),
                delay: 0.1
              },
              {
                id: 'schedule',
                icon: Clock,
                title: 'My Schedule',
                description: 'View your Panchakarma & consultation appointments',
                gradient: 'from-teal-500 to-cyan-600',
                hoverGradient: 'from-teal-500/10 via-cyan-500/5 to-blue-500/10',
                action: () => {},
                delay: 0.2
              },
              {
                id: 'health',
                icon: Heart,
                title: 'Wellness Tracking',
                description: 'Monitor your dosha balance & holistic wellness journey',
                gradient: 'from-lime-500 to-green-600',
                hoverGradient: 'from-lime-500/10 via-green-500/5 to-emerald-500/10',
                action: () => {},
                delay: 0.3
              }
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: item.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.97 }}
                onClick={item.action}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl ${
                  item.special 
                    ? 'bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white' 
                    : 'bg-white/90 backdrop-blur-xl border border-green-100/50 hover:border-green-200'
                } p-6 h-80 w-64 shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu`}
                style={{ perspective: '1000px' }}
              >
                {/* Animated background gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${item.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    background: [
                      `linear-gradient(45deg, ${item.hoverGradient})`,
                      `linear-gradient(135deg, ${item.hoverGradient})`,
                      `linear-gradient(225deg, ${item.hoverGradient})`,
                      `linear-gradient(315deg, ${item.hoverGradient})`,
                      `linear-gradient(45deg, ${item.hoverGradient})`
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${60 + i * 10}%`
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                      className={`relative w-18 h-18 rounded-2xl flex items-center justify-center shadow-2xl ${
                        item.special 
                          ? 'bg-white/20 backdrop-blur-sm border border-white/30' 
                          : `bg-gradient-to-br ${item.gradient}`
                      }`}
                    >
                      <item.icon className={`w-9 h-9 ${item.special ? 'text-white' : 'text-white'} drop-shadow-lg`} />
                      
                      {/* Icon glow effect */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-2xl ${
                          item.special ? 'bg-white/10' : `bg-gradient-to-br ${item.gradient}`
                        } blur-md`}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: item.delay + 0.4, type: "spring" }}
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        item.special 
                          ? 'bg-white/20 border border-white/30' 
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}
                    >
                      <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                        item.special ? 'text-white' : 'text-gray-600'
                      }`} />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.h3 
                      whileHover={{ x: 5 }}
                      className={`text-2xl font-black transition-all duration-300 ${
                        item.special 
                          ? 'text-white drop-shadow-lg' 
                          : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      whileHover={{ x: 3 }}
                      className={`font-medium leading-relaxed text-lg ${
                        item.special 
                          ? 'text-white/90' 
                          : 'text-gray-600'
                      }`}
                    >
                      {item.description}
                    </motion.p>
                    
                    {/* Progress indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: item.delay + 0.8, duration: 1 }}
                      className={`h-1 rounded-full ${
                        item.special 
                          ? 'bg-white/30' 
                          : `bg-gradient-to-r ${item.gradient} opacity-20`
                      }`}
                    />
                  </div>
                  
                  {item.special && (
                    <>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-6 right-6 w-4 h-4 bg-yellow-300 rounded-full shadow-lg"
                      />
                      <div className="absolute top-4 right-4 text-xs font-bold text-yellow-200 bg-yellow-500/20 px-2 py-1 rounded-full">
                        URGENT
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
        )}
        
      </div>
      
      {/* Footer */}
      {activeSection === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <Footer />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PatientDashboard;