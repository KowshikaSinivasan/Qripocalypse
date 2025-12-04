import React from 'react';

/**
 * PremiumDialog Component
 * Displays a spooky modal for premium/locked features
 * 
 * @param {boolean} isOpen - Whether the dialog is visible
 * @param {function} onClose - Callback to close the dialog
 * @param {string} featureName - Name of the locked feature
 */
const PremiumDialog = ({ isOpen, onClose, featureName = 'Premium Feature' }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-dialog-title"
    >
      <div className="relative bg-gradient-to-br from-purple-900 via-gray-900 to-black border-4 border-purple-500 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-pulse-slow">
        {/* Haunted border glow effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-green-500 opacity-30 animate-pulse"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Ghost decorations */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">
            👻 💀 👻
          </div>
          
          {/* Title */}
          <h2 
            id="premium-dialog-title"
            className="text-4xl font-bold text-purple-300 mb-2"
            style={{ fontFamily: 'Creepster, cursive' }}
          >
            Cursed Feature
          </h2>
          
          <p className="text-xl text-green-400" style={{ fontFamily: 'Creepster, cursive' }}>
            {featureName}
          </p>
        </div>

        {/* Main message */}
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-red-500 mb-4" style={{ fontFamily: 'Creepster, cursive' }}>
            💰 Pay to Unlock 💰
          </p>
          
          <p className="text-gray-300 text-lg mb-2">
            This feature is locked in the spirit realm...
          </p>
          
          <p className="text-gray-400 text-sm">
            Only those who offer tribute may pass 🔮
          </p>
        </div>

        {/* Spooky decorative elements */}
        <div className="flex justify-center gap-4 text-4xl mb-6">
          <span className="animate-pulse">🕷️</span>
          <span className="animate-bounce">🦇</span>
          <span className="animate-pulse">🕸️</span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Creepster, cursive' }}
          >
            Return to Safety
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Maybe Later...
          </button>
        </div>

        {/* Bottom ghost */}
        <div className="text-center mt-6 text-2xl opacity-50">
          👻
        </div>
      </div>
    </div>
  );
};

export default PremiumDialog;
