/**
 * Project Data Architecture & Content Loader
 * Dynamically loads and validates project content from /content/projects/*.json
 * Supports Decap CMS schema while seamlessly powering existing UI components.
 */

export interface ProjectLinks {
  github?: string;
  demo?: string;
  documentation?: string;
}

export interface ProjectMedia {
  cover?: string;
  images?: string[];
  videos?: string[];
  architecture?: string;
}

export interface ProjectCaseStudy {
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: string;
  outcome?: string;
  learnings?: string;
}

export interface ProjectDisplay {
  featured?: boolean;
  featuredOrder?: number | null;
  showInProjects?: boolean;
}

export interface ProjectSchema {
  slug: string;
  title: string;
  tagline?: string;
  shortDescription: string;
  description?: string;
  year: number;
  status: "published" | "draft" | "archived";
  category: "WEB APP" | "TOOL" | "HACKATHON" | "EXPERIMENT" | "PRACTICE" | "FREELANCE" | "MISC" | string;
  projectType?: string;
  technologies: string[];
  role?: string;
  links?: ProjectLinks;
  media?: ProjectMedia;
  caseStudy?: ProjectCaseStudy;
  display?: ProjectDisplay;
}

export type ProjectCategory =
  | "WEB APP"
  | "TOOL"
  | "HACKATHON"
  | "EXPERIMENT"
  | "PRACTICE"
  | "FREELANCE"
  | "MISC";

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline?: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  type: string;
  folderColor: string;
  folderTitle: [string, string];
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  contribution?: string;
  role?: string;
  process?: string;
  challenges?: string;
  outcome?: string;
  learnings?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  cover?: string;
  images?: string[];
  videos?: string[];
}

const FOLDER_COLORS = ["#171717", "#1a1a1a", "#141414", "#1d1d1d", "#181818"];

// Curated folder titles for known projects to guarantee 100% visual consistency
const KNOWN_FOLDER_TITLES: Record<string, [string, string]> = {
  cubit: ["Cu", "bit"],
  "cubit-js": ["Cu", "bit.js"],
  slottrack: ["Slot", "Track"],
  "tw-builder": ["TW-", "Builder"],
  typecraft: ["Type", "Craft"],
  assetflow: ["Asset", "Flow"],
  "moltstein-files": ["Molt", "Stein"],
  "expense-tracker": ["Expense", "Tracker"],
  "leetcode-question-tracker": ["Leet", "Code"],
  "coderecall-ai": ["Code", "Recall"],
  "kalvium-video-generator": ["Kalvium", "Video"],
  swarveda: ["Swar", "Veda"],
  claire: ["Cl", "aire"],
  bittrack: ["Bit", "Track"],
  bittrace: ["Bit", "Trace"],
  jams: ["JA", "MS"],
  "nike-clone": ["Nike", "Clone"],
  "whack-a-mole": ["Whack", "A-Mole"],
  "painganga-publications": ["Painganga", "Pub."],
  spotshare: ["Spot", "Share"],
  timewizard: ["Time", "Wizard"],
  nutriscope: ["Nutri", "Scope"],
  leetlibrary: ["Leet", "Library"],
  lifeline: ["Life", "Line"],
  "marg-journal": ["M.A.R.G", "Journal"],
  "shabdsanchay-journal": ["Shabd", "sanchay"],
};

function generateFolderTitle(slug: string, title: string): [string, string] {
  if (KNOWN_FOLDER_TITLES[slug]) {
    return KNOWN_FOLDER_TITLES[slug];
  }
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" ")];
  }
  const mid = Math.ceil(title.length / 2);
  return [title.slice(0, mid), title.slice(mid)];
}

// Load all project JSON files at build/bundle time with Vite's glob import
const projectModules = import.meta.glob<ProjectSchema>("../../content/projects/*.json", {
  eager: true,
  import: "default",
});

/**
 * Retrieve all raw project records from the content store.
 */
export function getAllProjectSchemas(): ProjectSchema[] {
  return Object.values(projectModules).filter(
    (project): project is ProjectSchema => Boolean(project && project.slug && project.title)
  );
}

/**
 * Retrieve all published project schemas.
 */
export function getPublishedProjectSchemas(): ProjectSchema[] {
  return getAllProjectSchemas().filter((project) => project.status === "published");
}

/**
 * Retrieve a project schema by its slug.
 */
export function getProjectBySlug(slug: string): ProjectSchema | undefined {
  return getAllProjectSchemas().find((project) => project.slug === slug);
}

/**
 * Retrieve published projects marked as featured, ordered by featuredOrder.
 */
export function getFeaturedProjectSchemas(): ProjectSchema[] {
  return getPublishedProjectSchemas()
    .filter((project) => project.display?.featured === true)
    .sort((a, b) => {
      const orderA = a.display?.featuredOrder ?? 999;
      const orderB = b.display?.featuredOrder ?? 999;
      return orderA - orderB;
    });
}

/**
 * Transform a ProjectSchema to the Project UI interface used across the portfolio.
 */
export function transformToUIProject(schema: ProjectSchema, index: number): Project {
  const number = String(index + 1).padStart(2, "0");
  const folderColor = FOLDER_COLORS[index % FOLDER_COLORS.length];
  const folderTitle = generateFolderTitle(schema.slug, schema.title);

  return {
    id: schema.slug,
    number,
    title: schema.title,
    tagline: schema.tagline,
    description: schema.shortDescription || schema.description || "",
    category: (schema.category as ProjectCategory) || "MISC",
    tags: schema.technologies || [],
    featured: Boolean(schema.display?.featured),
    type: schema.projectType || schema.category || "Project",
    folderColor,
    folderTitle,
    overview: schema.description || schema.shortDescription,
    problem: schema.caseStudy?.problem || undefined,
    solution: schema.caseStudy?.solution || undefined,
    features: schema.caseStudy?.features && schema.caseStudy.features.length > 0 ? schema.caseStudy.features : undefined,
    contribution: schema.role || undefined,
    role: schema.role || undefined,
    process: schema.caseStudy?.challenges || undefined,
    challenges: schema.caseStudy?.challenges || undefined,
    outcome: schema.caseStudy?.outcome || undefined,
    learnings: schema.caseStudy?.learnings || undefined,
    technologies: schema.technologies && schema.technologies.length > 0 ? schema.technologies : undefined,
    liveUrl: schema.links?.demo || undefined,
    githubUrl: schema.links?.github || undefined,
    documentationUrl: schema.links?.documentation || undefined,
    cover: schema.media?.cover || undefined,
    images: schema.media?.images && schema.media.images.length > 0 ? schema.media.images : undefined,
    videos: schema.media?.videos && schema.media.videos.length > 0 ? schema.media.videos : undefined,
  };
}

// Explicit custom ordering for All Projects section
const ALL_PROJECTS_ORDER: string[] = [
  "cubit",
  "slottrack",
  "typecraft",
  "claire",
  "tw-builder",
  "bittrace",
  "cubit-js",
  "marg-journal",
  "shabdsanchay-journal",
  "lifeline",
  "assetflow",
  "moltstein-files",
  "jams",
  "spotshare",
  "timewizard",
  "whack-a-mole",
  "swarveda",
  "coderecall-ai",
  "leetcode-question-tracker",
  "kalvium-video-generator",
  "expense-tracker",
  "nike-clone",
];

/**
 * Get all published projects formatted for UI components (e.g. All Projects page).
 */
export function getPublishedProjects(): Project[] {
  const published = getPublishedProjectSchemas().filter(
    (project) => project.display?.showInProjects !== false
  );

  const sorted = [...published].sort((a, b) => {
    const indexA = ALL_PROJECTS_ORDER.indexOf(a.slug);
    const indexB = ALL_PROJECTS_ORDER.indexOf(b.slug);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  return sorted.map((schema, index) => transformToUIProject(schema, index));
}

/**
 * Get featured projects formatted for the Featured Projects section on the Home page.
 */
export function getFeaturedProjects(): Project[] {
  return getFeaturedProjectSchemas().map((schema, index) =>
    transformToUIProject(schema, index)
  );
}

/**
 * Format live link label for display (custom domains for production sites, npm package, or Live Demo).
 */
export function formatLiveUrlLabel(url: string, projectSlug?: string): string {
  if (projectSlug === "cubit") return "cubit.is-cool.dev";
  if (projectSlug === "marg-journal") return "margjournal.com";
  if (projectSlug === "shabdsanchay-journal") return "shabdsanchay.co.in";
  if (projectSlug === "cubit-js" || url.includes("npmjs.com")) return "npm Package";
  return "Live Demo";
}

