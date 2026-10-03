# Portfolio Project Content Master Research

## Purpose

This document combines the currently available research for the portfolio projects so Antigravity can replace placeholder project content without redesigning the existing UI.

**Important:** Do not invent missing dates, roles, technologies, outcomes, metrics, screenshots, videos, or links. `MANUAL / PENDING` means the information is not sufficiently verified yet.

---

# 1. Antigravity implementation instructions

- Keep the existing project cards/folders, project modal, typography, spacing, animations, hover behavior, and visual language.
- Replace placeholder content with the project data below.
- Do not redesign the project UI.
- Images/videos are intentionally manual placeholders.
- Existing featured projects remain **Cubit, SlotTrack, TW-Builder, TypeCraft**.
- Do not mark projects such as NutriScope or LeetLibrary as completed unless later evidence supports it.
- Do not create empty case-study headings; only render sections when content exists.

Recommended schema:

```json
{
  "slug": "",
  "title": "",
  "tagline": "",
  "shortDescription": "",
  "description": "",
  "year": null,
  "status": "",
  "category": "",
  "projectType": "",
  "technologies": [],
  "role": "",
  "links": {"github": "", "demo": "", "documentation": ""},
  "media": {"cover": "", "images": [], "videos": [], "architecture": ""},
  "caseStudy": {
    "problem": "",
    "solution": "",
    "features": [],
    "challenges": "",
    "outcome": "",
    "learnings": ""
  },
  "display": {"featured": false, "featuredOrder": null, "showInProjects": true}
}
```

---

# 2. Verified repository research

## AssetFlow

**Repository:** https://github.com/parnilV06/AssetFlow-Odoo_Hackathon

**Status:** Hackathon-stage prototype; substantial backend and frontend implementation verified.

**Tagline:** Track • Allocate • Maintain

**Short description:** Enterprise asset and resource management platform for managing organizational assets, allocations, bookings, maintenance, audits, and role-aware dashboards.

**Category:** Web Development

**Project Type:** Hackathon

**Technologies:** React 19, Vite, React Router, Recharts, Lucide React, Axios, Node.js, Express 5, Prisma ORM, PostgreSQL, JWT, bcrypt, Zod.

**Roles documented by the project:** ADMIN, ASSET_MANAGER, DEPARTMENT_HEAD, EMPLOYEE.

**Key features:** Authentication; RBAC; department/employee management; asset management; allocation; returns; transfers; resource booking; maintenance; audits; dashboard analytics; notifications; reports; settings.

**Architecture:**

```text
React/Vite Client → Express API → Router → Controller → Service → Prisma → PostgreSQL
```

**Problem:** Organizations need a centralized way to track physical assets, ownership, allocations, bookings, maintenance, and audits.

**Solution:** A role-aware ERP-style platform with dedicated asset, allocation, booking, maintenance, audit, and analytics modules.

**Technical approach:** Layered Express backend using Prisma/PostgreSQL, JWT authentication and RBAC, with a React/Vite dashboard frontend.

**Challenges:** Multiple role-dependent workflows; relational modeling of allocations/transfers/bookings/maintenance/audits; separation of controllers, services and persistence; hackathon-scale coordination.

**Outcome:** Deployed hackathon-stage prototype with substantially implemented backend and broad frontend module coverage.

**Role:** Full-Stack Developer. Exact individual task split should be manually verified before adding detailed claims.

**Media:** MANUAL

**Featured:** No

---

## SlotTrack

**Repository:** https://github.com/parnilV06/S115-0726-Byte3-Fullstack-nextJS--SlotTrack

**Status:** Full-stack SWI project / production-oriented application.

**Tagline:** A race-condition-safe fitness class booking platform.

**Short description:** Fitness-class booking platform designed around real-time seat availability and concurrency-safe reservations.

**Context:** Simulated Work Integration (SWI) Program at Kalvium, Team Byte3.

**Category:** Full-Stack Web Development

**Project Type:** Academic / SWI

**Technologies:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, PostgreSQL/Neon, Prisma, NextAuth.js, bcrypt, Zod, Docker, Docker Compose, React Hook Form, Axios, JWT, Lucide React.

**Features:** Member/admin authentication; RBAC; class discovery; location/search filtering; class details; live seat availability; booking; cancellation; booking history; profiles; admin class management; instructor assignment; attendance monitoring; booking audits.

**Architecture:**

```text
Client → Next.js Route Handler → Controller → Service → Repository → Prisma → PostgreSQL
```

**Concurrency implementation:** The repository documents database transactions and pessimistic locking with `SELECT ... FOR UPDATE` to prevent overbooking, plus `@@unique([userId, classId])` to prevent duplicate bookings.

**Problem:** A booking system must keep seat inventory correct when multiple users reserve the same class simultaneously.

**Solution:** Combine application validation with database transactions and row locking so availability is updated atomically.

**Technical approach:** Layered architecture, Prisma repository abstraction, PostgreSQL transactions/locking, authentication and role-based workflows.

**Challenges:** Concurrency; consistent seat counts; duplicate reservations; separation of business logic and persistence.

**Outcome:** Structured booking system centered around reservation consistency.

**Role:** Team project. Exact individual contribution should be manually confirmed.

**Media:** MANUAL

**Featured:** Yes — Order 2

---

## TW-Builder

**Repository:** https://github.com/parnilV06/TW-Builder

**Live Demo:** https://tw-builder.vercel.app/

**Status:** Completed and deployed developer tool.

**Tagline:** Build Tailwind components visually.

**Short description:** Fully client-side visual builder for creating Tailwind CSS components using familiar CSS concepts and generating deterministic Tailwind classes and JSX.

**Category:** Developer Tool / Web Development

**Project Type:** Personal

**Technologies:** React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Vitest, Testing Library.

**Features:** div, button, input, img, section and span controls; layout; sizing; spacing; flex; grid; colors; borders; typography; shadows; responsive Base/SM/MD/LG overrides; live preview; JSX generation; Tailwind class generation; canonical token mapping; arbitrary pixel fallback; clipboard copy; reset.

**Technical detail:** The ordered property registry is the single mapping source for generated Tailwind classes and preview CSS. Example: `24px → p-6`, `22px → p-[22px]`. Responsive preview state cumulatively merges Base through the selected breakpoint.

**Architecture:**

```text
Builder State → Property Registry → Preview
                              ↘ Tailwind Mapper → JSX Generator
```

**Problem:** Developers may know the visual CSS they want but still need to manually translate it into Tailwind utilities and JSX.

**Solution:** Visual builder mapping semantic styling controls directly to Tailwind utilities.

**Technical approach:** Typed domain model, Zustand state, deterministic mapping engine and responsive state merging.

**Outcome:** Lightweight browser-based developer tool with no backend, accounts, persistence or API dependency.

**Role:** Developer / Creator

**Media:** MANUAL

**Featured:** Yes — Order 3

---

## TypeCraft

**Repository:** https://github.com/parnilV06/TypeCraft

**Live Demo:** https://typecraft-typing-speed-test.netlify.app/

**Status:** Stable v1.0.0; deployed.

**Tagline:** A minimal, distraction-free typing speed test tool built for focus and practice.

**Short description:** Clean typing speed test application designed to measure and improve typing performance without unnecessary distractions.

**Category:** Web Development

**Project Type:** Personal / Learning Project

**Technologies:** React, Vite, JavaScript, custom CSS.

**Features:** Custom test duration; Easy/Medium/Hard; real-time feedback; correct/incorrect/extra/missed character handling; Raw WPM; Net WPM; accuracy; character statistics; minimal dark UI.

**Typing logic:**

```text
Raw WPM = (Total typed characters ÷ 5) ÷ time
Accuracy = (Correct characters ÷ total typed characters) × 100
Net WPM = Raw WPM adjusted using accuracy
```

**Problem:** Build a typing-test application that behaves correctly at character level without external typing libraries.

**Solution:** Implement typing engine from first principles with React state and keyboard event handling.

**Technical approach:** Character-level comparison, timer lifecycle, keyboard event handling, dynamic rendering and calculated metrics.

**Outcome:** Stable v1.0.0 application.

**Role:** Developer / Creator

**Media:** MANUAL

**Featured:** Yes — Order 4

---

## The MoltStein Files

**Repository:** https://github.com/parnilV06/The-MoltStein-Files

**Status:** Actively maintained research/archive project according to repository documentation.

**Tagline:** An observational archive documenting emergent cultural, social, and philosophical behaviors within AI agent ecosystems.

**Short description:** Archival observatory that collects publicly accessible AI-agent discourse and organizes it into structured dossiers for observational and analytical study.

**Category:** AI / Research / Web Development

**Project Type:** Personal / Research

**Technologies:** Next.js, Tailwind CSS, MongoDB, Puppeteer, Node.js, Vercel, GitHub Actions, ISR.

**Archive metadata:** File ID; title; agent attribution; date logged; severity classification; archive reasoning tags; categories; source platform; original source link.

**Reading experience:** Archive Index → Dossier View. Index provides summary previews; dossier provides complete record, metadata, source linkage and archival context.

**Pipeline:**

```text
Scraper → Content Extraction → Filtering → MongoDB Storage → Archive Rendering
```

**Automation:** Scheduled daily scraping, GitHub Actions, MongoDB ingestion and Next.js ISR.

**Problem:** AI-agent social environments generate ephemeral discourse that is difficult to systematically preserve and study.

**Solution:** Structured archive collecting publicly observable agent discourse while preserving source/context information.

**Technical approach:** Automated scraping, structural filtering, semantic classification, MongoDB storage and Next.js ISR.

**Outcome:** Maintained research-oriented archival system.

**Role:** Creator & Maintainer

**Media:** MANUAL

**Featured:** No

---

## Expense Tracker

**Repository:** https://github.com/parnilV06/Expense-Tracker

**Status:** Full-stack deployed application.

**Short description:** Full-stack expense dashboard for managing income and expenses, filtering transactions and generating category-based spending reports.

**Category:** Full-Stack Web Development

**Project Type:** Personal

**Technologies:** React 19, Vite, CSS, Fetch API, LocalStorage, Node.js, Express 5, MongoDB Atlas, Mongoose, dotenv.

**Deployment:** Frontend Vercel; backend Render.

**Features:** Signup/login; income tracking; expense tracking; total income/expense/balance; transaction history; date filtering; category spending reports; spending percentages; account information; dark dashboard.

**Technical detail:** Spending report uses MongoDB aggregation:

```text
$match → $facet(categoryTotals + totalExpenses) → $project → percentage calculation
```

**Problem:** Users need more than transaction lists; they need filtered views and aggregated spending information.

**Solution:** Dashboard combining transaction management with category-level financial summaries.

**Technical approach:** React components/hooks, Express/Mongoose services and MongoDB aggregation.

**Known future work documented by repository:** stronger authentication, user-scoped transactions, backend validation, automated tests, charts and CSV export.

**Role:** Developer / Creator

**Media:** MANUAL

**Featured:** No

---

## LeetCode Question Tracker

**Repository:** https://github.com/parnilV06/Leetcode-Question-Tracker

**Status:** Deployed personal-use application.

**Short description:** Personal DSA revision tool for recording solved LeetCode problems, solution code, status and tags.

**Category:** Developer Tool / DSA

**Project Type:** Personal

**Technologies:** Node.js, Express, SQLite, better-sqlite3, HTML, CSS, JavaScript, Netlify, Render.

**Features:** Store LeetCode questions; solution code; status; problem tags; retrieve questions for revision.

**Problem:** Previously solved DSA questions and approaches can become difficult to find during revision.

**Solution:** Centralize solved questions, code and tags in a dedicated revision application.

**Technical approach:** Lightweight Express API backed by SQLite with vanilla HTML/CSS/JavaScript frontend.

**Authentication:** Intentionally excluded because the project was designed as a personal-use MVP.

**Role:** Developer / Creator

**Media:** MANUAL

**Featured:** No

---

## CodeRecall AI

**Repository:** https://github.com/parnilV06/CodeRecall-AI

**Status:** MVP / deployed.

**Tagline:** Understand your old code without re-solving it.

**Short description:** LLM-powered developer tool that explains existing programming solutions by adding concise inline comments reconstructing the reasoning behind the code.

**Category:** AI / Developer Tool

**Project Type:** Personal

**Problem:** Developers may remember a solution but forget why particular conditions, calculations or pointer movements were used when revisiting it later.

**Solution:** Provide the problem statement and existing code; return the same code with useful inline explanations.

**AI stack:** OpenRouter; `openai/gpt-4o-mini`.

**Core route:** `/explain-code`

**Pipeline:**

```text
Problem Statement + Existing Code → Backend API → OpenRouter → GPT-4o-mini → Annotated Original Code
```

**Features:** Problem input; code input; AI explanation; inline-commented original code.

**Explicitly excluded from MVP:** Authentication; explanation history; language-specific optimization.

**Role:** Developer / Creator

**Media:** MANUAL

**Featured:** No

---

## Kalvium Auto Assignment Video Generator

**Repository:** https://github.com/parnilV06/Kalvium-Auto-Assignment-Video-Generator

**Status:** Packaged desktop application.

**Tagline:** Automated assignment explanation videos from assignment descriptions.

**Short description:** Desktop application converting assignment descriptions into AI-generated scripts, locally synthesizing voiceovers and automatically producing MP4 explanation videos.

**Category:** Desktop / AI / Automation

**Project Type:** Personal / Academic Tool

**Architecture:**

```text
Electron
├── React + Vite
├── Node.js + Express
├── Gemini API
├── Piper TTS
└── FFmpeg
```

**Pipeline:**

```text
Assignment Input → Gemini API → Explanation Script → Piper TTS → Voiceover → FFmpeg → MP4
```

**Technologies:** React, Vite, Electron, Node.js, Express, Google Gemini API, Piper TTS, FFmpeg, Electron Builder, NSIS.

**Features:** AI script generation; local/offline TTS processing; automatic video rendering; one-click generation; local media processing; Windows installer; reduced manual recording.

**Problem:** Manually recording assignment explanation videos is repetitive and time-consuming.

**Solution:** Automate the workflow from written assignment description to final MP4.

**Technical approach:** Hybrid Electron architecture combining cloud AI generation with local media processing.

**Important detail:** AI generation requires an API key; audio/video processing is local using Piper and FFmpeg.

**Outcome:** Packaged desktop workflow capable of generating submission-ready explanation videos.

**Role:** Developer / Creator

**Media:** MANUAL

**Featured:** No

---

## SwarVeda

**Repository:** https://github.com/parnilV06/SwarVeda-IKS

**Status:** Completed academic/team project.

**Tagline:** The Science of Indian Classical Music

**Short description:** Interactive educational platform explaining mathematical, physical and acoustic foundations of Indian classical music.

**Category:** Web Development / Education

**Project Type:** Academic / IKS

**Technologies:** React, TypeScript, Vite, Tailwind CSS, Web Audio API, Canvas API, Express, Zod, React Router, React Query, Recharts, Framer Motion, Three.js, React Three Fiber, Radix UI.

**Major sections:** Science of Sound; Frequency Visualizer; Raga Explorer; Rhythm Labs.

**Frequency Visualizer:** Interactive note selection, audio generation, waveform visualization and Just Intonation ratios. Documented base frequency `Sa = 240 Hz` and ratios:

```text
Sa 1/1
Re 9/8
Ga 5/4
Ma 4/3
Pa 3/2
Dha 5/3
Ni 15/8
Sa 2/1
```

**Raga Explorer:** Raga structure, Arohana, Avarohana, Vadi, Samvadi and emotional expression.

**Rhythm Labs:** Taal, beat cycles, rhythm counting and mathematical divisions.

**Documented contribution:** Initial project setup; deployment; homepage; Frequency Visualizer; project management.

**Team:** Parnil Vyawahare, Raina George, Sasmit Narnaware, Mohammad Aamir Patloo.

**Problem:** Scientific and mathematical aspects of Indian classical music can be difficult to understand through conventional textual explanations.

**Solution:** Interactive visual/audio experiences demonstrating frequencies, ratios, sound waves, ragas and rhythm.

**Technical approach:** Browser-native Web Audio and Canvas visualizations combined with React/TypeScript UI.

**Outcome:** Interdisciplinary educational platform connecting modern web technology with IKS concepts.

**Role:** Contributor / documented project-management contribution.

**Media:** MANUAL

**Featured:** No

---

# 3. Earlier project set — available context, not fully re-verified in this pass

## Cubit

**Status:** Major project / active product.

**Tagline:** Speedcubing, reimagined.

**Short description:** Speedcubing platform combining a timer, scramble generation, visualizations, statistics, training modes and leaderboards.

**Category:** Web Development

**Project Type:** Personal

**Technologies established in project context:** React, Tailwind CSS, Zustand, Node.js, Express, MongoDB, Mongoose, Vercel; Prisma was used in backend implementation during development.

**Features established:** Speedcubing timer, scrambler, scramble visualizer, statistics, training modes, leaderboards, Google Sign-In.

**Case study problem:** Speedcubers need a focused environment for timing solves, analyzing performance and training.

**Solution:** Dedicated platform combining timing, scramble generation, statistics and training functionality.

**Manual verification needed:** exact repository URL, final technology list, final backend URL, exact individual contribution, current feature completeness, final outcome/metrics.

**Featured:** Yes — Order 1

---

## Cubit.JS

**Status:** Separate project/repository from main Cubit product.

**Known context:** Associated with Cubit ecosystem and should remain a separate entry unless repository evidence establishes it as only an internal package.

**All other fields:** MANUAL / pending repository verification.

---

## Claire

**Repository:** https://github.com/parnilV06/Claire

**Status:** Completed hackathon/project prototype.

**Tagline:** Accessible Reading, Empowered Learning

**Short description:** Web-based accessibility tool supporting students with dyslexia by transforming standard text into a more readable format and providing AI-powered learning assistance.

**Known features:** Clarity Canvas; PDF upload; text input; OpenDyslexic font; background customization; letter spacing; line height; font size; AI summaries; AI-generated mind maps; flow charts; flashcards; text-to-speech; AI support/therapy concept.

**Technologies established:** React; accessibility UI; Sarvam AI for TTS; Hugging Face integration explored for AI support; Netlify deployment.

**Problem:** Students with dyslexia can experience difficulty decoding conventional text and may also face confidence, anxiety and learning-related challenges.

**Solution:** Customizable reading environment with AI-assisted study features and supportive guidance.

**Manual verification needed:** final AI model/provider, final feature set, architecture, individual contribution and outcome.

---

## BitTrack / Bitcoin Transaction Monitoring Project

**Status:** SIH project.

**Known problem statement:** AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic.

**Known technology direction:** PostgreSQL, React, Tailwind CSS, Python, scikit-learn.

**Project Type:** Hackathon / SIH

**Manual verification needed:** exact repository, final project name, implementation, features, architecture, outcome and individual role.

---

## JAMS

**Status:** Personal AI OS / personal-use AI system.

**Known context:** Personal AI OS/system built for personal use.

**Detailed implementation:** MANUAL / pending repository verification.

---

## Nike Website Clone

**Status:** Frontend clone project.

**Project Type:** Personal / Learning

**Known context:** Recreation/clone of Nike website.

**Detailed implementation:** MANUAL / pending repository verification.

---

## Whack A Mole Clone

**Status:** Game/learning project.

**Project Type:** Personal / Learning

**Known context:** Whack-A-Mole style browser game.

**Detailed implementation:** MANUAL / pending repository verification.

---

## Painganga Publication — Shabdsanchay

**Status:** Client/organizational web project.

**Known context:** Website work for Painganga Publication and Shabdsanchay publication, including web development, website management, social media management, research-paper publication workflows and certificate-generation automation.

**Manual verification needed:** exact URL, platform/technology, individual contribution, dates and final features.

---

## Painganga Publication — MARG

**Status:** Client/organizational web project.

**Known context:** Website/project work associated with Painganga Publication and MARG journal, including web development, website management, social media management, publication workflows and certificate automation.

**Manual verification needed:** exact URL, platform/technology, individual contribution, dates and final features.

---

## SpotShare

**Status:** Project known from portfolio/project history.

**Detailed content:** MANUAL / pending repository verification.

---

## TimeWizard

**Status:** Chrome extension.

**Known context:** Chrome extension named TimeWizard.

**Detailed content:** MANUAL / pending repository verification.

---

## NutriScope

**Status:** Hackathon/product idea.

**Context:** Product idea considered for IQOO Hackathon Pune City Battle.

**Important:** Do not represent as completed unless repository/project evidence is provided.

**Project Type:** Hackathon / Idea

**Detailed content:** MANUAL

---

## LeetLibrary

**Status:** Project/idea known from portfolio project list.

**Important:** Do not represent as completed until repository/project evidence is provided.

**Detailed content:** MANUAL

---

# 4. BitTrace

**Repository:** https://github.com/rizzzabh-06/BIT-TRACE

**Status:** PENDING ACCESS

The supplied repository could not be accessed through the connected GitHub source during research. No technical details should be fabricated.

**Known identity:** BitTrace. Associated with the Bitcoin transaction monitoring/SIH project context.

**All fields:** MANUAL / pending repository access.

---

# 5. LifeLine

**Repository:** https://github.com/kalviumcommunity/S115-0826-Sudo-Android-flutter-firebase-LifeLine

**Status:** PENDING ACCESS

The repository could not be accessed through the connected GitHub source during research.

Do not invent description, features, stack, architecture, role, outcome or dates.

---

# 6. Readiness matrix

| Project | Available content | Case study | Manual work |
|---|---|---|---|
| Cubit | Partial | Yes | Exact repo/current implementation/role |
| Cubit.JS | Partial | Pending | Repository details |
| AssetFlow | Strong | Yes | Exact personal contribution/media |
| SlotTrack | Strong | Yes | Exact personal contribution/media |
| TW-Builder | Strong | Yes | Media |
| TypeCraft | Strong | Medium | Media |
| The MoltStein Files | Strong | Yes | Media |
| Expense Tracker | Strong | Medium | Media |
| LeetCode Tracker | Strong | Medium | Media |
| CodeRecall AI | Strong | Yes | Media/current deployment |
| Kalvium Video Generator | Strong | Yes | Media |
| SwarVeda | Strong | Yes | Media/final role wording |
| Claire | Partial | Yes | Final implementation details |
| BitTrack | Partial | Pending | Repository + implementation |
| BitTrace | Pending | Pending | Repository access |
| JAMS | Partial | Pending | Repository + implementation |
| Nike Clone | Partial | Pending | Repository + implementation |
| Whack A Mole | Partial | Pending | Repository + implementation |
| Painganga — Shabdsanchay | Partial | Pending | URL/platform/role |
| Painganga — MARG | Partial | Pending | URL/platform/role |
| SpotShare | Partial | Pending | Repository + implementation |
| TimeWizard | Partial | Pending | Repository + implementation |
| NutriScope | Idea only | No | Do not mark completed |
| LeetLibrary | Idea/unknown | No | Do not mark completed |
| LifeLine | Pending | Pending | Repository access |

---

# 7. Current featured configuration

```json
[
  {"slug":"cubit","featured":true,"featuredOrder":1},
  {"slug":"slottrack","featured":true,"featuredOrder":2},
  {"slug":"tw-builder","featured":true,"featuredOrder":3},
  {"slug":"typecraft","featured":true,"featuredOrder":4}
]
```

Do not change the featured set while importing this research.

---

# 8. CMS/data rules

The portfolio should treat content as data and UI as reusable code:

```text
Project JSON
   ↓
Project Card
   ↓
Project Modal
   ↓
Optional Case Study Sections
```

Future projects should be addable without modifying the project component itself.

Recommended directory:

```text
content/projects/
├── cubit.json
├── cubit-js.json
├── assetflow.json
├── slottrack.json
├── tw-builder.json
├── typecraft.json
├── moltstein-files.json
├── expense-tracker.json
├── leetcode-question-tracker.json
├── coderecall-ai.json
├── kalvium-video-generator.json
├── swarveda.json
├── claire.json
├── bittrack.json
├── bittrace.json
├── jams.json
├── nike-clone.json
├── whack-a-mole.json
├── painganga-shabdsanchay.json
├── painganga-marg.json
├── spotshare.json
├── timewizard.json
├── nutriscope.json
├── leetlibrary.json
└── lifeline.json
```

---

# 9. Final anti-fabrication rule

This is a mixed research/content document.

- **VERIFIED:** directly supported by repository material inspected during research.
- **ESTABLISHED CONTEXT:** previously established portfolio/project information that has not necessarily been re-verified against the repository in this pass.
- **MANUAL / PENDING:** information that must not be guessed.

When new project data is supplied manually, update the corresponding entry rather than creating duplicates.

---

# END OF CURRENT RESEARCH DATA

Remaining project information will be appended as it becomes available.
