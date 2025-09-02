import { SignIn } from '@clerk/clerk-react';
import { Settings, Crown, Database } from 'lucide-react';

const ManagementLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-400/30 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-400/25 to-yellow-500/15 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3.5s'}}></div>
        <div className="absolute top-1/5 right-1/5 w-64 h-64 bg-gradient-to-bl from-yellow-300/20 to-orange-400/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '22s'}}></div>
        <div className="absolute bottom-1/5 left-1/5 w-52 h-52 bg-gradient-to-tr from-red-400/15 to-amber-500/20 rounded-full blur-2xl animate-ping" style={{animationDuration: '4.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-conic from-orange-400/5 via-amber-400/10 to-yellow-400/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '28s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-300/15 rounded-full blur-xl animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-radial from-amber-500/3 via-transparent to-transparent animate-pulse" style={{animationDuration: '8s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden group hover:bg-white/15 transition-all duration-500 w-full">
          {/* Gradient border animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-[1px] bg-gray-900/90 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <Settings className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                  <Crown className="w-3 h-3 text-yellow-900" />
                </div>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-3">Admin Portal</h1>
              <p className="text-orange-100/80 text-lg font-medium">Executive command center</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <Database className="w-6 h-6 text-orange-300" />
                  </div>
                  <span className="text-xs text-orange-200 font-medium">Full Access</span>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <Crown className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="text-xs text-amber-200 font-medium">Executive</span>
                </div>
              </div>
            </div>

            <SignIn 
              fallbackRedirectUrl="/management-dashboard"
              signUpFallbackRedirectUrl="/management-dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200',
                  card: 'shadow-none bg-transparent',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  formFieldInput: 'bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl',
                  formFieldLabel: 'text-orange-200 font-medium',
                  identityPreviewText: 'text-white',
                  formFieldInputShowPasswordButton: 'text-orange-300 hover:text-orange-200'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementLogin;