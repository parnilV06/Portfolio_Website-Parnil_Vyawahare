import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { PROJECTS, type Project, formatLiveUrlLabel } from "@/projects";

type ProjectFilter = "All" | "Web Apps" | "Tools" | "Hackathons" | "Others";

const FILTERS: ProjectFilter[] = ["All", "Web Apps", "Tools", "Hackathons", "Others"];

function matchesFilter(project: Project, filter: ProjectFilter) {
  if (filter === "All") return true;
  if (filter === "Web Apps") return project.category === "WEB APP";
  if (filter === "Tools") return project.category === "TOOL";
  if (filter === "Hackathons") return project.category === "HACKATHON";
  return !["WEB APP", "TOOL", "HACKATHON"].includes(project.category);
}

function FolderCard({ project, onOpen }: { project: Project; onOpen: (project: Project, trigger: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      className="all-project-card cursor-can-hover"
      data-cursor-kind="card"
      title={`Open ${project.title} project details`}
      aria-label={`Open ${project.title} project details`}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(project, event.currentTarget)}
      style={{ "--project-folder-color": project.folderColor } as CSSProperties}
    >
      <span className="all-project-tab" aria-hidden="true" />
      <span className="all-project-face">
        <span className="all-project-topline">
          <span>{project.number}</span>
          <span className="all-project-cyan-line" aria-hidden="true" />
        </span>
        <strong>{project.title}</strong>
        <span className="all-project-description">{project.description}</span>
        <span className="all-project-meta">
          <small>{project.category}</small>
          <span aria-hidden="true">↗</span>
        </span>
      </span>
    </button>
  );
}

function ProjectDetailDialog({
  project,
  dialogRef,
  onClose,
}: {
  project: Project | null;
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="all-project-dialog"
      aria-labelledby="all-project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="all-project-dialog-inner">
          <button type="button" className="all-project-dialog-close cursor-can-hover"
            data-cursor-kind="small" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
          </button>
          <p className="all-project-dialog-eyebrow">Project / {project.number}</p>
          <h2 id="all-project-dialog-title">{project.title}</h2>
          <p className="all-project-dialog-description">{project.tagline || project.description}</p>
          <div className="all-project-dialog-rule" aria-hidden="true" />
          <div className="all-project-dialog-sections">
            {(project.overview || project.description) && (
              <section>
                <h3>What it is</h3>
                <p>{project.overview || project.description}</p>
              </section>
            )}
            {project.problem && (
              <section>
                <h3>The problem</h3>
                <p>{project.problem}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h3>The solution</h3>
                <p>{project.solution}</p>
              </section>
            )}
            {project.features && project.features.length > 0 && (
              <section>
                <h3>Key features</h3>
                <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                  {project.features.map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: "0.25rem" }}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}
            {(project.contribution || project.role) && (
              <section>
                <h3>My contribution</h3>
                <p>{project.contribution || project.role}</p>
              </section>
            )}
            {(project.challenges || project.process) && (
              <section>
                <h3>Technical challenges</h3>
                <p>{project.challenges || project.process}</p>
              </section>
            )}
            {project.outcome && (
              <section>
                <h3>Outcome</h3>
                <p>{project.outcome}</p>
              </section>
            )}
            {project.learnings && (
              <section>
                <h3>Learnings</h3>
                <p>{project.learnings}</p>
              </section>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <section>
                <h3>Technologies</h3>
                <p>{project.technologies.join(" · ")}</p>
              </section>
            )}
            {((project.videos && project.videos.length > 0) || (project.images && project.images.length > 0)) && (
              <section>
                <h3>Project Media</h3>
                {project.videos && project.videos.length > 0 && (
                  <div style={{ marginBottom: project.images && project.images.length > 0 ? "16px" : "0" }}>
                    {project.videos.map((vid, idx) => (
                      <video
                        key={idx}
                        src={vid}
                        controls
                        playsInline
                        className="case-dialog-video"
                      />
                    ))}
                  </div>
                )}
                {project.images && project.images.length > 0 && (
                  <div className="case-dialog-media-grid">
                    {project.images.map((img, idx) => (
                      <div key={idx} className="case-dialog-media-item">
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          loading="lazy"
                          className="case-dialog-media-img"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
            {(project.liveUrl || project.githubUrl) && (
              <section>
                <h3>Links</h3>
                <p style={{ display: "flex", gap: "16px", flexWrap: "wrap", margin: "4px 0 0" }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                      data-cursor-kind="small"
                      style={{ color: "var(--accent, #00FFF5)", textDecoration: "underline" }}
                    >
                      {formatLiveUrlLabel(project.liveUrl, project.id)} ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                      data-cursor-kind="small"
                      style={{ color: "var(--accent, #00FFF5)", textDecoration: "underline" }}
                    >
                      GitHub Repository ↗
                    </a>
                  )}
                </p>
              </section>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [query, setQuery] = useState("");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesSearch = normalizedQuery.length === 0
        || `${project.title} ${project.description}`.toLowerCase().includes(normalizedQuery);
      return matchesFilter(project, activeFilter) && matchesSearch;
    });
  }, [activeFilter, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openProject && !dialog.open) dialog.showModal();
    if (!openProject && dialog.open) dialog.close();
  }, [openProject]);

  useEffect(() => {
    document.body.classList.toggle("case-dialog-open", Boolean(openProject));
    return () => document.body.classList.remove("case-dialog-open");
  }, [openProject]);

  const closeDialog = () => {
    setOpenProject(null);
    if (dialogRef.current?.open) dialogRef.current.close();
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const openDialog = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setOpenProject(project);
  };

  return (
    <div className="portfolio-site all-projects-shell">
      <header className="site-header portfolio-nav">
        <a className="wordmark cursor-can-hover" data-cursor-kind="small" href="/" aria-label="parnil. home">
          parnil<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="cursor-can-hover" data-cursor-kind="nav" href="/#work">Work</a>
          <a className="cursor-can-hover" data-cursor-kind="nav" href="/#about">About</a>
          <a className="cursor-can-hover" data-cursor-kind="nav" href="/#skills">Skills</a>
          <a className="nav-contact cursor-can-hover" data-cursor-kind="nav" href="/#contact">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main className="all-projects-page" aria-labelledby="all-projects-heading">
        <div className="all-projects-inner">
          <div className="all-projects-top-nav">
            <a
              href="/#work"
              className="all-projects-back-btn cursor-can-hover"
              data-cursor-kind="small"
              aria-label="Return to portfolio"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Portfolio</span>
            </a>
          </div>

          <div className="all-projects-heading-row">
            <div>
              <p className="all-projects-kicker"><span aria-hidden="true">/</span> PROJECTS</p>
              <h1 id="all-projects-heading">All <em>Projects.</em></h1>
              <p className="all-projects-intro">A collection of things I&apos;ve built, explored, and shipped.</p>
            </div>
            <p className="all-projects-annotation">IDEAS<br />IN FOLDERS.<span aria-hidden="true" /></p>
          </div>

          <div className="all-projects-controls">
            <div className="project-filters" role="group" aria-label="Filter projects">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`cursor-can-hover ${activeFilter === filter ? "is-selected" : ""}`}
                  data-cursor-kind="small"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <label className="project-search">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Search projects</span>
              <input
                className="cursor-can-hover"
                data-cursor-kind="input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects..."
              />
            </label>
          </div>

          <div className="all-projects-grid" aria-live="polite">
            {visibleProjects.map((project) => (
              <FolderCard key={project.id} project={project} onOpen={openDialog} />
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <p className="no-projects-message">No projects match this filter.</p>
          )}

          <footer className="all-projects-footer">
            <p>BUILD&nbsp;&nbsp; / &nbsp;&nbsp;EXPLORE&nbsp;&nbsp; / &nbsp;&nbsp;REPEAT</p>
            <p><span aria-hidden="true" />04</p>
          </footer>
        </div>
      </main>
      <ProjectDetailDialog project={openProject} dialogRef={dialogRef} onClose={closeDialog} />
    </div>
  );
}
