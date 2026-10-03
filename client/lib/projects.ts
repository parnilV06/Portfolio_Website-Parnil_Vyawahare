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
  contribution?: string;
  process?: string;
  outcome?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  images?: string[];
}

const FOLDER_COLORS = ["#171717", "#1a1a1a", "#141414", "#1d1d1d", "#181818"];

// Curated folder titles for known projects to guarantee 100% visual consistency
const KNOWN_FOLDER_TITLES: Record<string, [string, string]> = {
  cubit: ["Cu", "bit"],
  slottrack: ["Slot", "Track"],
  "tw-builder": ["TW-", "Builder"],
  typecraft: ["Type", "Craft"],
  assetflow: ["Asset", "Flow"],
  claire: ["Cl", "aire"],
  jams: ["JA", "MS"],
  "nike-clone": ["Nike", "Clone"],
  "painganga-publications": ["Painganga", "Pub."],
  "moltsteine-files": ["Molt", "Steine"],
  "sih-bitcoin-analyzer": ["SIH", "Bitcoin"],
  nutriscope: ["Nutri", "Scope"],
  leetlibrary: ["Leet", "Library"],
  "kalvium-extension": ["Kalvium", "Ext."],
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
    description: schema.shortDescription || schema.description || "",
    category: (schema.category as ProjectCategory) || "MISC",
    tags: schema.technologies || [],
    featured: Boolean(schema.display?.featured),
    type: schema.projectType || schema.category || "Project",
    folderColor,
    folderTitle,
    overview: schema.description || schema.shortDescription,
    problem: schema.caseStudy?.problem,
    solution: schema.caseStudy?.solution,
    contribution: schema.role,
    process: schema.caseStudy?.challenges,
    outcome: schema.caseStudy?.outcome,
    technologies: schema.technologies,
    liveUrl: schema.links?.demo,
    githubUrl: schema.links?.github,
    images: schema.media?.images,
  };
}

/**
 * Get all published projects formatted for UI components (e.g. All Projects page).
 */
export function getPublishedProjects(): Project[] {
  const published = getPublishedProjectSchemas().filter(
    (project) => project.display?.showInProjects !== false
  );

  // Sort: featured projects in their featured order first, then others by year/order
  const featured = published
    .filter((p) => p.display?.featured)
    .sort((a, b) => (a.display?.featuredOrder ?? 999) - (b.display?.featuredOrder ?? 999));

  const nonFeatured = published.filter((p) => !p.display?.featured);

  const combined = [...featured, ...nonFeatured];

  return combined.map((schema, index) => transformToUIProject(schema, index));
}

/**
 * Get featured projects formatted for the Featured Projects section on the Home page.
 */
export function getFeaturedProjects(): Project[] {
  return getFeaturedProjectSchemas().map((schema, index) =>
    transformToUIProject(schema, index)
  );
}
