/**
 * Project Data Entry Point
 * Single source of truth dynamically backed by Decap CMS /content/projects JSON schema.
 */

import {
  getPublishedProjects,
  getFeaturedProjects,
  getAllProjectSchemas,
  getProjectBySlug,
  formatLiveUrlLabel,
  type Project,
  type ProjectCategory,
  type ProjectSchema,
} from "./lib/projects";

export type { Project, ProjectCategory, ProjectSchema };
export {
  getPublishedProjects,
  getFeaturedProjects,
  getAllProjectSchemas,
  getProjectBySlug,
  formatLiveUrlLabel,
};

export const PROJECTS: Project[] = getPublishedProjects();
export const FEATURED_PROJECTS: Project[] = getFeaturedProjects();
