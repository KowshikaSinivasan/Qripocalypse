# QRipocalypse - Haunted Developer Platform 👻

A spooky-themed development platform featuring project management, code editing, and deployment capabilities with a haunted aesthetic.

## Features

- 🧛 **User Authentication** - Register and login with secure password hashing
- 👻 **Project Management** - Create, manage, and organize haunted projects
- 💀 **Code Editor** - In-browser code editor with file management
- 🔮 **Deployment System** - Multi-platform deployment with monitoring (in development)
- 🧟 **Haunted UI** - Dark theme with spooky animations and effects

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Storage**: LocalStorage (client-side persistence)
- **Styling**: CSS with custom haunted theme

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── projectContext.jsx    # Project state management
│   ├── ProjectSelector.jsx   # Project dropdown selector with persistence
│   ├── ghostpopup.jsx        # Ghost notification component
│   ├── WatchingGhost.jsx     # Animated ghost component
│   └── ...
├── models/             # Data models and type definitions
│   └── deploymentModels.jsx  # Deployment system data models
├── pages/              # Page components
│   ├── landing.jsx           # Landing page
│   ├── graveyard.jsx         # Project graveyard
│   ├── necrodiff.jsx         # Diff viewer
│   └── ...
├── services/           # Business logic and API services
│   ├── authService.jsx       # Authentication logic
│   └── storageService.jsx    # LocalStorage operations
├── utils/              # Utility functions
│   ├── deploymentUtils.jsx   # Deployment helpers
│   ├── simulationUtils.jsx   # Simulation logic
│   ├── storageHelpers.jsx    # localStorage helpers for deployment configs
│   └── ...
├── styles/             # Global styles
│   └── haunted.css           # Haunted theme styles
├── App.jsx             # Main app component
├── dashboard.jsx       # Project dashboard
├── codeeditor.jsx      # In-browser code editor
└── main.jsx            # App entry point
```

## Key Components

### ProjectSelector Component

A reusable dropdown component for selecting projects with localStorage persistence (`src/components/ProjectSelector.jsx`):

**Features:**

- Displays all available projects from ProjectContext
- Persists selected project across page refreshes
- Shows project details (name, description, type, status)
- Haunted theme styling with ghost emoji indicators
- Callback-based architecture for parent component integration

**Usage:**

```javascript
import ProjectSelector from "./components/ProjectSelector";

function MyComponent() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <ProjectSelector
      selectedProject={selectedProject}
      onProjectChange={setSelectedProject}
    />
  );
}
```

**Integration:** The ProjectSelector component is now integrated into the ProjectSettings page, enabling users to select which project they want to configure for deployment. The selected project persists across page refreshes using localStorage.

### Storage Helpers

Utility functions for managing deployment configurations and project data (`src/utils/storageHelpers.jsx`):

**Core Functions:**

- `saveSelectedProject(projectId)` - Persist selected project ID
- `loadSelectedProject()` - Retrieve saved project ID
- `saveConfigurations(projectId, configs)` - Save deployment configs per project
- `loadConfigurations(projectId)` - Load deployment configs
- `saveDeployments(projectId, deployments)` - Save deployment history (max 50 per project)
- `loadDeployments(projectId)` - Load deployment history with Date object conversion
- `addDeployment(projectId, deployment)` - Add new deployment to history
- `saveMetrics(projectId, metrics)` - Save monitoring metrics
- `loadMetrics(projectId)` - Load monitoring metrics with Date object conversion
- `saveAlerts(projectId, alerts)` - Save system alerts
- `loadAlerts(projectId)` - Load system alerts with Date object conversion

**Utility Functions:**

- `clearProjectData(projectId)` - Remove all data for a specific project
- `getStorageInfo()` - Get localStorage usage statistics

**Features:**

- Automatic quota management with fallback strategies
- Safe JSON parsing with error handling
- Date object serialization/deserialization
- Storage availability detection
- Automatic cleanup of old deployments when quota exceeded

### Simulation Utilities

Realistic simulation functions for DevOps operations (`src/utils/simulationUtils.jsx`):

**Simulation Functions:**

- `simulateDockerBuild(config, onLog)` - Simulates Docker build with realistic logs (3-5 seconds)
- `simulateCloudDeployment(platform, config, onLog)` - Simulates cloud deployment with platform-specific logs (5-8 seconds, 10% failure rate)
- `simulateDataDogMetrics(config, onLog)` - Simulates DataDog metrics fetching with enhanced logs
- `generateMetrics()` - Generates realistic monitoring metrics (CPU, memory, requests, errors, uptime)
- `generateDeploymentHistory(projectId, projectName, count)` - Creates initial deployment history for new projects
- `generateAlerts(count)` - Generates random system alerts with severity levels

**Features:**

- Realistic timing with random variations (±20%)
- Platform-specific deployment logs (GCP, AWS, Vercel, Render)
- Simulated failures for testing (10% failure rate)
- Commit hash generation
- Deployment URL generation per platform
- Log level filtering (DEBUG, INFO, WARN, ERROR)
- Metrics within realistic ranges (CPU: 15-85%, Memory: 30-75%, etc.)

### Deployment Models

Comprehensive data models for the Enhanced Project Deployment system (`src/models/deploymentModels.jsx`):

**Data Models:**

- **DockerConfig** - Docker image configuration and build settings
- **KubernetesConfig** - Kubernetes cluster and scaling configuration
- **GCPConfig** - Google Cloud Platform deployment settings
- **AWSConfig** - Amazon Web Services deployment settings
- **VercelConfig** - Vercel deployment configuration
- **RenderConfig** - Render.com deployment settings
- **DataDogConfig** - DataDog monitoring configuration
- **Deployment** - Deployment history and status tracking
- **MonitoringMetrics** - Application performance metrics
- **Alert** - System alerts and notifications

**Default Configurations:**

```javascript
import {
  defaultDockerConfig,
  defaultKubernetesConfig,
  defaultGCPConfig,
} from "./models/deploymentModels";

// Initialize deployment configuration
const config = {
  docker: { ...defaultDockerConfig, imageName: "my-haunted-app" },
  kubernetes: { ...defaultKubernetesConfig, replicas: 5 },
  gcp: { ...defaultGCPConfig, projectId: "my-gcp-project" },
};
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Authentication

The app uses client-side authentication with:

- Password hashing via Web Crypto API (PBKDF2)
- JWT-like session tokens
- LocalStorage persistence

## Project Context & State Management

Projects are managed through React Context (`ProjectProvider`) and persisted to LocalStorage. All project data, including files and configurations, are stored client-side.

**ProjectContext Features:**

- Centralized project state management
- Automatic localStorage synchronization
- Shared across all components via `useProjects()` hook
- Supports project CRUD operations
- Maintains project files, collaborators, and metadata

**Usage:**

```javascript
import { useProjects } from "./components/projectContext";

function MyComponent() {
  const { projectsList, setProjectsList } = useProjects();

  // Access all projects
  const projects = projectsList;

  // Update projects
  setProjectsList([...projectsList, newProject]);
}
```

## Recent Updates

### Docker Ritual Tab Implementation (Latest)

The Docker Ritual tab has been fully implemented with complete Docker image build and management capabilities:

**Features:**

- **Build Docker Image** - Simulates complete Docker build process with realistic logs including base image pull, dependency installation, application build, and image tagging
- **Download Image** - Simulates pulling Docker images from registry with layer-by-layer progress
- **Push to Registry** - Simulates pushing images to configured registry with authentication and layer upload progress
- **Configuration Management** - Form inputs for image name, Dockerfile path, registry URL, tag, and build arguments with auto-save
- **Validation & Error Handling** - Disables actions when required fields are missing, shows helpful error messages
- **Loading States** - Visual feedback with spinners during operations
- **Real-time Logs** - Terminal-style log display with color-coded output showing build progress

**Implementation Details:**

- Uses `simulateDockerBuild` from `simulationUtils.jsx` for realistic 3-5 second build simulation
- Implements `handleDockerConfigChange` callback for efficient configuration updates
- Integrates with project-specific state management for configuration persistence
- Updates docker tag automatically after successful build
- All operations check for selected project before executing

### ProjectSettings State Management

The ProjectSettings component has been significantly enhanced with comprehensive state management:

**New Capabilities:**

- **Full Configuration Persistence** - All deployment configurations (Docker, Kubernetes, GCP, AWS, Vercel, Render, DataDog) are now saved per-project with auto-save
- **Deployment History Tracking** - Automatically generates and persists deployment history with up to 50 deployments per project
- **Metrics & Alerts** - Real-time metrics and alert tracking with localStorage persistence
- **Project-Specific Data Loading** - When switching projects, all configurations, deployments, metrics, and alerts are automatically loaded
- **Auto-Initialization** - New projects automatically receive initial deployment history, metrics, and alerts on first load
- **Debounced Auto-Save** - Configuration changes are automatically saved after 500ms of inactivity to reduce localStorage writes

**Implementation Details:**

The component now uses multiple `useEffect` hooks to:

1. Load selected project from localStorage on mount
2. Load/initialize project-specific data when project changes
3. Auto-save configurations with debounce
4. Persist deployments, metrics, and alerts when they change

This update completes Tasks 1-3 of the Enhanced Project Deployment specification.

## Current Features

### ProjectSettings Component

The ProjectSettings component (`src/projectsettings.jsx`) provides a comprehensive DevOps configuration interface with full project-specific state management and persistence:

**Tabs:**

- **Docker Ritual** - Docker image configuration and build simulation
- **Cloud Platforms** - Multi-platform deployment (GCP, AWS, Vercel, Render) with Kubernetes configuration
- **DataDog Spirits** - DataDog monitoring configuration and metrics simulation
- **Deployment Panel** - Deployment history tracking with statistics and timeline
- **Monitoring Panel** - Real-time application metrics, alerts, and health monitoring

**Features:**

- **Project Selection** - Integrated ProjectSelector component allows users to choose which project to configure
- **Persistent Configuration** - All deployment configurations are saved per-project to localStorage with auto-save (500ms debounce)
- **Deployment History** - Tracks up to 50 deployments per project with timestamps, status, and logs
- **Metrics Tracking** - Monitors CPU, memory, request rate, error rate, response time, and uptime
- **Alert Management** - Tracks and displays system alerts with severity levels
- **Context Integration** - Uses ProjectContext to access all available projects
- **Simulated Operations** - Provides realistic DevOps simulations without actual external connections
- **Data Initialization** - Automatically generates initial deployment history, metrics, and alerts for new projects

**State Management:**

The component now implements comprehensive state management with:

- Configuration state for all platforms (Docker, Kubernetes, GCP, AWS, Vercel, Render, DataDog)
- Deployment history with automatic persistence
- Real-time metrics with localStorage caching
- Alert tracking with resolution status
- Separate logs for Docker, deployment, and DataDog operations
- Simulation state tracking (building, deploying, fetching metrics)

**Current Status:** The component is fully integrated with the Enhanced Project Deployment system. All configurations, deployments, metrics, and alerts are persisted per-project and automatically loaded when switching between projects.

**Docker Ritual Tab (Completed):**

The Docker Ritual tab provides a complete Docker image build and management interface with:

- **Configuration Form** - Input fields for image name, Dockerfile path, registry URL, tag, and build arguments
- **Build Actions** - Three primary operations:
  - Build Docker Image - Simulates Docker build with realistic logs (3-5 seconds)
  - Download Image - Simulates pulling image layers from registry
  - Push to Registry - Simulates pushing image to configured registry with authentication
- **Real-time Build Logs** - Terminal-style log display showing build progress and status
- **Validation** - Disables actions when required fields are missing with helpful error messages
- **Loading States** - Visual feedback during build operations with spinner animations
- **Auto-save** - Configuration changes are automatically saved with 500ms debounce
- **Integration** - Uses `simulateDockerBuild` from `simulationUtils.jsx` for realistic build simulation

All Docker operations are fully simulated without requiring actual Docker installation, making it perfect for development and testing.

## Development Roadmap

See `.kiro/specs/enhanced-project-deployment/` for detailed specifications on the deployment system:

- `requirements.md` - Feature requirements and acceptance criteria
- `design.md` - System architecture and component design
- `tasks.md` - Implementation tasks and progress

**Completed (Tasks 1-4):**

- ✅ Data models and simulation utilities
- ✅ ProjectSelector component with persistence
- ✅ Main ProjectSettings component structure with full state management
- ✅ Project-specific configuration loading and saving
- ✅ Deployment history generation and tracking
- ✅ Metrics and alerts initialization
- ✅ Auto-save with debounce for configurations
- ✅ Docker Ritual tab with build, download, and push operations
- ✅ Real-time build logs with terminal-style display
- ✅ Docker configuration form with validation

**In Progress:**

- Cloud Platforms tab with multi-platform support (Task 5)
- DataDog Spirits tab with enhanced logging (Task 6)
- Deployment Panel with history visualization (Task 7)
- Monitoring Panel with real-time metrics (Task 8)

**Upcoming:**

- Property-based testing for configuration persistence
- Integration testing for all simulation flows
- UI polish and smooth transitions
- Toast notifications for operations

## Vite Configuration

This project uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) with Babel for Fast Refresh.

## License

MIT
