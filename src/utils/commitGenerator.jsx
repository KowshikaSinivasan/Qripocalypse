/**
 * Commit Generator Utility
 * Generates simulated commit data for projects
 */

// Spooky author names pool
const SPOOKY_AUTHORS = [
  'Vlad the Coder',
  'Morticia Merge',
  'Count Commitula',
  'Frankenstein Dev',
  'Zombie Zack',
  'Phantom Phil',
  'Banshee Betty',
  'Reaper Rick',
  'Ghoul Gary',
  'Witch Wendy',
  'Skeleton Sam',
  'Vampire Victor'
];

// Commit message templates based on file types
const COMMIT_MESSAGES = [
  'Fix haunting bug in {file}',
  'Add spectral feature to {file}',
  'Refactor cursed code in {file}',
  'Update ancient documentation',
  'Optimize spirit summoning algorithm',
  'Remove deprecated necromancy functions',
  'Implement dark magic validation',
  'Fix memory leak in ghost renderer',
  'Add unit tests for spell casting',
  'Merge branch from the underworld',
  'Improve performance of ritual execution',
  'Update dependencies from the crypt',
  'Fix typo in incantation',
  'Add error handling for failed summons',
  'Refactor component hierarchy',
  'Update API endpoints for spirit communication',
  'Fix CSS styling for tombstones',
  'Add new haunted characters',
  'Implement search functionality',
  'Fix broken links in documentation'
];

// Haunted characters based on change magnitude
const HAUNTED_CHARACTERS = {
  small: ['👻', '🕷️', '🦇'],      // 1-10 changes
  medium: ['🧛', '🧟', '🧙‍♀️'],    // 11-50 changes
  large: ['💀', '☠️', '👹']       // 51+ changes
};

// Spooky epitaphs
const EPITAPHS = [
  'Here lies code that once was alive',
  'May this commit rest in peace',
  'Gone but not forgotten',
  'Forever haunting the codebase',
  'Buried in the git history',
  'A ghostly contribution',
  'Eternally merged',
  'Committed to the void',
  'Lost in the spirit realm',
  'Haunting the repository'
];

/**
 * Generate a random hex hash (8 characters)
 */
function generateHash() {
  return Math.random().toString(16).substring(2, 10);
}

/**
 * Generate a random date within the last 30 days
 */
function generateDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

/**
 * Generate random additions and deletions
 */
function generateChanges() {
  const additions = Math.floor(Math.random() * 100) + 1;
  const deletions = Math.floor(Math.random() * 50);
  return {
    additions,
    deletions,
    total: additions + deletions,
    formatted: `+${additions} -${deletions}`
  };
}

/**
 * Get haunted character based on change magnitude
 */
function getHauntedCharacter(totalChanges) {
  if (totalChanges <= 10) {
    const chars = HAUNTED_CHARACTERS.small;
    return chars[Math.floor(Math.random() * chars.length)];
  } else if (totalChanges <= 50) {
    const chars = HAUNTED_CHARACTERS.medium;
    return chars[Math.floor(Math.random() * chars.length)];
  } else {
    const chars = HAUNTED_CHARACTERS.large;
    return chars[Math.floor(Math.random() * chars.length)];
  }
}

/**
 * Generate a commit message
 */
function generateCommitMessage(project) {
  const message = COMMIT_MESSAGES[Math.floor(Math.random() * COMMIT_MESSAGES.length)];
  
  // If message contains {file}, replace with a random file from the project
  if (message.includes('{file}') && project.files && project.files.length > 0) {
    const randomFile = project.files[Math.floor(Math.random() * project.files.length)];
    return message.replace('{file}', randomFile.name);
  }
  
  return message;
}

/**
 * Generate commits for all projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of commit objects
 */
export function generateCommitsForProjects(projects) {
  if (!projects || !Array.isArray(projects)) {
    console.warn('Invalid projects array provided to generateCommitsForProjects');
    return [];
  }

  const allCommits = [];
  const hashPool = [];

  // First pass: generate commits for each project
  projects.forEach(project => {
    const commitCount = Math.floor(Math.random() * 4) + 2; // 2-5 commits per project

    for (let i = 0; i < commitCount; i++) {
      const changes = generateChanges();
      const hash = generateHash();
      
      // Store hash for duplicate detection
      hashPool.push(hash);

      const commit = {
        hash,
        message: generateCommitMessage(project),
        author: SPOOKY_AUTHORS[Math.floor(Math.random() * SPOOKY_AUTHORS.length)],
        date: generateDate(),
        changes: changes.formatted,
        ghost: getHauntedCharacter(changes.total),
        epitaph: EPITAPHS[Math.floor(Math.random() * EPITAPHS.length)],
        projectId: project.id,
        projectName: project.name,
        isDuplicate: false
      };

      allCommits.push(commit);
    }
  });

  // Second pass: introduce duplicates (10% chance)
  // We'll randomly select some commits and duplicate their hashes
  const duplicateCount = Math.floor(allCommits.length * 0.1);
  
  for (let i = 0; i < duplicateCount; i++) {
    if (allCommits.length < 2) break;
    
    // Pick two random commits and give them the same hash
    const idx1 = Math.floor(Math.random() * allCommits.length);
    let idx2 = Math.floor(Math.random() * allCommits.length);
    
    // Ensure they're different commits from different projects
    while (idx2 === idx1 || allCommits[idx1].projectId === allCommits[idx2].projectId) {
      idx2 = Math.floor(Math.random() * allCommits.length);
      // Prevent infinite loop if we can't find different projects
      if (allCommits.length < 2) break;
    }
    
    // Make them share the same hash
    allCommits[idx2].hash = allCommits[idx1].hash;
  }

  // Third pass: mark duplicates
  const hashCounts = {};
  allCommits.forEach(commit => {
    hashCounts[commit.hash] = (hashCounts[commit.hash] || 0) + 1;
  });

  allCommits.forEach(commit => {
    if (hashCounts[commit.hash] > 1) {
      commit.isDuplicate = true;
    }
  });

  // Sort by date (newest first)
  allCommits.sort((a, b) => new Date(b.date) - new Date(a.date));

  return allCommits;
}

/**
 * Generate commits for a single project
 * @param {Object} project - Project object
 * @returns {Array} Array of commit objects for that project
 */
export function generateCommitsForProject(project) {
  if (!project) {
    console.warn('Invalid project provided to generateCommitsForProject');
    return [];
  }

  const allCommits = generateCommitsForProjects([project]);
  return allCommits.filter(commit => commit.projectId === project.id);
}
