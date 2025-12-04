/**
 * QR Storage Service
 * Handles localStorage operations for QR data and recent summons
 */

// Generate unique 24-character hex ID (ObjectId-like)
export const generateUniqueId = () => {
  const timestamp = Date.now().toString(16).padStart(12, '0');
  const random = Math.random().toString(16).substring(2, 14).padStart(12, '0');
  return (timestamp + random).substring(0, 24);
};

// Encode text to ObjectId-like hex string (from qrgenerator.jsx)
export const encodeToObjectId = (text) => {
  let hex = '';
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16);
  }
  // Pad to 24 characters (ObjectId length)
  while (hex.length < 24) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  hex = hex.substring(0, 24);
  return hex;
};

/**
 * Save QR data to localStorage
 * @param {string} type - Summon type (theme, diff, commit, projectFile, deployment)
 * @param {object} data - Type-specific data
 * @returns {object} { id, timestamp } or null on error
 */
export const saveQRData = (type, data) => {
  try {
    const id = generateUniqueId();
    const timestamp = new Date().toISOString();
    
    const qrData = {
      id,
      type,
      timestamp,
      data
    };
    
    localStorage.setItem(`qr_data_${id}`, JSON.stringify(qrData));
    
    return { id, timestamp };
  } catch (error) {
    console.error('Error saving QR data:', error);
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please clear old QR codes.');
    }
    return null;
  }
};

/**
 * Retrieve QR data from localStorage by ID
 * @param {string} id - QR data ID
 * @returns {object|null} QR data object or null if not found
 */
export const retrieveQRData = (id) => {
  try {
    const data = localStorage.getItem(`qr_data_${id}`);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error retrieving QR data:', error);
    return null;
  }
};

/**
 * Get recent summons from localStorage
 * @param {number} limit - Maximum number of entries (default 20)
 * @returns {array} Array of recent summon objects
 */
export const getRecentSummons = (limit = 20) => {
  try {
    const data = localStorage.getItem('qr_recent_summons');
    if (!data) {
      return [];
    }
    const summons = JSON.parse(data);
    return summons.slice(0, limit);
  } catch (error) {
    console.error('Error getting recent summons:', error);
    return [];
  }
};

/**
 * Add entry to recent summons history
 * @param {object} qr - QR object { id, type, name, timestamp }
 */
export const addToRecentSummons = (qr) => {
  try {
    const summons = getRecentSummons();
    
    // Add new entry at the beginning
    summons.unshift({
      id: qr.id,
      type: qr.type,
      name: qr.name,
      date: new Date(qr.timestamp).toLocaleString(),
      icon: getTypeIcon(qr.type),
      timestamp: qr.timestamp
    });
    
    // Limit to 20 entries
    const limitedSummons = summons.slice(0, 20);
    
    localStorage.setItem('qr_recent_summons', JSON.stringify(limitedSummons));
  } catch (error) {
    console.error('Error adding to recent summons:', error);
  }
};

/**
 * Clear old summons beyond the limit
 */
export const clearOldSummons = () => {
  try {
    const summons = getRecentSummons(20);
    localStorage.setItem('qr_recent_summons', JSON.stringify(summons));
  } catch (error) {
    console.error('Error clearing old summons:', error);
  }
};

/**
 * Get icon emoji for summon type
 * @param {string} type - Summon type
 * @returns {string} Emoji icon
 */
const getTypeIcon = (type) => {
  const icons = {
    theme: '🎨',
    diff: '🔀',
    commit: '⚰️',
    projectFile: '📄',
    deployment: '🚀'
  };
  return icons[type] || '🔮';
};

/**
 * Delete QR data by ID
 * @param {string} id - QR data ID
 */
export const deleteQRData = (id) => {
  try {
    localStorage.removeItem(`qr_data_${id}`);
  } catch (error) {
    console.error('Error deleting QR data:', error);
  }
};

/**
 * Clear all QR data (for settings/cleanup)
 */
export const clearAllQRData = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('qr_data_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem('qr_recent_summons');
  } catch (error) {
    console.error('Error clearing all QR data:', error);
  }
};
