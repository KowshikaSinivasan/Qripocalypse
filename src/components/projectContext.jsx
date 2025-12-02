// ProjectContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  // Initialize with projects from localStorage or default
  const [projectsList, setProjectsList] = useState(() => {
    const savedProjects = localStorage.getItem('hauntedProjects');
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (error) {
        console.error('Error parsing saved projects:', error);
        return getDefaultProjects();
      }
    }
    return getDefaultProjects();
  });

  // Save projects to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('hauntedProjects', JSON.stringify(projectsList));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, [projectsList]);

  const value = {
    projectsList,
    setProjectsList
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// Helper function for default projects
function getDefaultProjects() {
  return [
    {
      id: 1,
      name: 'Ancient-Spells',
      description: 'Collection of dark magic incantations and rituals',
      type: 'JavaScript',
      lastUpdated: '2 hours ago',
      collaborators: 3,
      branches: 2,
      status: 'active',
      ghost: '🧙‍♀️',
      files: [
        { id: 1, name: 'README.md', content: '# Ancient Spells\n\nCollection of dark magic incantations and rituals.', type: 'file', language: 'markdown', path: 'README.md' },
        { id: 2, name: 'main.js', content: '// Welcome to Ancient Spells\nconsole.log("Summoning spirits...");\n\nfunction castSpell(spellName) {\n  return `🔮 ${spellName} has been cast!`;\n}\n\nexport default castSpell;', type: 'file', language: 'javascript', path: 'src/main.js' },
        { id: 3, name: 'spells.json', content: '{\n  "spells": [\n    "Wingardium Leviosa",\n    "Avada Kedavra",\n    "Expelliarmus",\n    "Lumos"\n  ]\n}', type: 'file', language: 'json', path: 'data/spells.json' }
      ]
    },
    {
      id: 2,
      name: 'Necro-API',
      description: 'REST API for communicating with the spirit world',
      type: 'Python',
      lastUpdated: '1 day ago',
      collaborators: 5,
      branches: 3,
      status: 'active',
      ghost: '👻',
      files: [
        { id: 4, name: 'app.py', content: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef hello():\n    return "Welcome to the Spirit World API!"\n\nif __name__ == "__main__":\n    app.run(debug=True)', type: 'file', language: 'python', path: 'app.py' },
        { id: 5, name: 'requirements.txt', content: 'flask==2.3.3\nrequests==2.31.0\npython-dotenv==1.0.0', type: 'file', language: 'text', path: 'requirements.txt' }
      ]
    },
    {
      id: 3,
      name: 'Haunted-UI',
      description: 'React components for possessed user interfaces',
      type: 'TypeScript',
      lastUpdated: '3 days ago',
      collaborators: 2,
      branches: 1,
      status: 'active',
      ghost: '🧛',
      files: [
        { id: 6, name: 'package.json', content: '{\n  "name": "haunted-ui",\n  "version": "1.0.0",\n  "main": "index.ts",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  }\n}', type: 'file', language: 'json', path: 'package.json' },
        { id: 7, name: 'GhostButton.tsx', content: 'import React from "react";\n\ninterface GhostButtonProps {\n  onClick: () => void;\n  children: React.ReactNode;\n}\n\nexport default function GhostButton({ onClick, children }: GhostButtonProps) {\n  return (\n    <button \n      onClick={onClick}\n      className="ghost-button"\n    >\n      👻 {children}\n    </button>\n  );\n}', type: 'file', language: 'typescript', path: 'src/components/GhostButton.tsx' }
      ]
    },
    {
      id: 4,
      name: 'Crypt-Keeper',
      description: 'Database management for ancient knowledge',
      type: 'Go',
      lastUpdated: '1 week ago',
      collaborators: 1,
      branches: 1,
      status: 'inactive',
      ghost: '💀',
      files: [
        { id: 8, name: 'main.go', content: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Crypt Keeper - Database Management System")\n    fmt.Println("Managing ancient knowledge...")\n}', type: 'file', language: 'go', path: 'main.go' }
      ]
    }
  ];
}