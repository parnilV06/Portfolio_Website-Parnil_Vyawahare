# Portfolio Project Content — Research Update 02

## Purpose

This is the **second project-content update** for the portfolio. It contains project information that was added, clarified, or substantially updated **after the first project-content document was already integrated into the portfolio**.

Give this document to Antigravity **alongside the first document**.

## Critical integration rules

- Treat this document as a content/data update, not a redesign request.
- Do not invent technologies, features, links, metrics, dates, outcomes, roles, or implementation details.
- If a field is unsupported, leave it empty rather than guessing.
- Preserve the existing portfolio UI, folder interaction, project cards, modals, animations, typography, spacing, and visual system.
- The four Featured Projects remain exactly:
  1. Cubit
  2. SlotTrack
  3. TW-Builder
  4. TypeCraft
- NutriScope and LeetLibrary are idea-phase projects and must remain excluded for now.

---

# 1. CUBIT

**Project Type:** Personal / Open-source product  
**Category:** Full-Stack Web Development / Speedcubing  
**Status:** Pre-Launch — V1 Final QA  
**License:** GNU GPL v3.0

### Tagline

> A modern speedcubing platform that blends timing, training, coaching, and community into one seamless experience.

### Description

Cubit is an open-source web platform built specifically for cubers. It brings solving, training, learning, progress tracking, competition, and community into one focused experience.

It combines a precision timer, session tracking, statistics, training content, gamification, ratings, leaderboards, community features, and educational resources.

Cubit is designed for beginners learning their first solve as well as experienced cubers tracking progress, improving performance, and competing with the community.

### Current status

Core V1 development is complete. Cubit is currently undergoing final full-product QA before its first public V1 release.

### Features

**Solve**
- Precision speedcubing timer
- Hold-to-start timing
- Solve logging
- WCA-style scramble generation
- 2×2 to 5×5 support
- +2 and DNF penalties
- Solve history
- Personal Best tracking
- Session-based solving
- Ao5 / Ao12 and other statistics
- Performance trends

**Cube Engine**
- Custom cube-state engine
- Cube visualization
- Interactive scramble visualization
- Algorithm playback
- Cube notation handling
- 2×2–5×5 support
- Interactive algorithm demonstrations

**Cubit Trainer**
- 8-module learning system
- 51 canonical lessons and resource articles
- MDX content
- Interactive cube/algorithm integration

Modules:
1. Getting Started
2. Cube Notation
3. Solve Your First Cube
4. Speedcubing Fundamentals
5. CFOP
6. Solving Other Cubes
7. Algorithms & Patterns
8. Cubing Guides & Resources

**Gamification & Rating**
- Rating from solve performance, improvement, Trainer completion, daily activity, and streak milestones
- Append-only rating ledger
- Rating reconciliation
- Daily activity tracking
- Current/longest streak
- Streak milestone rewards
- Global Cubit Rating leaderboard
- Friends leaderboard
- Rating/streak indicators
- Profile rating breakdown

**Community**
- Community feed
- Personal Best sharing
- Global leaderboard
- Friends leaderboard
- Friendship requests
- Friend management
- Notifications
- User profiles
- Rating/streak visibility
- Community interactions

**Focus Mode**
- Uninterrupted solving environment
- Original Focus Mode audio

**Profile & Progress**
- Personal Bests
- Solve statistics
- Session history
- Progress trends
- Cubit Rating
- Rating breakdown
- Current/longest streak
- Community information

### Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- Tailwind CSS
- Zustand
- Recharts

**Backend**
- Node.js
- Express.js
- Prisma ORM

**Database**
- PostgreSQL
- Neon
- Prisma

**Real-time**
- Socket.IO

**Authentication**
- JWT
- Google Sign-In

**Content**
- MDX
- Custom Trainer content pipeline

**Deployment**
- Vercel
- Railway

### Backend modules

- Authentication
- Google Authentication
- Profile Management
- Sessions & Solves
- Statistics & Trends
- Community Feed
- Friendship System
- Notifications
- Gamification & Rating
- Leaderboards
- Trainer Module
- Rating Reconciliation / Backfill

### Documentation

The repository contains dedicated documentation for:
- PRD
- HLD
- LLD
- API Blueprint
- Backend Architecture
- Database Design
- Project Architecture
- Environment Setup
- CHANGES
- Cubit Trainer Content
- Cubit Trainer Lesson Specs
- Cubit Trainer Content Guidelines

### Project structure

```text
cubit/
├── client/
├── server/
├── docs/
├── content/
├── README.md
└── LICENSE
```

### Development status

- Phase 1 — Ideation + Design: Complete
- Phase 2 — Frontend Development: Complete
- Phase 3 — Backend + Database: Complete
- Phase 4 — Integration + V1 Development: Complete
- Phase 5 — Full-Product QA: In Progress
- Phase 6 — Cubit V1 public release: Next

### Design principles

- Minimal over clutter
- Cubing first
- Fast interactions
- Open source
- Dark-first UI
- Community driven
- Accuracy over feature count
- Learning through interaction
- Build useful things, not generic features

### Portfolio treatment

**Featured Project — Order 1**

Do not describe Cubit as publicly launched. The accurate status is **Pre-Launch — V1 Final QA**.

---

# 2. CUBIT.JS

**Project Type:** Open-source JavaScript package / Developer Tool

Cubit.js is a reusable package developed as part of the Cubit ecosystem. It makes parts of Cubit's cubing functionality available independently of the main application.

**Repository:**  
https://github.com/parnilV06/Cubit.JS

### Description

Cubit.js is a lightweight, dependency-free JavaScript/npm library for modeling and manipulating NxN Rubik's Cubes and generating framework-agnostic 2D cube-net data.

### Features

- Zero runtime dependencies
- Pure JavaScript / ESM
- Immutable transformations
- 2×2–5×5 support
- Standard, prime, double, wide, and multi-layer wide moves
- WCA-style notation parsing
- Physically verified rotations
- Framework-agnostic visualization data
- Deterministic transformations
- Physical correctness tests

### Workflow

```text
Scramble
   ↓
Cube State Engine
   ↓
Scrambled State
   ↓
2D Net Data
   ↓
UI / Visualization
```

### APIs

- `applyScramble`
- `createSolvedCube`
- `parseScramble`
- `parseMove`
- `applyMove`
- `getNetData`
- `validateCubeState`

### Visualization support

Generated data can be consumed by:
- CSS Grid
- HTML
- Canvas
- SVG
- React
- Vue
- Svelte
- Mobile UI
- Custom graphics

### Internal modules

- `constants.js`
- `engine.js`
- `index.js`
- `mapper.js`
- `matrix.js`
- `parser.js`

### Testing

Coverage includes:
- Solved state
- Matrix rotation
- M⁴ identity
- Inverse
- Double turns
- Color conservation
- Centers
- Physical quarter turns
- Multi-move sequences
- Sticker permutation
- Regression
- Multiple sizes
- Randomized cross-validation

### Scope boundary

Scramble generation is intentionally not included in V1. Cubit.js consumes scrambles.

### Roadmap

- V1: Current package
- V2: Scramble generation/rendering
- V3: Solving/analysis

Treat Cubit.js as a **separate All Projects entry**, not merely an internal Cubit module.

---

# 3. JAMS

**Title:** Personal AI Operating System  
**Project Type:** Personal Project  
**Status:** Foundation complete; MCP Communication Layer is current

### Core idea

JAMS is a local, persistent Personal AI Operating System designed to act as an intelligent manager rather than another chatbot or coding assistant.

> **JAMS manages. Workers execute.**

JAMS coordinates specialized AI workers while maintaining long-term context, project knowledge, memory, planning, task state, and decisions.

### Example workflow

```text
Human → JAMS → Coding Worker → JAMS → Human
```

### Architecture

```text
                         HUMAN
                           │
                           ▼
                 ┌───────────────────┐
                 │       JAMS        │
                 │    AI Manager     │
                 │                   │
                 │ • Planning        │
                 │ • Memory          │
                 │ • Context         │
                 │ • Tasks           │
                 │ • Decisions       │
                 │ • Coordination    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ MCP COMMUNICATION │
                 │      LAYER        │
                 └─────────┬─────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Coding  │ │ Research │ │  Design  │
        │  Worker  │ │  Worker  │ │  Worker  │
        └──────────┘ └──────────┘ └──────────┘
          Zoo Code      Future       Future
```

Workers communicate through JAMS rather than directly with the human.

### Task lifecycle

```text
Human Request
     ↓
JAMS Creates Task
     ↓
Task Stored
     ↓
JAMS Assigns Worker
     ↓
Worker Executes
     ↓
Worker Reports Progress
     ↓
Worker Requests Clarification / Approval if Required
     ↓
Worker Completes Task
     ↓
JAMS Updates Task
     ↓
JAMS Updates Project Memory
     ↓
JAMS Reports Result to Human
```

### MCP Communication Layer

**Task API**
```text
createTask()
assignTask()
updateTask()
completeTask()
listTasks()
```

**Context API**
```text
getProject()
getMemory()
getWorkspace()
getPreferences()
```

**Communication API**
```text
askManager()
notifyManager()
requestApproval()
reportProgress()
```

### Persistent context

JAMS is intended to maintain canonical context for:
- Projects
- Tasks
- Decisions
- Workspace information
- User preferences
- Long-term memory
- Worker interactions

### Current worker

The first specialized worker is the **Coding Worker**, currently represented by **Zoo Code**.

Future workers may include:
- Research
- Design
- Testing
- DevOps
- Technical writing

These are future architecture, not current implementations unless separately verified.

### Workspace

```text
Z:\JAMS

├── Core/
├── Memory/
├── Tasks/
├── Logs/
├── Configs/
├── Agents/
└── Backups/
```

### Implemented foundation

- JAMS identity
- Core workspace
- Canonical startup configuration
- Task template
- Task creation
- Task file generation

Canonical files:
```text
AGENTS.md
SOUL.md
IDENTITY.md
USER.md
```

### Technology direction

Confirmed architectural direction:
- Local persistent AI manager
- Structured workspace
- File-based task/project state
- Model Context Protocol (MCP)
- Manager ↔ Worker communication

The exact runtime, language, model provider, database, and other implementation technologies are **not finalized in the supplied project information**. Do not invent them.

### Roadmap

```text
Phase 0 — Foundation
        ✓ Complete

Phase 1 — MCP Communication Layer
        → Current

Phase 2 — Connect Zoo Coding Worker

Phase 3 — Task Delegation

Phase 4 — Worker ↔ Manager Communication

Phase 5 — Additional Specialized Workers
```

Treat JAMS as a **major personal project / case-study-capable project**.

---

# 4. CLAIRE

**Title:** Inclusive EdTech Platform  
**Project Type:** Hackathon / EdTech Project

### Tagline

> Accessible Reading, Empowered Learning

### Description

Claire is an accessibility-focused learning platform for students with dyslexia. Its central idea is to reduce the cognitive/visual effort involved in reading and provide AI-assisted learning and wellbeing support.

### Reading accessibility

The Canvas reading environment includes:
- OpenDyslexic
- Font size controls
- Letter spacing
- Word spacing
- Line height
- Background/theme customization

### Personalization

Claire includes:
- Assessment page
- Accessibility flow
- Learner preference inference
- Recommended reading settings
- `dyslexia_assessment.json`

### AI learning assistant

AI functionality includes:
- Text simplification
- Summarization
- Quizzes
- Study-oriented tools

The backend has dedicated Groq chat/tool routes and Netlify serverless equivalents.

### AI emotional-support layer

The repository includes:
- `TherapySupportSection.tsx`
- `OpenRouterChat.tsx`
- Backend chat handling

Current functionality includes:
- Conversation history
- Supportive prompting
- Client-side crisis keyword detection
- Crisis-response path
- Professional-support disclaimer

**Important wording rule:** do not call this a custom-trained therapist AI. The implementation uses external LLM APIs with specialized system prompting and safety logic.

Preferred wording:
> Powered by an AI support companion configured for empathetic, motivational and calming guidance.

### Voice / Indian-language support

Sarvam AI routes/functions provide voice generation and TTS capabilities, including Indian-language support.

### Backend architecture

```text
React + TypeScript + Vite
        ↓
Express API layer
        ↓
AI / Voice integrations
   ├── Groq
   ├── Gemini
   └── Sarvam AI
        ↓
Netlify Functions
```

The repository contains routes for Sarvam, Groq chat, Groq tools, and Hugging Face status, with corresponding Netlify functions.

### Technology stack

- React
- TypeScript
- Vite
- Express
- Groq
- Gemini
- Sarvam AI
- Netlify

Because OpenRouter and Groq-related implementation both exist, keep provider wording flexible unless a final deployed provider is independently established.

---

# 5. SPOTSHARE

**Project Type:** Smart India Hackathon 2025 — Student Innovation  
**Theme:** Travel & Tourism

### Confirmed description

SpotShare is a **community-based, mobile-first web application for discovering hyperlocal food spots and hidden gems**.

### Confirmed context

It was an SIH 2025 project under the Travel & Tourism theme in the Student Innovation problem space.

### Do not invent the following

Still pending:
- Technology stack
- Detailed features
- Architecture
- Individual contribution
- Exact SIH problem statement
- Outcome
- Repository/demo
- Deployment
- Metrics

For now, create only a factual All Projects entry from the information above.

---

# 6. TIMEWIZARD

## Naming note

The technical description supplied for this project calls it **WebTime**. The portfolio/project name must remain **TimeWizard**.

### Description

TimeWizard is a Chrome extension designed to help users monitor and manage the amount of time they actively spend on individual websites.

It maintains an independent timer for each website. Tracking state is persisted using Chrome local storage so timers survive page refreshes and navigation.

Tab activity is tracked so timers accumulate only while the corresponding website is actively being viewed.

Switching websites pauses the previous timer; returning resumes it.

### Daily tracking

Usage is separated by date. Each website timer resets to `00:00:00` when a new day begins.

### Time limits

Users can:
- Set a custom time limit for a website
- Receive an alert when the limit is reached
- Reset a timer manually

### Interface

The extension uses a compact floating interface that can:
- Expand to expose controls
- Provide Set Timer
- Provide Reset Timer
- Be dragged to another position on the webpage

### Features

- Individual timer per website
- Persistent timers
- Active-tab based pause/resume
- Automatic daily reset
- Website-specific time limits
- Time-limit notifications
- Manual reset
- Compact expandable interface
- Draggable floating timer
- Chrome local storage persistence

### Tech stack

- JavaScript
- HTML
- CSS
- Chrome Extension Manifest V3
- Chrome Storage API
- Chrome Tabs API
- Browser DOM APIs

### Engineering learning

The project involved:
- Browser extension development
- Persistent client-side state
- Tab lifecycle events
- DOM manipulation
- Timer management
- Non-intrusive browser UI

A key implementation challenge was maintaining consistent timer state across refreshes, navigation, tab switching, and daily resets.

---

# 7. NIKE WEBSITE CLONE

**Project Type:** Practice / Learning Project

A practice recreation of the Nike website homepage made to practice HTML and CSS.

### Confirmed scope

- Homepage clone only
- Practice project
- HTML
- CSS

Do not describe it as a full Nike website, official Nike work, affiliated work, or a production implementation.

Keep this as a simple practice-project entry.

---

# 8. WHACK A MOLE

**Project Type:** Practice / Learning Project

A simple recreation of the Whack A Mole game using:

- HTML
- CSS
- JavaScript

It was created as a practice project to work with frontend interaction and basic JavaScript game logic.

Keep this as a simple practice-project entry.

---

# 9. LIFELINE

**Project Type:** Academic / Mobile / Real-Time System  
**Platform:** Android

### Description

LifeLine is a real-time ambulance dispatch and operations platform designed to improve coordination between dispatchers, ambulance drivers, and hospitals.

It provides:
- Live ambulance tracking
- Incident management
- Hospital coordination
- Role-based access
- Real-time synchronization

### Roles

**Dispatcher**
- Dispatcher dashboard
- Live fleet map
- Ambulance availability/status
- Active incident monitoring
- Incident creation
- Ambulance assignment
- Hospital selection
- Incident details
- Timeline/history

**Driver**
- Driver dashboard
- Assigned ambulance
- Active emergency
- Incident status
- Real-time location
- Hospital destination
- Profile

**Admin**
- User management
- Ambulance management
- Hospital management
- RBAC

### Real-time capabilities

- Ambulance locations
- Ambulance status
- Incident updates
- Event timeline
- Firebase synchronization

### Maps

- Google Maps
- Google Places
- Hospital/incident locations
- Location-based hospital selection

### Tech stack

- Flutter
- Dart
- Firebase Authentication
- Cloud Firestore
- Google Maps
- Google Places
- Android

### Architecture

```text
Flutter UI
    ↓
Controllers / State Layer
    ↓
Repository Layer
 ├── Users
 ├── Ambulances
 ├── Incidents
 └── Hospitals
    ↓
Firebase Authentication
+
Cloud Firestore
```

### Release

Repository/release:
https://github.com/kalviumcommunity/S115-0826-Sudo-Android-flutter-firebase-LifeLine/releases/latest

Latest APK:
`LifeLine-v1.0.0.apk`

---

# 10. BITTRACE

**Project Type:** Smart India Hackathon 2026  
**Problem Statement:** SIH26146  
**Organization:** National Technical Research Organisation (NTRO)

### One-line pitch

> BITTRACE correlates Bitcoin network and blockchain metadata, uses explainable ML to detect suspicious behaviour, and converts complex transaction patterns into ranked investigative leads — completely offline.

### Problem / purpose

BITTRACE is an offline investigation system for bulk Bitcoin transaction/network metadata.

It is designed to:
- Ingest CSV/JSON/XML
- Parse transaction/network metadata
- Correlate IPs, ports, timestamps, TXIDs, wallets, amounts
- Build entity/transaction graphs
- Generate features
- Detect anomalies
- Cluster entities
- Rank investigative leads
- Provide explainability
- Provide risk/confidence information
- Provide an investigator dashboard
- Operate fully offline on Linux

### ML

- Isolation Forest
- DBSCAN
- StandardScaler
- Graph-derived features
- Temporal features
- Transaction features
- Network features

**Critical interpretation:** risk scores represent investigative priority, not proof of criminal activity. Anomaly detection/clustering must not be presented as proof of wrongdoing.

### Architecture

```text
React / Vite / Cytoscape.js / Charts
                ↓
          FastAPI Application
                ↓
       Analytics / Intelligence
                ↓
       PostgreSQL / Graph Cache
              / Models
```

### Tech stack

**Frontend**
- React
- Vite
- Cytoscape.js
- Recharts / Chart.js
- TypeScript

**Backend**
- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Pandas
- NumPy
- lxml/XML parsers
- NetworkX
- scikit-learn

**ML**
- Isolation Forest
- DBSCAN
- StandardScaler

**Data**
- PostgreSQL
- Local filesystem
- Local GeoIP/ASN DB

**Environment**
- Linux
- Docker optional

### Pipeline

```text
Dataset
   ↓
Ingestion
   ↓
Normalization
   ↓
Validation
   ↓
GeoIP / ASN
   ↓
Network / Blockchain Correlation
   ↓
Entity Resolution
   ↓
Graph
   ↓
Features
   ↓
ML
   ↓
Risk
   ↓
Explainability
   ↓
Ranked Leads
   ↓
Human Investigator
```

### MVP

- CSV/JSON/XML ingestion
- Normalization
- Validation
- GeoIP/ASN
- Correlation
- Graph
- Entity clustering
- Isolation Forest
- DBSCAN
- Risk scoring
- Explainability
- Dashboard

### Limitations

- Synthetic data
- Correlation depends on dataset
- Clustering is probabilistic
- Anomaly ≠ criminal activity

### Future phases

- Advanced graph analytics
- Case management
- Reports
- GNN
- Multi-chain support
- Live feeds

Do not present future phases as current features.

---

# 11. M.A.R.G — PAINGANGA PUBLICATION

**Full project title:**  
Mehkar Analysis And Research Gazette (M.A.R.G) Journal — Website Design and Development | Logo Design | Social Media Marketing and Management

**Dates:** Mar 2025 – Apr 2025  
**Role:** Web Developer, Designer & Digital Manager

### Context

M.A.R.G is a newly launched multidisciplinary research journal under Painganga Publication.

### Website

Built and managed using:
- WordPress
- Elementor
- Forminator
- Hostinger

The website provides:
- Journal information
- Published issues
- Research paper submission
- Connection with researchers

### Branding

Created a modern, clean logo/brand identity aligned with the journal's academic/professional positioning.

### Submission system

Implemented a simple multi-step submission workflow using Elementor and Forminator.

Payment verification was manual.

### Social media

- Set up official social pages
- Established consistent branding
- Managed social presence

### Ongoing management

- Website maintenance
- Digital presence
- Updates
- Long-term operation
- Social media management

### Dates

March 2025 – April 2025.

---

# 12. SHABDSANCHAY — PAINGANGA PUBLICATION

**Full project title:**  
Shabdsanchay Journal — Website Design and Development | Logo Design | Social Media Management

**Dates:** Nov 2024 – Dec 2024  
**Role:** Web Developer, Designer & Digital Manager

### Context

Shabdsanchay is a multidisciplinary peer-reviewed research journal published by Painganga Publication.

This was the first professional client project.

### Website

Built using:
- Wix Studio

The site provides a platform for researchers to:
- Submit papers
- Access issues
- Learn about the journal

### Branding

Created a modern logo aligned with:
- Journal mission
- Academic positioning
- Brand identity

### Social media

- Launched official pages
- Established consistent branding
- Managed social presence

### Ongoing management

- Website maintenance
- Social media maintenance
- Updates
- Smooth ongoing operation

---

# 13. EXCLUDED FOR NOW

## NutriScope

Idea-phase project. Do not add.

## LeetLibrary

Idea-phase project. Do not add.

---

# 14. CURRENT READINESS

### Fully ready from this update

- Cubit
- Cubit.js
- JAMS
- Claire
- TimeWizard
- Nike Website Clone
- Whack A Mole
- LifeLine
- BITTRACE
- M.A.R.G
- Shabdsanchay

### Partially ready

**SpotShare**

Confirmed:
- SIH 2025
- Student Innovation
- Travel & Tourism
- Community-based
- Mobile-first
- Hyperlocal food spots
- Hidden gems

Missing:
- Stack
- Features
- Architecture
- Individual contribution
- Exact problem statement
- Outcome
- Links
- Deployment
- Metrics

Do not fabricate the missing information.

---

# 15. FINAL INTEGRATION CHECKLIST FOR ANTIGRAVITY

1. Merge this document with the project data already imported from the first document.
2. Replace the old/incomplete Cubit content with the complete Cubit content in this document.
3. Add Cubit.js as a separate project.
4. Add JAMS.
5. Add Claire.
6. Add SpotShare using only its confirmed information.
7. Add TimeWizard using the TimeWizard name and the WebTime technical description.
8. Add Nike Website Clone.
9. Add Whack A Mole.
10. Add LifeLine.
11. Add BITTRACE.
12. Add M.A.R.G.
13. Add Shabdsanchay.
14. Keep NutriScope and LeetLibrary excluded.
15. Keep Featured Projects exactly:
    - Cubit — order 1
    - SlotTrack — order 2
    - TW-Builder — order 3
    - TypeCraft — order 4
16. Do not redesign anything.
17. Do not invent missing fields.
18. Do not add fake images, links, metrics, or project claims.
19. Keep optional modal sections conditional on whether the project data actually contains them.
20. Ensure the All Projects page is populated from reusable project data rather than hardcoded project-specific UI.
