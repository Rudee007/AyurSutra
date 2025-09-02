import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin', userType: '' });
  const { isSignedIn, user } = useUser();
  const menuItems = ['Home', 'About Us', 'Service', 'Contact'];
  const loginOptions = ['Patient', 'Doctor', 'Management'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 shadow-xl border-gray-200 py-2' 
        : 'bg-white/80 shadow-lg border-gray-100 py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-white font-bold text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">A</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className="relative text-[#101010] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{item}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></div>
              </a>
            ))}
            
            <DropdownMenu open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DropdownMenuTrigger 
                className={cn(
                  "relative text-[#101010] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden flex items-center space-x-1 hover:bg-gradient-to-r hover:from-[#2E7D32] hover:to-[#4CAF50] hover:text-white"
                )}
              >
                <span className="relative z-10">Login</span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-all duration-300 relative z-10",
                  isLoginOpen && "rotate-180 scale-110"
                )} />
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-44 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200">
                {isSignedIn ? (
                  <DropdownMenuItem className="px-4 py-3 text-sm text-[#101010] hover:bg-gradient-to-r hover:from-[#2E7D32] hover:to-[#4CAF50] hover:text-white transition-all duration-200">
                    <SignOutButton>
                      <span className="relative z-10">Sign Out</span>
                    </SignOutButton>
                  </DropdownMenuItem>
                ) : (
                  loginOptions.map((option, index) => (
                    <DropdownMenuItem
                      key={option}
                      className="px-4 py-3 text-sm text-[#101010] hover:bg-gradient-to-r hover:from-[#2E7D32] hover:to-[#4CAF50] hover:text-white transition-all duration-200 relative group overflow-hidden"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => {
                        setAuthModal({ isOpen: true, mode: 'signin', userType: option });
                        setIsLoginOpen(false);
                      }}
                    >
                      <span className="relative z-10">{option}</span>
                      <div className="absolute left-0 top-0 w-1 h-full bg-[#2E7D32] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#101010] hover:text-[#2E7D32] hover:bg-gray-100 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 rotate-45" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 bg-white/95 backdrop-blur-md border-t border-gray-200">
          {menuItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 text-[#101010] hover:bg-[#2E7D32] hover:text-white rounded-lg transition-all duration-200 mb-1"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-600 px-4 py-2">Login as:</div>
            {isSignedIn ? (
              <SignOutButton>
                <button className="block w-full text-left px-4 py-3 text-[#101010] hover:bg-[#2E7D32] hover:text-white rounded-lg transition-all duration-200 mb-1">
                  Sign Out
                </button>
              </SignOutButton>
            ) : (
              loginOptions.map((option, index) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-3 text-[#101010] hover:bg-[#2E7D32] hover:text-white rounded-lg transition-all duration-200 mb-1"
                  style={{ animationDelay: `${(index + menuItems.length) * 100}ms` }}
                  onClick={() => {
                    setAuthModal({ isOpen: true, mode: 'signin', userType: option });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        userType={authModal.userType}
      />
    </nav>
  );
};

export default Navbar;