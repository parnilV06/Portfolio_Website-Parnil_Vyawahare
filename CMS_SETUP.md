# Decap CMS Setup & Content Management Guide

This document is the practical operational guide for managing project content on the Parnil portfolio using Decap CMS.

---

## 1. Architecture Overview

The portfolio uses a **Git-backed, static Decap CMS architecture**. Content is managed via an authenticated admin interface (`/admin`) and stored directly as structured JSON documents in the Git repository.

```
                  /admin (Browser)
                        │
                        ▼
                DECAP CMS CLIENT
                        │
                        │ Netlify Identity (Private JWT)
                        ▼
                   GIT GATEWAY
                        │
                        │ Authenticated Git Commit / PR
                        ▼
                 GITHUB REPOSITORY
                        │
                        │ Automated Netlify Build & Deploy
                        ▼
                  NETLIFY HOSTING
                        │
                        ▼
                   REACT BUILD
                        │ (import.meta.glob compile-time bundle)
                        ▼
                  PROJECT LOADER
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
     Featured Projects        All Projects
      (Homepage Folders)    (/projects Gallery)
             │                     │
             └──────────┬──────────┘
                        ▼
               Existing Project UI &
               Case Study Modal
```

- **Zero Runtime Database**: No MongoDB, Supabase, Firebase, or SQL databases are needed.
- **Pure Static Performance**: Public visitors get instantaneous static load times with 0 API requests.
- **Git History & Rollbacks**: Every CMS change is a versioned Git commit.

---

## 2. Project Schema

Each project is defined by a single structured JSON schema in `content/projects/<slug>.json`:

```json
{
  "slug": "cubit",
  "title": "Cubit",
  "tagline": "A modern speedcubing platform",
  "shortDescription": "A modern speedcubing platform with timing, training and community.",
  "description": "A modern speedcubing platform with timing, training and community.",
  "year": 2026,
  "status": "published",
  "category": "WEB APP",
  "projectType": "Web app",
  "technologies": ["speedcubing", "community"],
  "role": "Lead Developer",
  "links": {
    "github": "https://github.com/parnilV06/cubit",
    "demo": "https://cubit.parnil.me",
    "documentation": ""
  },
  "media": {
    "cover": "/projects/media/cover.webp",
    "images": [],
    "videos": [],
    "architecture": ""
  },
  "caseStudy": {
    "problem": "",
    "solution": "",
    "features": [],
    "challenges": "",
    "outcome": "",
    "learnings": ""
  },
  "display": {
    "featured": true,
    "featuredOrder": 1,
    "showInProjects": true
  }
}
```

### Schema Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `slug` | String | Yes | Unique URL-safe identifier (e.g. `slottrack`) |
| `title` | String | Yes | Project title (e.g. `SlotTrack`) |
| `tagline` | String | No | Short punchy subhead |
| `shortDescription` | String | Yes | Description shown on folder cards and lists |
| `description` | String | No | Full project overview |
| `year` | Number | Yes | Year (e.g. `2026`) |
| `status` | Select | Yes | `published`, `draft`, or `archived` |
| `category` | Select | Yes | `WEB APP`, `TOOL`, `HACKATHON`, `EXPERIMENT`, `PRACTICE`, `FREELANCE`, `MISC` |
| `projectType` | String | No | Human-readable badge (e.g. `Web app`, `Tool`) |
| `technologies` | Array[String] | Yes | List of technology / topic tags |
| `role` | String | No | Your role on the project |
| `links.github` | String | No | GitHub repository URL |
| `links.demo` | String | No | Live application URL |
| `links.documentation` | String | No | Docs / Case study URL |
| `media.cover` | Image | No | Cover image |
| `media.images` | Array[Image] | No | Screenshots / Gallery |
| `media.videos` | Array[String] | No | Video URLs |
| `media.architecture` | Image | No | Architecture diagram |
| `caseStudy.problem` | String | No | Problem statement |
| `caseStudy.solution` | String | No | Solution overview |
| `caseStudy.features` | Array[String] | No | Highlighted feature list |
| `caseStudy.challenges` | String | No | Technical challenges faced |
| `caseStudy.outcome` | String | No | Measured results / impact |
| `caseStudy.learnings` | String | No | What was learned |
| `display.featured` | Boolean | Yes | `true` to display in Homepage Featured archive |
| `display.featuredOrder` | Number | No | Display order on Homepage (1, 2, 3, 4) |
| `display.showInProjects` | Boolean | Yes | `true` to display on the `/projects` page |

---

## 3. File Locations

- **Project Content**: `content/projects/` (one `.json` file per project).
- **Uploaded Media**: `public/projects/media/` (served at `/projects/media/`).
- **CMS Admin Interface**: `public/admin/index.html`.
- **CMS Configuration**: `public/admin/config.yml`.
- **Data Loader Layer**: `client/lib/projects.ts` & `client/projects.ts`.

---

## 4. How to Access `/admin`

1. Navigate to `https://your-domain.com/admin/` (or `http://localhost:8080/admin/` locally).
2. Click **"Login with GitHub"** via Decap Turbo.
3. Authenticate with your authorized GitHub account.
4. You will be redirected into the Decap CMS Dashboard.

---

## 5. Decap Turbo GitHub Backend Configuration

The portfolio uses **Decap Turbo** for seamless, zero-maintenance GitHub OAuth and direct Git commits:

- **Backend Type**: `turbo-github`
- **Turbo Site ID**: `f60da04b-1e9d-4b9a-a014-8970dbedd1ac`
- **Target Branch**: `main`

With Decap Turbo:
- Direct GitHub OAuth integration without complex serverless functions.
- Secure, token-free browser-based CMS administration.
- Fast, instant sync with your GitHub repository.

---

## 6. How to Add, Edit, Publish, and Archive Projects

### Adding a Project
1. In the CMS (`/admin`), click **"New Project"**.
2. Fill in the fields (Title, Slug, Short Description, Category, Technologies, etc.).
3. Under **Display Settings**:
   - Set **Featured on Home** to `true` if you want it on the homepage archive.
   - Set **Featured Order** (e.g. `1`, `2`, `3`, `4`).
   - Ensure **Show in All Projects** is `true`.
4. Click **Publish** (or **Save** to save as Draft).

### Editing a Project
1. In the CMS list, click on any existing project.
2. Make your edits.
3. Click **Publish**.

### Drafts vs Published
- Projects with `status: "draft"` or `status: "archived"` are automatically excluded from the public portfolio.
- Projects with `status: "published"` appear in the portfolio as soon as the site builds.

### Archiving a Project
- Change `status` to `archived` or set `display.showInProjects` to `false`.

---

## 7. Featured Projects & Order

The homepage Featured Projects section displays the 4 physical folder items.

- The selection is controlled by `display.featured === true`.
- The display order from top to bottom is controlled by `display.featuredOrder` (1, 2, 3, 4).
- The existing 4 featured projects are configured as:
  1. **Cubit** (`featuredOrder: 1`)
  2. **SlotTrack** (`featuredOrder: 2`)
  3. **TW-Builder** (`featuredOrder: 3`)
  4. **TypeCraft** (`featuredOrder: 4`)

---

## 8. All Projects Gallery (`/projects`)

The `/projects` page displays all published projects (`status: "published"` and `display.showInProjects: true`).
- Search and Category filters (`Web Apps`, `Tools`, `Hackathons`, `Others`) match dynamically against `category` and search terms.
- Clicking any project folder opens the full Case Study dialog.

---

## 9. Local Development

You can test the portfolio locally with:

```bash
# Start local development server
npm run dev
```

### Local CMS Testing with Decap Local Backend (Optional)
If you want to edit content locally in `/admin` without connecting to Netlify Identity:
1. In `public/admin/config.yml`, add `local_backend: true` (or set during local testing).
2. Run `npx decap-server` in a separate terminal.
3. Visit `http://localhost:8080/admin/`.

---

## 10. Security & Privacy

- **No Public Registration**: Registration is set to Invite Only in Netlify Identity.
- **Zero Secrets in Frontend**: Git Gateway handles commits on the server side using Netlify's OAuth token; no GitHub Personal Access Tokens are bundled into client code.
- **Input Sanitization**: Content is rendered via React's standard text escapement, preventing XSS.
- **No-Index Admin**: `public/admin/index.html` has `<meta name="robots" content="noindex" />` to prevent search engine indexing.

---

## 11. Troubleshooting

- **Admin shows 404 on Netlify**: Ensure `netlify.toml` has `publish = "dist/spa"` and the build script is `npm run build:client`. The build automatically copies `public/admin/` to `dist/spa/admin/`.
- **Identity invite link doesn't open modal**: The Netlify Identity widget script in `index.html` intercepts `#invite_token=` and `#recovery_token=` hashes and opens the confirmation modal.
- **Image not appearing**: Verify image was uploaded through the CMS or placed in `public/projects/media/` and referenced with `/projects/media/<filename>`.
