import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, GitBranch, Zap, Skull, Scan } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "NecroDiff",
      description: "Haunted code comparison with spirit commentary",
      path: "/necrodiff",
      color: "from-red-900 to-purple-900"
    },
    {
      icon: <Skull className="w-8 h-8" />,
      title: "Time Cemetery",
      description: "Commit history as haunted gravestones",
      path: "/graveyard",
      color: "from-gray-900 to-gray-700"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Merge Ritual",
      description: "Resolve conflicts through dark magic",
      path: "/ritual",
      color: "from-purple-900 to-blue-900"
    },
    {
      icon: <Ghost className="w-8 h-8" />,
      title: "NecroTerminal",
      description: "Possessed command line interface",
      path: "/terminal",
      color: "from-green-900 to-gray-800"
    },
    {
      icon: <Scan className="w-8 h-8" />,
      title: "QR Summons",
      description: "Summon spirits with ancient symbols",
      path: "/qr",
      color: "from-orange-900 to-red-900"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-gradient-to-br from-red-900 via-purple-900 to-black animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce">🧛‍♂️</div>
      <div className="absolute top-40 right-20 text-3xl opacity-30 animate-pulse">🔮</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-15 animate-float">👻</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-25 animate-ping">💀</div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-8xl font-bold mb-6 glitch-text" 
              style={{ fontFamily: "'Creepster', cursive" }}>
            QRIPOCALYPSE
          </h1>
          <p className="text-2xl text-purple-400 mb-8 italic" 
             style={{ fontFamily: "'Eater', cursive" }}>
            Where Code Dies and Returns
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            A haunted Git forge where monsters, ghosts, and cursed diffs roam free. 
            Enter if you dare to merge with the afterlife.
          </p>
          
          <div className="flex gap-6 justify-center">
            <Link 
              to="/necrodiff"
              className="bg-gradient-to-r from-red-900 to-purple-900 hover:from-red-800 hover:to-purple-800 text-white px-8 py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 border-2 border-red-700 shadow-lg shadow-red-900/50"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              Enter the NecroLab
            </Link>
            <Link 
              to="/qr"
              className="bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 border-2 border-purple-700 shadow-lg shadow-purple-900/50"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              Summon a Ghost
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`bg-gradient-to-br ${feature.color} border-2 border-gray-800 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm group`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white" 
                  style={{ fontFamily: "'Creepster', cursive" }}>
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* QR Scanner Preview */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-orange-700 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-orange-400 mb-4" 
              style={{ fontFamily: "'Creepster', cursive" }}>
            Quick Summon Portal
          </h3>
          <p className="text-gray-400 mb-6">
            Scan this QR code to instantly summon Dracula to your current location
          </p>
          <div className="bg-white p-4 rounded-lg inline-block">
            {/* Placeholder for QR Code */}
            <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-gray-600">
              QR Code
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Eater&display=swap');
        
        .glitch-text {
          text-shadow: 
            0 0 10px #ff0000,
            0 0 20px #ff0000,
            0 0 30px #ff0000,
            0 0 40px #8b0000;
          color: #ff6b6b;
          animation: glitch-pulse 3s ease-in-out infinite;
        }
        
        @keyframes glitch-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
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

export default Landing;