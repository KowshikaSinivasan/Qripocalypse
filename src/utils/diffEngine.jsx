export const generateHauntedDiff = (oldCode, newCode) => {
  // Simplified diff logic - in reality you'd use a proper diff algorithm
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  
  const changes = [];
  const maxLines = Math.max(oldLines.length, newLines.length);

  for (let i = 0; i < maxLines; i++) {
    const oldLine = oldLines[i] || null;
    const newLine = newLines[i] || null;

    if (oldLine === newLine) {
      changes.push({ type: 'unchanged', line: i + 1, content: oldLine });
    } else if (oldLine && !newLine) {
      changes.push({ type: 'deletion', line: i + 1, content: oldLine });
    } else if (!oldLine && newLine) {
      changes.push({ type: 'addition', line: i + 1, content: newLine });
    } else {
      changes.push({ 
        type: 'modified', 
        line: i + 1, 
        oldContent: oldLine, 
        newContent: newLine 
      });
    }
  }

  return changes;
};

export const getCharacterForChange = (changeType) => {
  const characters = {
    'deletion': { name: 'Dracula', icon: '🧛', message: 'This line... drained of life.' },
    'addition': { name: 'Frankenstein', icon: '🧟', message: 'New life has been created!' },
    'modified': { name: 'Witch', icon: '🧙‍♀️', message: 'This code has been transformed...' },
    'unchanged': { name: 'Ghost', icon: '👻', message: 'I remember this from before...' }
  };
  
  return characters[changeType] || characters.unchanged;
};