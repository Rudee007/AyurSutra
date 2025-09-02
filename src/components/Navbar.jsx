import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser, useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Service', path: '/service' },
    { name: 'Contact', path: '/contact' }
  ];
  const loginOptions = ['Patient', 'Doctor', 'Management'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg py-2' 
          : 'bg-white/60 backdrop-blur-lg shadow-md py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <div className="group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-black text-lg">A</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center bg-gray-100/80 backdrop-blur-sm rounded-full px-2 py-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="text-gray-700 hover:text-white hover:bg-emerald-500 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isSignedIn ? (
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className="text-gray-700 hover:text-white hover:bg-red-500 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              >
                Sign Out
              </button>
            ) : (
              <DropdownMenu open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DropdownMenuTrigger 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg"
                >
                  <span>Login</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isLoginOpen && "rotate-180"
                  )} />
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-44 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border-0 mt-2 p-1">
                  {loginOptions.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer rounded-xl transition-all duration-200 font-medium"
                      onClick={() => {
                        const routes = {
                          'Patient': '/patient-login',
                          'Doctor': '/doctor-login',
                          'Management': '/management-login'
                        };
                        navigate(routes[option]);
                        setIsLoginOpen(false);
                      }}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-full p-2 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-6 bg-white/90 backdrop-blur-xl border-t border-emerald-100/50">
          {menuItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-xl transition-all duration-300 mb-2 font-medium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.name}
            </button>
          ))}
          
          <div className="mt-4 pt-4 border-t border-emerald-100/50">
            {isSignedIn ? (
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white rounded-xl transition-all duration-300 mb-2 font-medium"
              >
                Sign Out
              </button>
            ) : (
              <>
                <div className="text-sm font-semibold text-gray-600 px-6 py-2 mb-2">Login as:</div>
                {loginOptions.map((option, index) => (
                  <button
                    key={option}
                    className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-xl transition-all duration-300 mb-2 font-medium"
                    style={{ animationDelay: `${(index + menuItems.length) * 100}ms` }}
                    onClick={() => {
                      const routes = {
                        'Patient': '/patient-login',
                        'Doctor': '/doctor-login',
                        'Management': '/management-login'
                      };
                      navigate(routes[option]);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      </nav>
      
      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999]">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 max-w-md mx-4 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">Confirm Sign Out</h3>
              <p className="text-gray-600 leading-relaxed">This will end your current session and redirect you to the homepage.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  signOut(() => navigate('/'));
                  setShowSignOutConfirm(false);
                }}
                className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;