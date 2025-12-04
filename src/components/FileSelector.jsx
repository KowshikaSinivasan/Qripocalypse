import React, { useState } from 'react';
import { useProjects } from './projectContext';

const FileSelector = ({ isOpen, onClose, onSelectFile, title = "Select a File from the Spirit Realm" }) => {
  const { projectsList } = useProjects();
  const [expandedProjects, setExpandedProjects] = useState({});

  if (!isOpen) return null;

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleFileSelect = (file, project) => {
    const fileData = {
      ...file,
      projectName: project.name,
      projectId: project.id
    };
    onSelectFile(fileData);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border-2 border-purple-700 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
          aria-label="Close"
        >
          ×
        </button>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-6 haunted-text">
          {title}
        </h2>
        
        {/* Projects and files list */}
        <div className="overflow-y-auto haunted-scrollbar flex-1">
          {projectsList.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-4">👻</div>
              <p className="haunted-text">No projects found in the spirit realm...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projectsList.map(project => (
                <div key={project.id} className="border border-gray-700 rounded-lg overflow-hidden">
                  {/* Project header */}
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-750 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{project.ghost}</span>
                      <div className="text-left">
                        <div className="text-white font-semibold">{project.name}</div>
                        <div className="text-gray-400 text-sm">
                          {project.files?.length || 0} files • {project.type}
                        </div>
                      </div>
                    </div>
                    <span className="text-purple-400 text-xl">
                      {expandedProjects[project.id] ? '▼' : '▶'}
                    </span>
                  </button>
                  
                  {/* Files list */}
                  {expandedProjects[project.id] && (
                    <div className="bg-gray-850">
                      {project.files && project.files.length > 0 ? (
                        <div className="divide-y divide-gray-700">
                          {project.files.map(file => (
                            <button
                              key={file.id}
                              onClick={() => handleFileSelect(file, project)}
                              className="w-full px-6 py-3 text-left hover:bg-purple-900/30 transition-colors flex items-center gap-3 group"
                            >
                              <span className="text-purple-400 group-hover:text-purple-300">📄</span>
                              <div className="flex-1">
                                <div className="text-white group-hover:text-purple-200">{file.name}</div>
                                <div className="text-gray-500 text-xs">{file.path}</div>
                              </div>
                              <span className="text-gray-600 text-xs">{file.language}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-6 py-4 text-gray-500 text-center">
                          This project's files have vanished...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSelector;
