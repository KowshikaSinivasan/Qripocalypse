import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Folder, GitBranch, Users, Settings, Zap, Search, Trash2 } from 'lucide-react';
import WatchingGhost from './components/WatchingGhost';

const ProjectDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [projectsList, setProjectsList] = useState([
    {
      id: 1,
      name: 'Ancient-Spells',
      description: 'Collection of dark magic incantations and rituals',
      type: 'JavaScript',
      lastUpdated: '2 hours ago',
      collaborators: 3,
      branches: 2,
      status: 'active',
      ghost: '🧙‍♀️'
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
      ghost: '👻'
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
      ghost: '🧛'
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
      ghost: '💀'
    }
  ]);

  const filteredProjects = projectsList.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProject = (projectId) => {
    setProjectsList(projectsList.filter(p => p.id !== projectId));
    setDeleteConfirm(null);
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Watching Ghost */}
      <WatchingGhost />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-6xl font-bold mb-2" style={{ fontFamily: "'Creepster', cursive" }}>
              SPIRIT PROJECTS
            </h1>
            <p className="text-xl text-purple-400 italic" style={{ fontFamily: "'Eater', cursive" }}>
              Manage Your Haunted Code Repositories
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-blue-900 to-cyan-900 hover:from-blue-800 hover:to-cyan-800 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center gap-3 transform hover:scale-105 transition-all duration-300 border-2 border-blue-700"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              <Folder size={24} />
              UPLOAD PROJECT
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-900 to-green-900 hover:from-purple-800 hover:to-green-800 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center gap-3 transform hover:scale-105 transition-all duration-300 border-2 border-purple-700"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              <Plus size={24} />
              SUMMON PROJECT
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search through haunted projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/80 border-2 border-gray-700 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900/80 backdrop-blur-sm border-2 border-gray-700 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/30 group relative"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteConfirm(project);
                }}
                className="absolute top-4 right-4 bg-red-900/50 hover:bg-red-800 text-red-400 hover:text-white p-2 rounded-lg transition-all z-10"
                title="Delete Project"
              >
                <Trash2 size={18} />
              </button>

              <Link to={`/project/${project.id}/code`} className="block">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4 pr-8">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{project.ghost}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{project.collaborators}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch size={16} />
                      <span>{project.branches}</span>
                    </div>
                  </div>
                  <span>{project.lastUpdated}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😴</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
            <p className="text-gray-400 mb-6">The spirits are resting. Create a new project to awaken them.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Summon Your First Project
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <Link
            to="/templates"
            className="bg-gray-900/50 border-2 border-blue-700 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📁</div>
            <h3 className="text-white font-bold mb-2">Project Templates</h3>
            <p className="text-gray-400 text-sm">Start with haunted boilerplates</p>
          </Link>

          <Link
            to="/collaborators"
            className="bg-gray-900/50 border-2 border-green-700 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👥</div>
            <h3 className="text-white font-bold mb-2">Team Spirits</h3>
            <p className="text-gray-400 text-sm">Manage your haunted team</p>
          </Link>

          <Link
            to="/settings"
            className="bg-gray-900/50 border-2 border-yellow-700 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚙️</div>
            <h3 className="text-white font-bold mb-2">Ritual Settings</h3>
            <p className="text-gray-400 text-sm">Configure your dark workspace</p>
          </Link>

          <Link
            to="/docs"
            className="bg-gray-900/50 border-2 border-purple-700 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📚</div>
            <h3 className="text-white font-bold mb-2">Ancient Scrolls</h3>
            <p className="text-gray-400 text-sm">Learn the dark arts</p>
          </Link>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Upload Project Modal */}
      {showUploadModal && (
        <UploadProjectModal 
          onClose={() => setShowUploadModal(false)} 
          onUpload={(projectName) => {
            const newProject = {
              id: projectsList.length + 1,
              name: projectName,
              description: 'Uploaded project from archive',
              type: 'JavaScript',
              lastUpdated: 'Just now',
              collaborators: 1,
              branches: 1,
              status: 'active',
              ghost: '📦'
            };
            setProjectsList([...projectsList, newProject]);
            setShowUploadModal(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          project={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={() => handleDeleteProject(deleteConfirm.id)}
        />
      )}

      {/* Delete Success Message */}
      {showDeleteSuccess && (
        <div className="fixed bottom-8 right-8 bg-gray-900 border-2 border-red-700 rounded-xl p-6 z-50 animate-bounce">
          <div className="flex items-center gap-4">
            <div className="text-4xl">👻</div>
            <div>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "'Creepster', cursive" }}>
                PROJECT BANISHED!
              </p>
              <p className="text-gray-400 text-sm">The spirits have claimed it...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Create Project Modal Component
const CreateProjectModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'javascript',
    template: 'none',
    visibility: 'private'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle project creation
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-purple-700 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Creepster', cursive" }}>
            SUMMON NEW PROJECT
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-white font-bold mb-2">PROJECT NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ancient-rituals"
              className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-bold mb-2">ANCIENT DESCRIPTION</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the dark magic this project will perform..."
              rows="3"
              className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-white font-bold mb-2">SPIRIT LANGUAGE</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-600 focus:outline-none transition-colors"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="java">Java</option>
            </select>
          </div>

          {/* Template */}
          <div>
            <label className="block text-white font-bold mb-2">RITUAL TEMPLATE</label>
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-600 focus:outline-none transition-colors"
            >
              <option value="none">Empty Ritual</option>
              <option value="react">React Haunted App</option>
              <option value="node">Node.js Spirit API</option>
              <option value="python">Python Dark Magic</option>
              <option value="static">Static Ghost Site</option>
            </select>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-white font-bold mb-2">SPIRIT VISIBILITY</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === 'private'}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-gray-300">Private Coven</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === 'public'}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-gray-300">Public Haunting</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
            >
              CANCEL RITUAL
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-900 to-green-900 hover:from-purple-800 hover:to-green-800 text-white py-3 rounded-lg font-bold transition-colors"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              PERFORM SUMMONING
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Upload Project Modal Component
const UploadProjectModal = ({ onClose, onUpload }) => {
  const [projectName, setProjectName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.zip')) {
        setUploadedFile(file);
      } else {
        alert('Please upload a .zip file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.zip')) {
        setUploadedFile(file);
      } else {
        alert('Please upload a .zip file');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      alert('Project name is required!');
      return;
    }
    onUpload(projectName);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-blue-700 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Creepster', cursive" }}>
            UPLOAD PROJECT
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name - Required */}
          <div>
            <label className="block text-white font-bold mb-2">
              PROJECT NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-haunted-project"
              className="w-full bg-black/50 border-2 border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
              required
            />
            <p className="text-gray-400 text-sm mt-2">* Project name is required</p>
          </div>

          {/* Drag and Drop Upload Area */}
          <div>
            <label className="block text-white font-bold mb-2">UPLOAD PROJECT ZIP</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-gray-700 bg-black/30'
              }`}
            >
              <div className="text-6xl mb-4">📦</div>
              {uploadedFile ? (
                <div>
                  <p className="text-green-400 font-bold mb-2">File Selected:</p>
                  <p className="text-white">{uploadedFile.name}</p>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="mt-3 text-red-400 hover:text-red-300 text-sm underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-white font-bold mb-2">Drag & Drop your ZIP file here</p>
                  <p className="text-gray-400 mb-4">or</p>
                  <label className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold cursor-pointer inline-block transition-colors">
                    Browse Files
                    <input
                      type="file"
                      accept=".zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-4">Only .zip files are accepted</p>
                </div>
              )}
            </div>
            <p className="text-yellow-400 text-sm mt-3">
              ⚠️ Note: File upload is not connected to backend yet. Only project name will be saved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-900 to-cyan-900 hover:from-blue-800 hover:to-cyan-800 text-white py-3 rounded-lg font-bold transition-colors"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              SAVE PROJECT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ project, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-red-700 rounded-xl p-8 max-w-md w-full relative overflow-hidden">
        {/* Spooky background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20 animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Skull Icon */}
          <div className="text-center mb-6">
            <div className="text-7xl mb-4 animate-bounce">💀</div>
            <h2 className="text-3xl font-bold text-red-500 mb-2" style={{ fontFamily: "'Creepster', cursive" }}>
              BANISH PROJECT?
            </h2>
            <p className="text-gray-400 italic" style={{ fontFamily: "'Eater', cursive" }}>
              The spirits are watching...
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-black/50 border-2 border-red-800 rounded-lg p-4 mb-6">
            <p className="text-white text-center mb-2">
              Are you sure you want to banish
            </p>
            <p className="text-red-400 font-bold text-xl text-center" style={{ fontFamily: "'Creepster', cursive" }}>
              {project.name}
            </p>
            <p className="text-gray-400 text-center mt-2 text-sm">
              to the shadow realm? This action cannot be undone!
            </p>
          </div>

          {/* Spooky Warning */}
          <div className="flex items-center gap-2 mb-6 text-yellow-400 text-sm">
            <span className="text-2xl">⚠️</span>
            <p>Once banished, the project will be lost forever in the void...</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
            >
              SPARE IT
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white py-3 rounded-lg font-bold transition-colors"
              style={{ fontFamily: "'Creepster', cursive" }}
            >
              BANISH FOREVER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;