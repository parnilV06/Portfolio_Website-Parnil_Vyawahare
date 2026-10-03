import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { PROJECTS, type Project } from "@/projects";

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
          <p className="all-project-dialog-description">{project.description}</p>
          <div className="all-project-dialog-rule" aria-hidden="true" />
          <div className="all-project-dialog-sections">
            <section>
              <h3>What it is</h3>
              <p>Placeholder project overview. Detailed project information will be added later.</p>
            </section>
            <section>
              <h3>The problem</h3>
              <p>Placeholder problem statement. The real project context will be added later.</p>
            </section>
            <section>
              <h3>The solution</h3>
              <p>Placeholder solution description. The documented approach will be added later.</p>
            </section>
            <section>
              <h3>My contribution</h3>
              <p>Placeholder contribution details. Project-specific responsibilities will be added later.</p>
            </section>
            <section>
              <h3>Process &amp; outcome</h3>
              <p>Placeholder process and outcome. Final notes will be added later.</p>
            </section>
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
