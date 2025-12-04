import React, { useState, useEffect } from 'react';

/**
 * PersonaSelector Component
 * Dropdown for selecting active haunted persona with localStorage persistence
 * 
 * @param {array} characters - Array of character objects with id, name, emoji
 * @param {string} selectedPersona - Currently selected persona ID
 * @param {function} onSelect - Callback when persona is selected
 */
const PersonaSelector = ({ characters = [], selectedPersona, onSelect }) => {
  const [activePersona, setActivePersona] = useState(selectedPersona || '');

  // Load persona from localStorage on mount
  useEffect(() => {
    const savedPersona = loadFromLocalStorage();
    if (savedPersona && !selectedPersona) {
      setActivePersona(savedPersona);
      if (onSelect) {
        onSelect(savedPersona);
      }
    }
  }, []);

  // Save to localStorage whenever activePersona changes
  useEffect(() => {
    if (activePersona) {
      saveToLocalStorage(activePersona);
    }
  }, [activePersona]);

  const handleSelect = (e) => {
    const personaId = e.target.value;
    setActivePersona(personaId);
    if (onSelect) {
      onSelect(personaId);
    }
  };

  const saveToLocalStorage = (persona) => {
    try {
      localStorage.setItem('qr_persona_selection', persona);
    } catch (error) {
      console.error('Error saving persona to localStorage:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      return localStorage.getItem('qr_persona_selection') || '';
    } catch (error) {
      console.error('Error loading persona from localStorage:', error);
      return '';
    }
  };

  // Get the selected character object
  const selectedCharacter = characters.find(char => char.id === activePersona);

  return (
    <div className="w-full max-w-md">
      <label 
        htmlFor="persona-selector" 
        className="block text-purple-300 text-lg font-semibold mb-2"
        style={{ fontFamily: 'Creepster, cursive' }}
      >
        👻 Active Persona
      </label>
      
      <div className="relative">
        <select
          id="persona-selector"
          value={activePersona}
          onChange={handleSelect}
          className="w-full bg-gray-800 border-2 border-purple-500 text-white rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          aria-label="Select active persona"
        >
          <option value="" disabled>
            Select a haunted companion...
          </option>
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.emoji} {character.name}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-purple-400">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </div>

      {/* Display selected character info */}
      {selectedCharacter && (
        <div className="mt-3 p-3 bg-gray-800 border border-purple-500 rounded-lg">
          <p className="text-green-400 text-sm">
            <span className="text-2xl mr-2">{selectedCharacter.emoji}</span>
            <span className="font-semibold">{selectedCharacter.name}</span> is now your active companion
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
