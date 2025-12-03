// pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Ghost, Skull, Zap } from 'lucide-react';
import { register as registerUser } from './services/authService.jsx';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordMatchError('');
    
    // Client-side password match validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call authService.register
      const result = await registerUser(
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      
      if (result.success) {
        // Store token in localStorage on success
        localStorage.setItem('authToken', result.token);
        
        // Call onLogin callback with token for auto-login
        onLogin(result.token);
      } else {
        // Display error message from service response
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-gradient-to-br from-green-900 via-purple-900 to-black animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce">🧟</div>
      <div className="absolute top-40 right-20 text-3xl opacity-30 animate-pulse">⚡</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-15 animate-float">👻</div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: "'Creepster', cursive" }}>
              SUMMON SPIRIT
            </h1>
            <p className="text-xl text-purple-400 italic" style={{ fontFamily: "'Eater', cursive" }}>
              Join the Haunted Developer Coven
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-green-700 rounded-xl p-8 shadow-2xl shadow-green-900/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Messages */}
              {error && (
                <div className="bg-red-900/50 border-2 border-red-600 rounded-lg p-4 text-red-200">
                  <p className="font-bold">⚠️ Summoning Failed</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}
              
              {passwordMatchError && (
                <div className="bg-red-900/50 border-2 border-red-600 rounded-lg p-4 text-red-200">
                  <p className="font-bold">⚠️ Incantation Mismatch</p>
                  <p className="text-sm mt-1">{passwordMatchError}</p>
                </div>
              )}
              
              {/* Username */}
              <div>
                <label className="block text-white font-bold mb-2" style={{ fontFamily: "'Creepster', cursive" }}>
                  SPIRIT NAME
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ancient_Coder"
                  className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-600 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-bold mb-2" style={{ fontFamily: "'Creepster', cursive" }}>
                  SPIRIT IDENTIFIER
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="new.sorcerer@qripocalypse.com"
                  className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-600 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white font-bold mb-2" style={{ fontFamily: "'Creepster', cursive" }}>
                  SECRET INCANTATION
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-600 focus:outline-none transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white font-bold mb-2" style={{ fontFamily: "'Creepster', cursive" }}>
                  CONFIRM INCANTATION
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-600 focus:outline-none transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2 mt-1 flex-shrink-0"
                    required
                  />
                  <span className="text-gray-400 text-sm">
                    I accept the{' '}
                    <Link to="/terms" className="text-green-400 hover:text-green-300 underline">
                      Ancient Coven Agreement
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-green-400 hover:text-green-300 underline">
                      Spirit Privacy Protocol
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.acceptTerms}
                className="w-full bg-gradient-to-r from-green-900 to-purple-900 hover:from-green-800 hover:to-purple-800 text-white py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-green-700"
                style={{ fontFamily: "'Creepster', cursive" }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span>
                    PERFORMING SUMMONING RITUAL...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap size={20} />
                    SUMMON SPIRIT
                    <Ghost size={20} />
                  </span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">QUICK SUMMONING</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-3 border border-gray-700">
                <span className="text-2xl">🔮</span>
                GitHub Spirit
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-3 border border-gray-700">
                <span className="text-2xl">⚡</span>
                Google Ghost
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Already possessed?{' '}
                <Link to="/login" className="text-green-400 hover:text-green-300 font-bold transition-colors">
                  Enter the crypt
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-purple-900/30 rounded-lg p-4">
              <div className="text-2xl mb-2">🧛</div>
              <p className="text-xs text-purple-300">Haunted Code Reviews</p>
            </div>
            <div className="bg-green-900/30 rounded-lg p-4">
              <div className="text-2xl mb-2">🔮</div>
              <p className="text-xs text-green-300">AI Spirit Assistant</p>
            </div>
            <div className="bg-red-900/30 rounded-lg p-4">
              <div className="text-2xl mb-2">⚰️</div>
              <p className="text-xs text-red-300">Commit Cemetery</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-4">
              <div className="text-2xl mb-2">👻</div>
              <p className="text-xs text-blue-300">Ghost Collaboration</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Eater&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;