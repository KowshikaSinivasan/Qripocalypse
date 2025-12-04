# Design Document

## Overview

The QR Portal Enhancement feature extends the existing QRipocalypse QR generation and scanning system to support multiple summon types (themes, diffs, commits, project files, deployments) with full localStorage persistence. The system integrates with the existing ProjectContext to access user projects and files, provides premium feature gating with spooky dialogs, and generates dynamic alerts based on actual project content.

The enhancement maintains the existing haunted aesthetic while adding robust data management, project integration, and user experience improvements across four pages: QR Portal, Characters, Themes, and Alerts.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface Layer                    │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  QR Portal   │  Characters  │   Themes     │    Alerts      │
│   Page       │    Page      │    Page      │     Page       │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────┘
       │              │              │                │
       ├──────────────┴──────────────┴────────────────┤
       │         Component Layer                      │
       │  - QRGenerator (enhanced)                    │
       │  - QRScanner (enhanced)                      │
       │  - ProjectSelector                           │
       │  - FileSelector                              │
       │  - PremiumDialog (new)                       │
       │  - PersonaSelector (new)                     │
       └──────────────┬───────────────────────────────┘
                      │
       ┌──────────────┴───────────────────────────────┐
       │         Service/Utility Layer                │
       │  - qrStorageService (new)                    │
       │  - alertGenerator (new)                      │
       │  - storageHelpers (existing)                 │
       │  - ProjectContext (existing)                 │
       └──────────────┬───────────────────────────────┘
                      │
       ┌──────────────┴───────────────────────────────┐
       │         Data Persistence Layer               │
       │  - localStorage (QR Data)                    │
       │  - localStorage (Recent Summons)             │
       │  - localStorage (Persona Selection)          │
       │  - localStorage (Deployment Configs)         │
       └──────────────────────────────────────────────┘
```

### Data Flow

1. **QR Generation Flow**:

   - User selects summon type → Component displays appropriate inputs
   - User provides data → System generates unique ID
   - System stores data in localStorage → Generates QR code with ID
   - QR code displayed → User can download/share

2. **QR Scanning Flow**:

   - User scans QR code → System extracts ID
   - System retrieves data from localStorage → Validates data exists
   - System formats data by type → Displays to user

3. **Project Integration Flow**:
   - Component requests projects → ProjectContext provides list
   - User selects project → Component loads project files
   - User selects file/deployment → Data included in QR generation

## Components and Interfaces

### 1. Enhanced QRGenerator Component

**Location**: `src/components/QRGenerator.jsx`

**Props**:

```javascript
{
  // No props - self-contained component
}
```

**State**:

```javascript
{
  qrType: string,              // 'theme' | 'diff' | 'commit' | 'projectFile' | 'deployment'
  selectedProject: object,     // From ProjectContext
  selectedFile: object,        // From FileSelector
  qrContent: object,           // Type-specific content
  generatedQR: object,         // { id, qrCode, timestamp }
  recentSummons: array         // History of generated QRs
}
```

**Methods**:

- `generateQR()` - Creates QR with unique ID and stores data
- `selectSummonType(type)` - Changes active summon type
- `selectProject(project)` - Sets selected project for file/deployment QRs
- `selectFile(file)` - Sets selected file for project file QRs
- `saveToLocalStorage(data)` - Persists QR data
- `addToHistory(qr)` - Adds to recent summons

### 2. Enhanced QRScanner Component

**Location**: `src/qscan.jsx`

**Props**:

```javascript
{
  scanning: boolean,
  onScanResult: (id) => void,
  onStartScan: () => void,
  onStopScan: () => void
}
```

**State**:

```javascript
{
  scannedData: object,         // Retrieved QR data
  displayMode: string,         // How to display the data
  error: string                // Error message if any
}
```

**Methods**:

- `handleScan(id)` - Retrieves and displays QR data
- `retrieveFromLocalStorage(id)` - Gets data by ID
- `formatDisplay(data)` - Formats data based on type
- `handleError(error)` - Displays error messages

### 3. PremiumDialog Component (New)

**Location**: `src/components/PremiumDialog.jsx`

**Props**:

```javascript
{
  isOpen: boolean,
  onClose: () => void,
  featureName: string
}
```

**UI Elements**:

- Spooky modal backdrop with dark overlay
- Animated ghost/skull icons
- "Pay to Unlock" message in Creepster font
- Close button and backdrop click handler
- Haunted border effects

### 4. PersonaSelector Component (New)

**Location**: `src/components/PersonaSelector.jsx`

**Props**:

```javascript
{
  characters: array,
  selectedPersona: string,
  onSelect: (persona) => void
}
```

**State**:

```javascript
{
  activePersona: string; // Currently selected persona
}
```

**Methods**:

- `selectPersona(persona)` - Sets active persona
- `saveToLocalStorage(persona)` - Persists selection
- `loadFromLocalStorage()` - Restores selection

### 5. AlertGenerator Utility (New)

**Location**: `src/utils/alertGenerator.jsx`

**Functions**:

```javascript
generateAlertsForProjects(projects) => Alert[]
analyzeFile(file, project) => Alert[]
detectCursedPatterns(content) => Pattern[]
getSeverityLevel(pattern) => 'high' | 'medium' | 'low'
```

**Alert Types**:

- Cursed loops (infinite loops, missing breaks)
- Dead variables (unused declarations)
- Suspicious logic (complex conditionals, magic numbers)
- Missing error handling
- Deprecated patterns
- Security vulnerabilities

### 6. QRStorageService (New)

**Location**: `src/services/qrStorageService.jsx`

**Functions**:

```javascript
generateUniqueId() => string
saveQRData(type, data) => { id, timestamp }
retrieveQRData(id) => object | null
getRecentSummons(limit) => array
addToRecentSummons(qr) => void
clearOldSummons() => void
```

**Storage Keys**:

- `qr_data_{id}` - Individual QR data entries
- `qr_recent_summons` - Array of recent QR generations
- `qr_persona_selection` - Active persona
- `qr_premium_unlocked` - Premium features status

## Data Models

### QR Data Model

```javascript
{
  id: string,                  // Unique identifier (24-char hex)
  type: string,                // 'theme' | 'diff' | 'commit' | 'projectFile' | 'deployment'
  timestamp: Date,             // Creation timestamp
  data: {
    // Type-specific fields
  }
}
```

### Theme QR Data

```javascript
{
  id: string,
  type: 'theme',
  timestamp: Date,
  data: {
    themeId: string,           // 'dracula' | 'possession' | 'frankenstein' | 'ghost'
    themeName: string,
    icon: string,
    colors: object
  }
}
```

### Diff QR Data

```javascript
{
  id: string,
  type: 'diff',
  timestamp: Date,
  data: {
    summary: string,
    projectId: number,
    projectName: string,
    filesChanged: number,
    additions: number,
    deletions: number
  }
}
```

### Commit QR Data

```javascript
{
  id: string,
  type: 'commit',
  timestamp: Date,
  data: {
    commitHash: string,
    message: string,
    author: string,
    projectId: number,
    projectName: string,
    timestamp: Date
  }
}
```

### Project File QR Data

```javascript
{
  id: string,
  type: 'projectFile',
  timestamp: Date,
  data: {
    projectId: number,
    projectName: string,
    fileName: string,
    filePath: string,
    content: string,
    language: string
  }
}
```

### Deployment QR Data

```javascript
{
  id: string,
  type: 'deployment',
  timestamp: Date,
  data: {
    projectId: number,
    projectName: string,
    platform: string,          // 'gcp' | 'aws' | 'vercel' | 'render'
    status: string,            // 'active' | 'inactive' | 'pending'
    configuration: object,
    lastDeployed: Date
  }
}
```

### Alert Model

```javascript
{
  id: number,
  type: string,                // 'curse' | 'dead' | 'suspicious' | 'security' | 'deprecated'
  projectId: number,
  projectName: string,
  file: string,
  filePath: string,
  message: string,
  severity: string,            // 'high' | 'medium' | 'low'
  ghost: string,               // Emoji icon
  suggestion: string,
  lineNumber: number,
  timestamp: Date
}
```

### Recent Summon Model

```javascript
{
  id: string,                  // QR data ID
  type: string,
  name: string,                // Display name
  date: string,                // Formatted date
  icon: string                 // Type-specific emoji
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated:

- Properties 1.4 and 10.1 both test history updates after QR generation - can be combined
- Properties 2.1 and 6.2 both test round-trip data retrieval - can be combined
- Properties 1.2 and 6.1 both test unique ID generation and storage - can be combined
- Properties 9.1, 9.2, 9.4, and 9.5 all test premium dialog behavior - can be combined into comprehensive dialog property

### Core Properties

**Property 1: Summon type determines input fields**
_For any_ summon type selection, the QR Portal should display the appropriate input fields specific to that type (project selector for projectFile and deployment types, content input for theme/diff/commit types).
**Validates: Requirements 1.1, 1.5**

**Property 2: QR data round-trip consistency**
_For any_ valid QR data stored with a unique ID, retrieving that data by ID should return data equivalent to what was originally stored.
**Validates: Requirements 1.2, 2.1, 6.1, 6.2**

**Property 3: QR generation produces valid codes**
_For any_ valid summon data, generating a QR code should produce a scannable code containing the unique ID that can be decoded back to the original ID.
**Validates: Requirements 1.3**

**Property 4: History updates on QR operations**
_For any_ QR code generation or successful scan, the recent summons history should be updated with a new entry containing the correct type, name, and timestamp.
**Validates: Requirements 1.4, 2.5, 10.1**

**Property 5: Invalid ID error handling**
_For any_ invalid or non-existent ID scanned, the system should display an error message and not crash or display incorrect data.
**Validates: Requirements 2.3**

**Property 6: Retrieved data display completeness**
_For any_ successfully retrieved QR data, the display should include all type-specific required fields (project name, file paths, content, platform, status, etc.).
**Validates: Requirements 2.2, 2.4**

**Property 7: Persona selection persistence**
_For any_ persona selection, storing and then reloading the page should restore the same persona as the active selection.
**Validates: Requirements 3.2, 3.3**

**Property 8: Theme icon display consistency**
_For any_ active theme, the QR code preview area should display that theme's corresponding icon, and changing themes should update the icon accordingly.
**Validates: Requirements 4.1, 4.3, 4.4**

**Property 9: Alert generation from projects**
_For any_ set of projects with files, the alert generator should produce alerts based on actual file content, with each alert containing project name, file path, severity, and suggestion.
**Validates: Requirements 5.2, 5.3, 5.5**

**Property 10: QR data structure compliance**
_For any_ QR data stored in localStorage, it should contain all required fields: id (24-char hex), type, timestamp, and type-specific data fields.
**Validates: Requirements 6.4**

**Property 11: Project file QR completeness**
_For any_ file selected from a project, the generated QR data should include the file content, path, project name, and language, and scanning should display with syntax highlighting.
**Validates: Requirements 7.2, 7.3, 7.4, 7.5**

**Property 12: Deployment QR data encoding**
_For any_ project with deployment data, the generated QR should encode platform, status, and configuration, and scanning should display all deployment details.
**Validates: Requirements 8.2, 8.3, 8.4**

**Property 13: Premium dialog behavior**
_For any_ premium feature button clicked, a modal dialog should appear with spooky theming, "Pay to Unlock" message, Creepster font, ghost emojis, and close mechanisms, and closing should not unlock the feature.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

**Property 14: History resummon consistency**
_For any_ history entry, clicking "RESUMMON" should regenerate a QR code with data equivalent to the original generation.
**Validates: Requirements 10.3**

**Property 15: History size limit enforcement**
_For any_ sequence of QR generations, the recent summons history should never exceed 20 entries, with oldest entries removed when the limit is reached.
**Validates: Requirements 10.5**

## Error Handling

### Error Categories

1. **Storage Errors**

   - localStorage quota exceeded
   - localStorage unavailable (private browsing)
   - Data corruption or invalid JSON
   - Missing required data

2. **Validation Errors**

   - Invalid summon type
   - Missing required fields
   - Invalid QR ID format
   - Invalid project/file selection

3. **Scanning Errors**

   - Camera access denied
   - Invalid QR code format
   - Non-existent QR ID
   - Corrupted QR data

4. **Integration Errors**
   - ProjectContext unavailable
   - Missing project data
   - Missing deployment configurations
   - File content unavailable

### Error Handling Strategies

**Storage Errors**:

- Detect quota exceeded and prompt user to clear old data
- Provide fallback to session storage if localStorage unavailable
- Validate JSON before parsing, use try-catch blocks
- Display user-friendly error messages with recovery options

**Validation Errors**:

- Validate inputs before QR generation
- Show inline validation messages
- Disable submit buttons until valid
- Provide helpful placeholder text and examples

**Scanning Errors**:

- Request camera permissions with clear explanation
- Provide alternative upload methods (image/text file)
- Validate QR ID format before lookup
- Show "QR not found" message with option to generate new

**Integration Errors**:

- Check ProjectContext availability before rendering
- Show empty states when no projects exist
- Gracefully handle missing deployment data
- Provide fallback content for missing files

### Error Recovery

- **Automatic Recovery**: Clear corrupted data, retry failed operations
- **User-Initiated Recovery**: "Clear All QR Data" button in settings
- **Graceful Degradation**: Show limited functionality if features unavailable
- **Error Logging**: Console warnings for debugging (development only)

## Testing Strategy

### Unit Testing

**Components to Test**:

- QRGenerator: Input validation, QR generation, storage operations
- QRScanner: ID extraction, data retrieval, display formatting
- PremiumDialog: Open/close behavior, styling, event handling
- PersonaSelector: Selection, persistence, restoration
- AlertGenerator: Pattern detection, severity assignment, alert creation

**Test Cases**:

- Valid input handling for each summon type
- Invalid input rejection
- localStorage save/load operations
- UI state changes on user interactions
- Error message display
- Empty state rendering

### Property-Based Testing

**Testing Library**: fast-check (JavaScript property-based testing library)

**Configuration**: Each property test should run a minimum of 100 iterations to ensure comprehensive coverage across random inputs.

**Property Test Tagging**: Each property-based test must include a comment with the format:

```javascript
// Feature: qr-portal-enhancement, Property {number}: {property_text}
```

**Test Generators**:

- `arbitrarySummonType()` - Generates random summon types
- `arbitraryQRData(type)` - Generates valid QR data for given type
- `arbitraryProject()` - Generates random project structures
- `arbitraryFile()` - Generates random file content
- `arbitraryQRId()` - Generates valid 24-char hex IDs
- `arbitraryInvalidId()` - Generates invalid ID formats
- `arbitraryTheme()` - Generates random theme configurations
- `arbitraryPersona()` - Generates random persona selections

**Properties to Test**:

1. Round-trip consistency (store → retrieve → compare)
2. Input field rendering based on summon type
3. History updates on operations
4. Error handling for invalid inputs
5. Data structure compliance
6. Display completeness for all types
7. Theme icon consistency
8. Alert generation from project content
9. Premium dialog behavior
10. History size limits

### Integration Testing

**Test Scenarios**:

- Complete QR generation flow (select type → input data → generate → store)
- Complete QR scanning flow (scan → retrieve → display)
- Project integration (select project → select file → generate QR)
- Deployment integration (select project → load config → generate QR)
- History management (generate multiple → verify limit → resummon)
- Cross-page navigation (generate on Portal → view on Themes)

### Manual Testing Checklist

- [ ] Generate QR for each summon type
- [ ] Scan generated QRs and verify data display
- [ ] Test camera scanning with physical QR codes
- [ ] Test file upload scanning (image and text)
- [ ] Verify localStorage persistence across page reloads
- [ ] Test premium dialog on all premium features
- [ ] Verify persona selection persistence
- [ ] Check theme icon animations
- [ ] Verify alerts generated from actual projects
- [ ] Test history resummon functionality
- [ ] Test error states (invalid IDs, missing data)
- [ ] Verify responsive design on mobile devices

## Implementation Notes

### localStorage Key Structure

```
qr_data_{id}                    - Individual QR data entries
qr_recent_summons               - Array of recent QR generations
qr_persona_selection            - Active persona ID
qr_premium_unlocked             - Premium features status (future)
deployment_configurations_{id}  - Existing deployment configs
deployment_history_{id}         - Existing deployment history
```

### ID Generation Strategy

Use crypto.randomUUID() or fallback to timestamp + random hex for unique 24-character hex IDs:

```javascript
function generateUniqueId() {
  const timestamp = Date.now().toString(16).padStart(12, "0");
  const random = Math.random().toString(16).substring(2, 14);
  return (timestamp + random).substring(0, 24);
}
```

### Performance Considerations

- Lazy load project files (don't load all file content upfront)
- Debounce QR generation during typing
- Limit recent summons to 20 entries to prevent localStorage bloat
- Use canvas for QR rendering (already implemented)
- Cache alert generation results per project

### Accessibility

- Ensure all buttons have aria-labels
- Provide keyboard navigation for all interactive elements
- Use semantic HTML for screen readers
- Ensure sufficient color contrast for text
- Provide text alternatives for emoji icons

### Browser Compatibility

- Target modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Provide fallback for browsers without camera API
- Handle localStorage unavailability gracefully
- Test on mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **QR Code Sharing**: Generate shareable links for QR codes
2. **QR Analytics**: Track scan counts and locations
3. **Batch QR Generation**: Generate multiple QRs at once
4. **QR Templates**: Save and reuse QR configurations
5. **Export/Import**: Backup and restore QR data
6. **Premium Features**: Unlock advanced QR customization
7. **Real-time Collaboration**: Share QRs with team members
8. **QR Expiration**: Set time limits on QR validity
9. **Custom Styling**: User-defined QR appearance
10. **Integration APIs**: Connect with external services
