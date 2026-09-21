import React, { useState } from 'react';
import { X, Mail, Lock, User, Plane, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess?: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedIn(true);
    setTimeout(() => {
      onLoginSuccess?.(name || email.split('@')[0] || 'Traveler');
      onClose();
      setSignedIn(false);
    }, 1200);
  };

  const handleDemoLogin = () => {
    setEmail('guest.traveler@t4tickets.com');
    setName('Eng. Faisal Al-Harbi');
    setSignedIn(true);
    setTimeout(() => {
      onLoginSuccess?.('Eng. Faisal Al-Harbi');
      onClose();
      setSignedIn(false);
    }, 900);
  };

  return (
    <div
      id="auth-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D62828] to-[#E53935] flex items-center justify-center">
            <Plane className="w-5 h-5 text-white transform -rotate-45" />
          </div>
          <div>
            <span className="text-lg font-black font-heading text-[#071A3D]">
              T4<span className="text-[#E53935]">TICKETS</span>
            </span>
            <div className="text-[10px] text-gray-400 font-semibold">PASSENGER PORTAL</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-[#071A3D] shadow-sm' : 'text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-[#071A3D] shadow-sm' : 'text-gray-500'
            }`}
          >
            Create Account
          </button>
        </div>

        {signedIn ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-green-100 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-[#071A3D] font-heading">
              {mode === 'login' ? 'Signed In Successfully!' : 'Account Created!'}
            </h4>
            <p className="text-xs text-gray-500">Welcome to T4TICKETS Passenger Services.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name</label>
                <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammed Al-Shehri"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                <Lock className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#071A3D] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-md shadow-[#D62828]/25 transition-all"
            >
              {mode === 'login' ? 'Sign In to Portal' : 'Register Account'}
            </button>

            {/* Quick Demo Login Option */}
            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Fast Demo Sign In (One-Click)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
