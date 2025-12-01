export const generateSpiritCommentary = (changeType, codeContent) => {
  const commentaries = {
    deletion: [
      "This code has been... eliminated.",
      "The spirits claim another victim.",
      "Gone, but not forgotten."
    ],
    addition: [
      "New life emerges from the void!",
      "The code gods have spoken!",
      "A fresh soul joins our digital realm."
    ],
    modified: [
      "Transformed by dark magic!",
      "The code has evolved... dangerously.",
      "A metamorphosis occurs!"
    ]
  };

  const options = commentaries[changeType] || ["The spirits are watching..."];
  return options[Math.floor(Math.random() * options.length)];
};

export const detectCursedPatterns = (code) => {
  const patterns = [
    { pattern: /while\(true\)/, curse: 'Infinite Loop Curse', severity: 'high' },
    { pattern: /eval\(/, curse: 'Dark Magic Evaluation', severity: 'high' },
    { pattern: /var\s+(\w+)/, curse: 'Ancient Variable Declaration', severity: 'medium' },
    { pattern: /console\.log/, curse: 'Mortal Debugging', severity: 'low' }
  ];

  return patterns.filter(p => p.pattern.test(code));
};