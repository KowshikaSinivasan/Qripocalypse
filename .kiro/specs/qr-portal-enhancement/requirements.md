# Requirements Document

## Introduction

This specification defines enhancements to the QRipocalypse QR Portal and related pages (Characters, Themes, Alerts) to provide a comprehensive QR code generation and scanning system. The system will allow users to generate QR codes for various project-related entities (themes, diffs, commits, project files, deployment info) and scan QR codes to retrieve and display stored information. The enhancements include project integration, localStorage persistence, premium feature gating, and dynamic alert generation based on user projects.

## Glossary

- **QR Portal**: The main interface for generating and scanning QR codes within QRipocalypse
- **Summon Type**: A category of QR code content (theme, diff, commit, project file, deployment)
- **QR Data**: Information encoded in a QR code and stored in localStorage with a unique ID
- **Premium Feature**: A locked feature requiring payment to unlock (simulated with spooky dialog)
- **Persona**: A haunted character that can be selected as an active assistant
- **Alert**: A code quality warning or issue detected in user projects
- **Project Context**: The global state management system for user projects
- **localStorage**: Browser-based persistent storage for QR data and configurations

## Requirements

### Requirement 1

**User Story:** As a user, I want to generate QR codes for different types of project data, so that I can share or access project information through QR scanning.

#### Acceptance Criteria

1. WHEN a user selects a summon type (theme, diff, commit, project file, or deployment), THE QR Portal SHALL display appropriate input fields for that type
2. WHEN a user provides valid data for a summon type, THE QR Portal SHALL generate a unique ID and store the data in localStorage
3. WHEN QR data is stored, THE QR Portal SHALL generate a scannable QR code containing the unique ID
4. WHEN a user generates a QR code, THE QR Portal SHALL add the entry to the recent summons history
5. WHERE a summon type requires project selection, THE QR Portal SHALL display a project dropdown populated from ProjectContext

### Requirement 2

**User Story:** As a user, I want to scan QR codes and view the associated information, so that I can retrieve project data encoded in QR codes.

#### Acceptance Criteria

1. WHEN a user scans a QR code containing a valid ID, THE QR Portal SHALL retrieve the associated data from localStorage
2. WHEN QR data is retrieved, THE QR Portal SHALL display the information in a formatted view based on the summon type
3. IF a scanned QR code contains an invalid or non-existent ID, THEN THE QR Portal SHALL display an error message
4. WHEN displaying retrieved data, THE QR Portal SHALL show all relevant fields including project name, file paths, and content
5. WHEN a QR code is successfully scanned, THE QR Portal SHALL update the recent summons history

### Requirement 3

**User Story:** As a user, I want to select an active persona from the Characters page, so that I can customize my experience with different haunted assistants.

#### Acceptance Criteria

1. WHEN a user visits the Characters page, THE system SHALL display a dropdown to select an active persona
2. WHEN a user selects a persona, THE system SHALL store the selection in localStorage
3. WHEN the page loads, THE system SHALL restore the previously selected persona from localStorage
4. WHEN a user clicks "Learn Summoning Spells", THE system SHALL display a spooky premium dialog
5. THE system SHALL NOT include a "Go to QR Portal" button on the Characters page

### Requirement 4

**User Story:** As a user, I want to generate QR codes for themes with visual previews, so that I can share theme configurations.

#### Acceptance Criteria

1. WHEN a user visits the Themes page, THE system SHALL display the active theme's icon in the QR code preview area
2. WHEN a user clicks "Generate New QR", THE system SHALL display a spooky premium dialog
3. WHEN the active theme changes, THE system SHALL update the QR code preview area with the new theme's icon
4. THE system SHALL display animated theme icons (Dracula for dracula theme, flickering ghost for possession theme)
5. THE QR code preview area SHALL replace the placeholder "QR Code" text with the theme icon

### Requirement 5

**User Story:** As a user, I want to see alerts related to my actual projects, so that I can identify issues in my code.

#### Acceptance Criteria

1. WHEN a user visits the Alerts page, THE system SHALL load projects from ProjectContext
2. WHEN projects are loaded, THE system SHALL generate alerts based on actual project files and content
3. WHEN displaying alerts, THE system SHALL show the project name and file path
4. WHEN no projects exist, THE system SHALL display a message indicating no projects are available
5. THE system SHALL generate at least 5 different types of alerts based on project analysis

### Requirement 6

**User Story:** As a user, I want QR data to persist across sessions, so that I can scan previously generated QR codes at any time.

#### Acceptance Criteria

1. WHEN QR data is generated, THE system SHALL store it in localStorage with a unique ID
2. WHEN the application loads, THE system SHALL be able to retrieve QR data by ID from localStorage
3. WHEN localStorage quota is exceeded, THE system SHALL handle the error gracefully and notify the user
4. THE system SHALL store QR data with the following structure: id, type, timestamp, projectId, and type-specific data
5. WHEN a user clears browser data, THE system SHALL handle missing QR data gracefully

### Requirement 7

**User Story:** As a user, I want to generate QR codes for project files, so that I can share specific files from my projects.

#### Acceptance Criteria

1. WHEN a user selects "project file" summon type, THE QR Portal SHALL display a project selector
2. WHEN a project is selected, THE QR Portal SHALL display a file selector for that project
3. WHEN a file is selected, THE QR Portal SHALL include the file content, path, and project name in the QR data
4. WHEN scanning a project file QR code, THE system SHALL display the file content with syntax highlighting
5. THE system SHALL support all file types present in the selected project

### Requirement 8

**User Story:** As a user, I want to generate QR codes for deployment information, so that I can share deployment configurations and status.

#### Acceptance Criteria

1. WHEN a user selects "deployment" summon type, THE QR Portal SHALL display a project selector
2. WHEN a project is selected, THE QR Portal SHALL retrieve deployment configurations from localStorage
3. WHEN deployment data exists, THE QR Portal SHALL encode platform, status, and configuration in the QR code
4. WHEN scanning a deployment QR code, THE system SHALL display deployment details including platform and status
5. IF no deployment data exists for a project, THEN THE system SHALL display an appropriate message

### Requirement 9

**User Story:** As a user, I want premium features to be clearly marked and gated, so that I understand which features require payment.

#### Acceptance Criteria

1. WHEN a user clicks a premium feature button, THE system SHALL display a modal dialog with spooky theming
2. WHEN the premium dialog is displayed, THE system SHALL show a "Pay to Unlock" message with haunted styling
3. WHEN a user closes the premium dialog, THE system SHALL return to the previous state without unlocking the feature
4. THE premium dialog SHALL include appropriate ghost/haunted emojis and Creepster font
5. THE premium dialog SHALL have a close button and backdrop click to dismiss

### Requirement 10

**User Story:** As a user, I want to see recent QR code generations in history, so that I can track and re-access previously generated codes.

#### Acceptance Criteria

1. WHEN a QR code is generated, THE system SHALL add an entry to the recent summons list
2. WHEN displaying recent summons, THE system SHALL show the type, name, and timestamp
3. WHEN a user clicks "RESUMMON" on a history item, THE system SHALL regenerate the QR code with the same data
4. THE system SHALL store recent summons in localStorage
5. THE system SHALL limit recent summons to the last 20 entries per user
