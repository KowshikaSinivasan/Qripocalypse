import React from 'react';

const About = () => {
  const team = [
    {
      name: 'Dr. Victor Frankenstein',
      role: 'Lead Necromancer',
      contribution: 'Code Resurrection & Monster Assembly',
      ghost: '🧟'
    },
    {
      name: 'Count Dracula',
      role: 'Deletion Specialist',
      contribution: 'Bloodline Purity & Code Elimination',
      ghost: '🧛'
    },
    {
      name: 'Witch of Merge Conflicts',
      role: 'Ritual Master',
      contribution: 'Dark Magic & Conflict Resolution',
      ghost: '🧙‍♀️'
    },
    {
      name: 'The Ancient Ghost',
      role: 'History Keeper',
      contribution: 'Commit Archaeology & Time Travel',
      ghost: '👻'
    }
  ];

  const technologies = [
    { name: 'React', purpose: 'Spirit Manifestation' },
    { name: 'TypeScript', purpose: 'Ancient Runes Translation' },
    { name: 'Tailwind CSS', purpose: 'Dark Aesthetics Crafting' },
    { name: 'Node.js', purpose: 'Ritual Backend Operations' },
    { name: 'WebGL', purpose: 'Ethereal Visual Effects' },
    { name: 'QR Code Magic', purpose: 'Spirit Summoning System' }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: "'Creepster', cursive" }}>
            📜 ANCIENT SCROLLS 📜
          </h1>
          <p className="text-xl text-purple-400 italic" style={{ fontFamily: "'Eater', cursive" }}>
            The Lore and Technology Behind Qripocalypse
          </p>
        </header>

        {/* Origin Story */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-purple-700 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center" style={{ fontFamily: "'Creepster', cursive" }}>
            THE ORIGIN STORY
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed">
            <p className="mb-4">
              In the darkest corners of the digital realm, where code goes to die and bugs haunt the living, 
              a group of ancient spirits grew tired of the mundane Git interfaces of mortal developers.
            </p>
            <p className="mb-4">
              <strong>Dr. Frankenstein</strong>, master of resurrection, sought to breathe new life into dead code. 
              <strong> Count Dracula</strong>, perfectionist of the night, demanded elegance in deletion. 
              The <strong>Witch of Merge Conflicts</strong> brewed potions to resolve coding disputes, 
              while <strong>The Ancient Ghost</strong> remembered every commit since the dawn of programming.
            </p>
            <p>
              Together, they forged <strong>Qripocalypse</strong>—a haunted Git forge where code doesn't just change; 
              it transforms, possesses, and returns from the grave. Here, every diff tells a story, 
              every commit has a spirit, and every merge is a ritual.
            </p>
          </div>
        </div>

        {/* The Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: "'Creepster', cursive" }}>
            THE HAUNTED COUNCIL
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{member.ghost}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-purple-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-400">{member.contribution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-green-700 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center" style={{ fontFamily: "'Creepster', cursive" }}>
            ANCIENT TECHNOLOGIES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4 border border-green-800">
                <h3 className="text-white font-bold mb-2">{tech.name}</h3>
                <p className="text-green-400 text-sm">{tech.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-xl font-bold text-white mb-2">Spirit-Powered Diffs</h3>
            <p className="text-gray-400">Haunted characters analyze and comment on your code changes</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚰️</div>
            <h3 className="text-xl font-bold text-white mb-2">Commit Cemetery</h3>
            <p className="text-gray-400">Visualize your commit history as interactive gravestones</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🧙‍♀️</div>
            <h3 className="text-xl font-bold text-white mb-2">Merge Rituals</h3>
            <p className="text-gray-400">Resolve conflicts through magical incantations and spells</p>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center bg-gray-900/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Creepster', cursive" }}>
            JOIN THE HAUNTING
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Qripocalypse is more than a tool—it's an experience. Whether you're fixing bugs, 
            merging features, or exploring commit history, you're never coding alone. The spirits are with you.
          </p>
          <div className="text-4xl">🧛‍♂️⚰️🔮</div>
        </div>
      </div>
    </div>
  );
};

export default About;