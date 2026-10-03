import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Braces, Code2, Database, Server, Wrench } from "lucide-react";
import { FEATURED_PROJECTS, type Project, formatLiveUrlLabel } from "@/projects";

type PopoverKind = "resume" | "process";
type KeyAction =
  | { type: "section"; target: string }
  | { type: "route"; href: string }
  | { type: "popover"; popover: PopoverKind };

type PortfolioKey = {
  id: string;
  letter: string;
  caption: string;
  face: string;
  base: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  className?: string;
  action: KeyAction;
};

const CONTACT_EMAIL = "06.v.parrnil@gmail.com";
const CONTACT_PHONE = "+91 96078 06226";
const CONTACT_PHONE_HREF = "+919607806226";
const MARQUEE_MESSAGE = "Build. Learn. Ship. Repeat. · Coding up to the Future!";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    description: "Start with the problem, the users, and what actually needs to be built.",
  },
  {
    number: "02",
    title: "Design",
    description: "Shape the structure, interaction, and visual direction before overbuilding.",
  },
  {
    number: "03",
    title: "Build",
    description: "Turn the idea into a working product with clean, practical implementation.",
  },
  {
    number: "04",
    title: "Test",
    description: "Try it, break it, refine it, and make sure it actually works.",
  },
  {
    number: "05",
    title: "Improve",
    description: "Keep learning from the result and make the next iteration better.",
  },
];

// Synthesized mechanical key switch click sound via Web Audio API
let mechanicalAudioCtx: AudioContext | null = null;

function playMechanicalKeyClick() {
  try {
    if (!mechanicalAudioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      mechanicalAudioCtx = new AudioCtx();
    }
    if (mechanicalAudioCtx.state === "suspended") {
      mechanicalAudioCtx.resume();
    }

    const now = mechanicalAudioCtx.currentTime;

    // 1. High frequency crisp tactile snap
    const snapOsc = mechanicalAudioCtx.createOscillator();
    const snapGain = mechanicalAudioCtx.createGain();
    const snapFilter = mechanicalAudioCtx.createBiquadFilter();

    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(3400, now);
    snapOsc.frequency.exponentialRampToValueAtTime(700, now + 0.016);

    snapFilter.type = "highpass";
    snapFilter.frequency.setValueAtTime(1400, now);

    snapGain.gain.setValueAtTime(0.24, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    snapOsc.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(mechanicalAudioCtx.destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.02);

    // 2. Low-mid mechanical thock bottom-out body
    const thockOsc = mechanicalAudioCtx.createOscillator();
    const thockGain = mechanicalAudioCtx.createGain();

    thockOsc.type = "sine";
    thockOsc.frequency.setValueAtTime(190, now);
    thockOsc.frequency.exponentialRampToValueAtTime(55, now + 0.038);

    thockGain.gain.setValueAtTime(0.3, now);
    thockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    thockOsc.connect(thockGain);
    thockGain.connect(mechanicalAudioCtx.destination);

    thockOsc.start(now);
    thockOsc.stop(now + 0.045);
  } catch {
    // Graceful fallback if AudioContext is blocked
  }
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-to-top cursor-can-hover"
      data-cursor-kind="small"
      onClick={scrollToTop}
      aria-label="Return to top of page"
    >
      <span className="scroll-to-top-arrow" aria-hidden="true">↑</span>
      <span className="scroll-to-top-text">Return to top</span>
    </button>
  );
}

const KEYS: PortfolioKey[] = [
  {
    id: "p",
    letter: "P",
    caption: "FEATURED WORK",
    face: "#151515",
    base: "#0d0d0d",
    x: 73,
    y: 0,
    className: "key-top",
    action: { type: "section", target: "work" },
  },
  {
    id: "upper-o",
    letter: "O",
    caption: "ABOUT ME",
    face: "#151515",
    base: "#0d0d0d",
    x: 219,
    y: 0,
    className: "key-top",
    action: { type: "section", target: "about" },
  },
  {
    id: "r",
    letter: "R",
    caption: "RESUME",
    face: "#151515",
    base: "#0d0d0d",
    x: 365,
    y: 0,
    className: "key-top",
    action: { type: "popover", popover: "resume" },
  },
  {
    id: "t",
    letter: "T",
    caption: "SKILLS",
    face: "#151515",
    base: "#0d0d0d",
    x: 511,
    y: 0,
    className: "key-top",
    action: { type: "section", target: "skills" },
  },
  {
    id: "f",
    letter: "F",
    caption: "EXPERIENCE",
    face: "#151515",
    base: "#0d0d0d",
    x: 0,
    y: 139,
    className: "key-lower",
    action: { type: "section", target: "experience" },
  },
  {
    id: "lower-o",
    letter: "O",
    caption: "EDUCATION",
    face: "#151515",
    base: "#0d0d0d",
    x: 146,
    y: 139,
    className: "key-lower",
    action: { type: "section", target: "education" },
  },
  {
    id: "l",
    letter: "L",
    caption: "ALL PROJECTS",
    face: "#151515",
    base: "#0d0d0d",
    x: 292,
    y: 139,
    className: "key-lower",
    action: { type: "route", href: "/projects" },
  },
  {
    id: "i",
    letter: "I",
    caption: "MY PROCESS",
    face: "#151515",
    base: "#0d0d0d",
    x: 438,
    y: 139,
    className: "key-lower",
    action: { type: "popover", popover: "process" },
  },
  {
    id: "final-o",
    letter: "O",
    caption: "CONTACT ME",
    face: "#151515",
    base: "#0d0d0d",
    x: 584,
    y: 139,
    className: "key-lower key-final-o",
    action: { type: "section", target: "contact" },
  },
  {
    id: "enter",
    letter: "↵",
    caption: "LET’S TALK",
    face: "#151515",
    base: "#0d0d0d",
    x: 657,
    y: 0,
    width: 218,
    height: 300,
    className: "key-enter",
    action: { type: "section", target: "contact" },
  },
];

type ProjectId = Project["id"];

const FOLDER_CLASSES = [
  "folder-01",
  "folder-02",
  "folder-03",
  "folder-04",
] as const;

type ExperienceId = "painganga" | "geeksforgeeks";

type Experience = {
  id: ExperienceId;
  number: string;
  title: string;
  organization: string;
  date: string;
  shortDescription: string;
  detail: string;
  technologies?: string[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "painganga",
    number: "01",
    title: "Web Developer & Digital Manager",
    organization: "Painganga Publication · Freelance",
    date: "Nov 2024 – Present",
    shortDescription: "Building and managing production publishing platforms and digital workflows for research journals.",
    detail: "I design, develop, deploy, and maintain the digital platforms for Shabdsanchay Journal and M.A.R.G. (Mehkary Analysis and Research Gazette). My work covers the complete lifecycle of the websites and publishing workflows, including UI development, paper submission flows, issue publishing, certificate downloads, researcher interactions, troubleshooting, and ongoing maintenance.\n\nI work with Wix Studio, WordPress, HTML, CSS, JavaScript, Hostinger, SEO, and custom workflow automation, while also handling digital operations and publication-related requirements. The platforms currently support 100+ monthly visits, 20–30 active users, 15+ journal issues, and hundreds of research paper publications.",
    technologies: ["Wix Studio", "WordPress", "HTML", "CSS", "JavaScript", "Hostinger", "SEO", "Workflow Automation"],
  },
  {
    id: "geeksforgeeks",
    number: "02",
    title: "Tech Team Lead",
    organization: "GeekforGeeks Student Chapter, MIT ADT",
    date: "Aug 2026 – Present",
    shortDescription: "Leading technical initiatives and helping drive development-focused activities within the student chapter.",
    detail: "As Tech Team Lead, I work on the chapter's technical initiatives, development activities, and student-focused technology projects. I help coordinate technical work within the team, contribute to planning and execution of development-focused activities, and support members in turning ideas into practical implementations.\n\nThe role also involves technical collaboration, mentoring, problem-solving, and contributing to the chapter's developer community, with a focus on creating opportunities for students to learn by building and working with real development workflows.",
  },
];

type Skill = {
  name: string;
  level?: string;
};

type SkillCategory = {
  number: string;
  label: string;
  skills: Skill[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: "01",
    label: "FRONTEND",
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"].map((name) => ({ name })),
  },
  {
    number: "02",
    label: "BACKEND",
    skills: ["Node.js", "Express.js", "REST APIs", "Next.js App Router"].map((name) => ({ name })),
  },
  {
    number: "03",
    label: "DATABASE",
    skills: ["PostgreSQL", "MongoDB", "Prisma ORM", "Neon"].map((name) => ({ name })),
  },
  {
    number: "04",
    label: "TOOLS & TECHNOLOGIES",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Zustand",
      "Zod",
      "Jest",
      "React Testing Library",
      "Socket.IO",
      "NextAuth",
      "JWT",
      "OAuth",
      "Vercel",
      "Netlify",
      "MDX",
    ].map((name) => ({ name })),
  },
  {
    number: "05",
    label: "LANGUAGES",
    skills: [
      { name: "C++", level: "Advanced" },
      { name: "Java", level: "Intermediate" },
      { name: "JavaScript" },
      { name: "Python", level: "Basic" },
      { name: "Dart" },
    ],
  },
];

const SKILL_CATEGORY_ICONS = [Code2, Server, Database, Wrench, Braces];

const SKILL_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  FRONTEND: "Building responsive, interactive interfaces with clean, scalable patterns.",
  BACKEND: "Connecting applications through dependable services and APIs.",
  DATABASE: "Organizing application data with practical, modern tooling.",
  "TOOLS & TECHNOLOGIES": "The tools and libraries I use to build, test, and ship.",
  LANGUAGES: "Languages I use across web, software, and application development.",
};

function getSkillSectorPath(index: number) {
  const center = 360;
  const outerRadius = 342;
  const innerRadius = 76;
  const middleAngle = -90 + index * 72;
  const startAngle = ((middleAngle - 36) * Math.PI) / 180;
  const endAngle = ((middleAngle + 36) * Math.PI) / 180;
  const point = (radius: number, angle: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  });
  const outerStart = point(outerRadius, startAngle);
  const outerEnd = point(outerRadius, endAngle);
  const innerEnd = point(innerRadius, endAngle);
  const innerStart = point(innerRadius, startAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !context) return;

    type Dot = {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      red: number;
      green: number;
      blue: number;
      cyan: boolean;
      activity: number;
      phase: number;
      depth: number;
    };

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, active: false };
    const palette = [
      [111, 111, 111],
      [138, 138, 138],
      [166, 166, 166],
    ];
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let animationStart = 0;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = width < 620 ? 40 : width < 1000 ? 68 : 104;
      dots = Array.from({ length: count }, () => {
        const region = Math.random();
        const baseX = region < 0.28
          ? width * (0.12 + Math.random() * 0.5)
          : region < 0.68
            ? width * (0.36 + Math.random() * 0.4)
            : width * (0.62 + Math.random() * 0.34);
        const baseY = height * (
          region < 0.28
            ? 0.04 + Math.random() * 0.74
            : 0.08 + Math.random() * 0.82
        );
        const depth = 0.25 + Math.random() * 0.75;
        const size = Math.random();
        const radius = size < 0.45
          ? 0.95 + Math.random() * 0.5
          : size < 0.85
            ? 1.55 + Math.random() * 0.65
            : 2.35 + Math.random() * 0.75;
        const cyan = Math.random() < 0.08;
        const [red, green, blue] = palette[Math.floor(Math.random() * palette.length)];
        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radius: radius * (0.82 + depth * 0.32),
          opacity: 0.2 + depth * 0.24,
          red,
          green,
          blue,
          cyan,
          activity: 0,
          phase: Math.random() * Math.PI * 2,
          depth,
        };
      });

      pointer.x = width * 0.74;
      pointer.y = height * 0.52;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const elapsed = time - animationStart;
      const canMove = !reducedMotion;
      const delta = lastFrame ? Math.min(2, (time - lastFrame) / 16.67) : 1;
      lastFrame = time;
      let pointerSpeed = 0;

      if (canMove) {
        const previousX = pointer.x;
        const previousY = pointer.y;
        const easing = 1 - Math.pow(0.82, delta);
        pointer.x += (pointer.targetX - pointer.x) * easing;
        pointer.y += (pointer.targetY - pointer.y) * easing;
        pointer.vx = (pointer.x - previousX) / delta;
        pointer.vy = (pointer.y - previousY) / delta;
        pointerSpeed = Math.min(18, Math.hypot(pointer.vx, pointer.vy));
      }

      const mobile = width < 620;
      const radius = mobile
        ? Math.max(120, Math.min(width, height) * 0.48)
        : Math.max(250, Math.min(400, width * 0.32));
      const damping = Math.pow(0.9, delta);

      for (const dot of dots) {
        const driftX = canMove ? Math.sin(elapsed * 0.00016 + dot.phase) * 2.2 * dot.depth : 0;
        const driftY = canMove ? Math.cos(elapsed * 0.00013 + dot.phase) * 1.8 * dot.depth : 0;
        const restX = dot.baseX + driftX;
        const restY = dot.baseY + driftY;
        let ax = canMove ? (restX - dot.x) * 0.008 : 0;
        let ay = canMove ? (restY - dot.y) * 0.008 : 0;
        let influence = 0;

        if (canMove && pointer.active) {
          const dx = pointer.x - dot.x;
          const dy = pointer.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const edge = Math.max(0, 1 - distance / radius);
          influence = edge * edge * (3 - 2 * edge);

          if (influence > 0 && distance > 0.01) {
            const directionX = dx / distance;
            const directionY = dy / distance;
            const pull = influence * (0.38 + dot.depth * 0.2);
            const tangent = influence * (0.12 + pointerSpeed * 0.012) * (dot.phase < Math.PI ? 1 : -1);
            ax += directionX * pull - directionY * tangent + pointer.vx * influence * 0.045;
            ay += directionY * pull + directionX * tangent + pointer.vy * influence * 0.045;

            const innerRadius = 30 + dot.radius * 8;
            if (distance < innerRadius) {
              const repel = (1 - distance / innerRadius) * 0.85;
              ax -= directionX * repel;
              ay -= directionY * repel;
            }
          }
        }

        dot.activity += (influence - dot.activity) * (influence > dot.activity ? 0.14 : 0.055) * delta;
        dot.vx = (dot.vx + ax * delta) * damping;
        dot.vy = (dot.vy + ay * delta) * damping;
        const maxSpeed = mobile ? 5.5 : 8;
        const speed = Math.hypot(dot.vx, dot.vy);
        if (speed > maxSpeed) {
          dot.vx = (dot.vx / speed) * maxSpeed;
          dot.vy = (dot.vy / speed) * maxSpeed;
        }
        dot.x += dot.vx * delta;
        dot.y += dot.vy * delta;

        const tint = Math.min(dot.cyan ? 0.82 : 0.64, dot.activity * (dot.cyan ? 0.95 : 0.76));
        const red = Math.round(dot.red * (1 - tint));
        const green = Math.round(dot.green * (1 - tint) + 255 * tint);
        const blue = Math.round(dot.blue * (1 - tint) + 245 * tint);
        context.globalAlpha = dot.opacity * (1 + dot.activity * 0.6);
        context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        if (dot.activity > 0.16) {
          context.shadowColor = `rgba(0, 255, 245, ${Math.min(0.2, dot.activity * 0.2)})`;
          context.shadowBlur = dot.activity * 8;
        } else {
          context.shadowBlur = 0;
        }
        const stretch = Math.min(0.32, pointerSpeed * 0.013) * dot.activity;
        const angle = pointerSpeed > 0.1 ? Math.atan2(pointer.vy, pointer.vx) : 0;
        const particleRadius = dot.radius * (1 + dot.activity * 0.18);
        context.beginPath();
        context.ellipse(
          dot.x,
          dot.y,
          particleRadius * (1 + stretch),
          particleRadius * (1 - stretch * 0.35),
          angle,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      context.shadowColor = "transparent";
      if (canMove) frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
    };

    resize();
    animationStart = performance.now();
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(0);
    });
    resizeObserver.observe(hero);

    if (reducedMotion) {
      draw(0);
    } else {
      frame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function Keyboard({
  onOpenPopover,
}: {
  onOpenPopover: (kind: PopoverKind, trigger: HTMLButtonElement) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [autoKey, setAutoKey] = useState<string | null>(null);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const [pointerInteracting, setPointerInteracting] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateScale = () => setScale(Math.min(1, frame.getBoundingClientRect().width / 900));
    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(frame);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const updateModalState = () => setModalOpen(Boolean(document.querySelector("dialog[open]")));
    const observer = new MutationObserver(updateModalState);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    updateModalState();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || modalOpen || pointerInteracting || focusedKey || !pageVisible) {
      setAutoKey(null);
      return;
    }

    let index = 0;
    let timeoutId: number | undefined;

    const pressNextKey = () => {
      setAutoKey(KEYS[index].id);
      timeoutId = window.setTimeout(() => {
        setAutoKey(null);
        index = (index + 1) % KEYS.length;
        timeoutId = window.setTimeout(pressNextKey, index === 0 ? 650 : 90);
      }, 245);
    };

    pressNextKey();
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      setAutoKey(null);
    };
  }, [focusedKey, modalOpen, pageVisible, pointerInteracting, reducedMotion]);

  const scrollToSection = (target: string) => {
    document.getElementById(target)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div
        className="keyboard-frame"
        ref={frameRef}
        style={{ height: `${312 * scale}px` }}
        aria-label="Interactive portfolio keyboard"
      >
        <div
          className="keyboard-stage"
          style={{ "--keyboard-scale": scale } as CSSProperties}
        >
          {KEYS.map((key) => {
            const action = key.action;
            const style = {
              left: `${key.x}px`,
              top: `${key.y}px`,
              width: `${key.width ?? 146}px`,
              height: `${key.height ?? 161}px`,
              "--key-face": key.face,
              "--key-base": key.base,
            } as CSSProperties;
            const className = [
              "key-shell",
              "cursor-can-hover",
              key.className,
              autoKey === key.id ? "is-auto-pressed" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const faceContent = key.id === "enter" ? (
              <>
                <span className="enter-arrow" aria-hidden="true">↵</span>
                <span className="enter-caption">{key.caption}</span>
              </>
            ) : (
              <>
                <span className="key-letter" aria-hidden="true">{key.letter}</span>
                <span className="key-caption" aria-hidden="true">{key.caption}</span>
              </>
            );

            const sharedProps = {
              className,
              "data-cursor-kind": "key",
              style,
              onPointerEnter: () => setPointerInteracting(true),
              onPointerLeave: () => setPointerInteracting(false),
              onFocus: () => setFocusedKey(key.id),
              onBlur: () => setFocusedKey((current) => (current === key.id ? null : current)),
            };

            if (action.type === "route") {
              return (
                <a
                  key={key.id}
                  {...sharedProps}
                  href={action.href}
                  aria-label={key.caption}
                  onClick={() => playMechanicalKeyClick()}
                  onPointerDown={() => setPointerInteracting(true)}
                >
                  <span className="key-face">{faceContent}</span>
                </a>
              );
            }

            if (action.type === "section") {
              return (
                <button
                  key={key.id}
                  {...sharedProps}
                  type="button"
                  aria-label={key.caption}
                  onClick={() => {
                    playMechanicalKeyClick();
                    scrollToSection(action.target);
                  }}
                  onPointerDown={() => setPointerInteracting(true)}
                >
                  <span className="key-face">{faceContent}</span>
                </button>
              );
            }

            return (
              <button
                key={key.id}
                {...sharedProps}
                type="button"
                aria-label={key.caption}
                aria-haspopup="dialog"
                onClick={(event) => {
                  playMechanicalKeyClick();
                  onOpenPopover(action.popover, event.currentTarget);
                }}
                onPointerDown={() => setPointerInteracting(true)}
              >
                <span className="key-face">{faceContent}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CaseStudyDialog({
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
      id="case-overlay"
      className="case-dialog"
      aria-labelledby="case-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="case-dialog-inner">
          <button type="button" className="case-dialog-close cursor-can-hover"
            data-cursor-kind="small" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
          </button>
          <p className="case-dialog-number">Project / {project.number}</p>
          <h2 id="case-dialog-title">{project.title}</h2>
          <p className="case-dialog-type">{project.tagline || project.type}</p>
          <div className="case-dialog-sections">
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

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-marker">
      <span className="section-marker-number">{number}</span>
      <span className="section-marker-slash" aria-hidden="true">/</span>
      <span className="section-marker-label">{label}</span>
      <span className="section-marker-rule" aria-hidden="true" />
    </div>
  );
}

function AboutSection() {
  return (
    <section className="about-section editorial-section" id="about" aria-labelledby="about-heading">
      <div className="editorial-section-inner">
        <SectionMarker number="01" label="ABOUT" />
        <div className="about-layout">
          <div className="about-primary">
            <h2 id="about-heading">
              A developer
              <br />
              who turns <em>ideas</em>
              <br />
              into real things.
            </h2>
            <div className="about-copy">
              <p>
                I&apos;m Parnil, a Full Stack Developer and Computer Science student focused on Software Product Engineering.
              </p>
              <p>
                I enjoy building things across the stack — from web applications and developer tools to mobile apps and experimental side projects. I like taking an idea from a rough concept to a usable product, figuring out the architecture, building the interface, connecting the backend, and getting it shipped.
              </p>
              <p>
                I&apos;m constantly working on something new, experimenting with technologies, and learning by building. I especially enjoy projects that involve real-world problems, thoughtful user experiences, and interesting technical challenges rather than just following tutorials or building things for the sake of it.
              </p>
              <p>
                Alongside my own projects, I&apos;m open to freelance opportunities and collaborations where I can help turn ideas into functional, well-designed products. My goal is to keep building, keep learning, and grow into an engineer who can take meaningful problems from idea to production.
              </p>
            </div>
            <div className="about-signature">
              <span aria-hidden="true" />
              <p>ALWAYS CURIOUS.<br />ALWAYS BUILDING.</p>
            </div>
          </div>
          <aside className="about-aside" aria-label="About visual and annotation">
            <img
              className="about-portrait"
              src="/assets/me.png"
              alt="Illustrated portrait of Parnil Vyawahare"
            />
            <div className="about-editorial-statement">
              <span className="editorial-marker" aria-hidden="true" />
              <p>SAME<br />IDEAS.<br />BIGGER<br />EXECUTION.</p>
            </div>
            <div className="handwritten-note about-note">
              <p>Just a guy<br />who loves<br />building<br />cool stuff.</p>
              <svg viewBox="0 0 130 65" className="annotation-arrow" aria-hidden="true">
                <path
                  d="M115 10 C85 10 50 18 28 42 C22 48 18 52 14 54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M24 45 L13 55 L16 41"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </aside>
        </div>
        <div className="about-values" aria-label="Values">
          <div className="about-value">
            <span>BUILD</span>
            <p>Ideas into products</p>
          </div>
          <div className="about-value">
            <span>LEARN</span>
            <p>New technologies</p>
          </div>
          <div className="about-value">
            <span>IMPROVE</span>
            <p>A little every day</p>
          </div>
          <div className="about-value">
            <span>REPEAT</span>
            <p>Because it&apos;s fun</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="education-section editorial-section" id="education" aria-labelledby="education-heading">
      <div className="editorial-section-inner">
        <SectionMarker number="02" label="EDUCATION" />
        <div className="education-layout">
          <div className="education-intro">
            <h2 id="education-heading">
              Built on a
              <br />
              strong <em>foundation.</em>
            </h2>
            <p className="education-coursework">
              Relevant Coursework: Data Structures • Object-Oriented Programming • Full Stack Web Development • Database Fundamentals • Critical Thinking
            </p>
          </div>
          <div className="education-side">
            <article className="education-card" aria-label="Education details">
              <div className="education-card-top">
                <span className="education-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <path d="m4 12 12-6 12 6-12 6-12-6Z" />
                    <path d="M9 14v7c3 3 11 3 14 0v-7" />
                    <path d="M28 12v8" />
                  </svg>
                </span>
                <span className="education-date">2025 – 2029</span>
              </div>
              <div className="education-card-copy">
                <h3>B.Tech in Computer Science Engineering</h3>
                <p className="education-specialization">(Software Product Engineering)</p>
                <p className="education-institution">Kalvium × MIT ADT University, Pune</p>
                <p className="education-cgpa">CGPA: 9.73 / 10</p>
              </div>
              <span className="education-accent" aria-hidden="true" />
            </article>
          </div>
        </div>
        <div className="education-divider" aria-hidden="true" />
        <div className="education-footer-row">
          <p>EDUCATION FUELS<br />A BETTER TOMORROW.</p>
          <p><span aria-hidden="true">//</span> LEARN&nbsp;&nbsp; BUILD&nbsp;&nbsp; GROW</p>
        </div>
      </div>
    </section>
  );
}

function ExperienceDialog({
  experience,
  dialogRef,
  onClose,
}: {
  experience: Experience | null;
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="experience-dialog"
      aria-labelledby="experience-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {experience && (
        <div className="experience-dialog-inner">
          <button type="button" className="experience-dialog-close cursor-can-hover"
            data-cursor-kind="small" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
          </button>
          <p className="experience-dialog-eyebrow">Experience / {experience.number}</p>
          <h2 id="experience-dialog-title">{experience.title}</h2>
          <div className="experience-dialog-meta">
            <p>{experience.organization}</p>
            <p>{experience.date}</p>
          </div>
          <div className="experience-dialog-rule" aria-hidden="true" />
          <div className="experience-dialog-copy">
            <p className="experience-dialog-label">Overview</p>
            {experience.detail.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {experience.technologies && (
            <div className="experience-dialog-tools">
              <p className="experience-dialog-label">Tools / Technologies</p>
              <ul>
                {experience.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

function FloatingPathsBackground() {
  const position = -1;
  const paths = Array.from({ length: 36 }, (_, index) => ({
    id: index,
    d: `M-${380 - index * 5 * position} -${189 + index * 6}C-${
      380 - index * 5 * position
    } -${189 + index * 6} -${312 - index * 5 * position} ${
      216 - index * 6
    } ${152 - index * 5 * position} ${343 - index * 6}C${616 - index * 5 * position} ${
      470 - index * 6
    } ${684 - index * 5 * position} ${875 - index * 6} ${
      684 - index * 5 * position
    } ${875 - index * 6}`,
    accent: index === 8 || index === 22 || index === 33,
    opacity: index === 8 || index === 22 || index === 33
      ? 0.07 + (index % 3) * 0.008
      : 0.035 + (index % 5) * 0.009,
    duration: 20 + (index * 7) % 11,
    delay: -((index * 17) % 29),
  }));

  return (
    <div className="experience-floating-paths" aria-hidden="true">
      <svg viewBox="0 0 696 316" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            pathLength="1"
            stroke={path.accent ? "#00FFF5" : "#A6A6A6"}
            strokeWidth={0.5 + path.id * 0.03}
            strokeOpacity={path.opacity}
            strokeLinecap="round"
            strokeDasharray="0.3 0.7"
            style={{
              animationDuration: `${path.duration}s`,
              animationDelay: `${path.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function ExperienceSection() {
  const [openExperience, setOpenExperience] = useState<Experience | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openExperience && !dialog.open) dialog.showModal();
    if (!openExperience && dialog.open) dialog.close();
  }, [openExperience]);

  useEffect(() => {
    document.body.classList.toggle("case-dialog-open", Boolean(openExperience));
    return () => document.body.classList.remove("case-dialog-open");
  }, [openExperience]);

  const closeDialog = () => {
    setOpenExperience(null);
    if (dialogRef.current?.open) dialogRef.current.close();
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const openDialog = (experience: Experience, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setOpenExperience(experience);
  };

  return (
    <>
      <section className="experience-section editorial-section" id="experience" aria-labelledby="experience-heading">
        <FloatingPathsBackground />
        <div className="experience-section-content">
          <SectionMarker number="05" label="EXPERIENCE" />
          <h2 className="experience-heading" id="experience-heading">
            Experience<span>.</span>
          </h2>
          <div className="experience-content-card">
            <div className="experience-main">
              <div className="experience-timeline" aria-label="Experience timeline">
                {EXPERIENCES.map((experience) => (
                  <button
                    key={experience.id}
                    type="button"
                    className="experience-item cursor-can-hover"
                    data-cursor-kind="card"
                    onClick={(event) => openDialog(experience, event.currentTarget)}
                    aria-haspopup="dialog"
                  >
                    <span className="experience-item-number">{experience.number}</span>
                    <span className="experience-item-copy">
                      <span className="experience-item-heading">
                        <span>
                          <strong>{experience.title}</strong>
                          <small>{experience.organization}</small>
                        </span>
                      </span>
                      <span className="experience-item-date">{experience.date}</span>
                      <span className="experience-item-description">{experience.shortDescription}</span>
                    </span>
                  </button>
                ))}
              </div>
              <aside className="experience-annotations" aria-label="Experience notes">
                <div className="experience-side-note experience-side-note-top">FOCUSED<br />ON WHAT<br />MATTERS<span /></div>
                <div className="experience-side-note experience-side-note-bottom">EXPERIENCE<br />SHAPES<br />BETTER<br />IDEAS.<span /></div>
              </aside>
            </div>
            <div className="experience-bottom-row">
              <button type="button" className="experience-resume-button cursor-can-hover" data-cursor-kind="small" disabled title="Resume destination coming soon">
                View full resume <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <ExperienceDialog experience={openExperience} dialogRef={dialogRef} onClose={closeDialog} />
    </>
  );
}

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0]);
  const [hasEntered, setHasEntered] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layout = layoutRef.current;
    if (!layout) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(layout);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section editorial-section" id="skills" aria-labelledby="skills-heading">
      <div className="editorial-section-inner">
        <SectionMarker number="03" label="SKILLS" />
        <div ref={layoutRef} className={`skills-layout${hasEntered ? " is-visible" : ""}`}>
          <div className="skills-intro">
            <h2 id="skills-heading">Tools<br />I work<br /><em>with.</em></h2>
            <p>A small but powerful set of tools I use to build, learn, and ship better experiences.</p>
          </div>
          <div className="skills-wheel-column">
            <div className="skills-wheel-stage" role="group" aria-label="Interactive skills wheel">
              <svg className="skills-wheel-svg" viewBox="0 0 720 720">
                <g className="skills-wheel-sectors">
                  {SKILL_CATEGORIES.map((category, index) => (
                    <g
                      key={category.number}
                      className="skills-sector-control cursor-can-hover"
                      role="button"
                      tabIndex={0}
                      aria-label={`${category.number} ${category.label}, ${category.skills.length} skills`}
                      aria-pressed={activeCategory.number === category.number}
                      onPointerEnter={() => setActiveCategory(category)}
                      onFocus={() => setActiveCategory(category)}
                      onClick={() => setActiveCategory(category)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActiveCategory(category);
                        }
                      }}
                    >
                      <path
                        className={`skills-wheel-sector${activeCategory.number === category.number ? " is-active" : ""}`}
                        d={getSkillSectorPath(index)}
                        style={{ "--skill-stagger": `${index * 55}ms` } as CSSProperties}
                      />
                    </g>
                  ))}
                </g>
                <g className="skills-wheel-dividers" aria-hidden="true">
                  {SKILL_CATEGORIES.map((_, index) => {
                    const angle = ((-126 + index * 72) * Math.PI) / 180;
                    const inner = 76;
                    const outer = 342;
                    return (
                      <line
                        key={index}
                        x1={360 + inner * Math.cos(angle)}
                        y1={360 + inner * Math.sin(angle)}
                        x2={360 + outer * Math.cos(angle)}
                        y2={360 + outer * Math.sin(angle)}
                      />
                    );
                  })}
                </g>
                <circle className="skills-wheel-outer-edge" cx="360" cy="360" r="342" />
                <circle className="skills-wheel-core-ring" cx="360" cy="360" r="76" />
                <circle className="skills-wheel-core-inner" cx="360" cy="360" r="63" />
                <g className="skills-wheel-code" fill="none" stroke="#00FFF5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
                  <path d="M342 345 322 360l20 15" />
                  <path d="m378 345 20 15-20 15" />
                  <path d="m369 337-18 46" />
                </g>
              </svg>
              <div className="skills-wheel-content-layer" aria-hidden="true">
                {SKILL_CATEGORIES.map((category, index) => {
                  const Icon = SKILL_CATEGORY_ICONS[index];
                  const categoryName = category.label === "TOOLS & TECHNOLOGIES"
                    ? "Tools & Technologies"
                    : category.label.charAt(0) + category.label.slice(1).toLowerCase();

                  return (
                    <div
                      key={category.number}
                      className={`skills-sector-content skills-sector-content-${category.number}${activeCategory.number === category.number ? " is-active" : ""}`}
                      style={{
                        "--sector-angle": `${index * 72}deg`,
                        "--sector-counter-angle": `${index * -72}deg`,
                      } as CSSProperties}
                    >
                      <div className="skills-sector-inner">
                        <div className="skills-sector-heading">
                          <span className="skills-sector-number">{category.number}</span>
                          <Icon className="skills-sector-icon" aria-hidden="true" />
                          <strong>{categoryName}</strong>
                        </div>
                        <div className={`skills-sector-tags skills-sector-tags-${category.number}`}>
                          {category.skills.map((skill) => (
                            <span key={skill.name}>{skill.name}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <aside className="skills-detail" aria-live="polite" aria-label="Selected skill category">
            <div className="skills-detail-content" key={activeCategory.number}>
              <span className="skills-detail-index">{activeCategory.number} <i>/</i> {activeCategory.label}</span>
              <h3>{activeCategory.label === "TOOLS & TECHNOLOGIES"
                ? "Tools & Technologies"
                : activeCategory.label.charAt(0) + activeCategory.label.slice(1).toLowerCase()}</h3>
              <p>{SKILL_CATEGORY_DESCRIPTIONS[activeCategory.label]}</p>
              <ul>
                {activeCategory.skills.map((skill) => (
                  <li key={skill.name}>
                    <span>{skill.name}</span>
                    {skill.level && <small>{skill.level}</small>}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PortfolioWork() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

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

  const setPreview = (id: ProjectId | null) => setActiveProject(id);

  return (
    <>
      <section className="portfolio-collection collection" id="work" aria-labelledby="projects-heading">
        <header className="portfolio-heading">
          <SectionMarker number="04" label="PROJECTS" />
          <h2 id="projects-heading">Featured<br /><em>Projects.</em></h2>
          <p>A few things I&apos;ve built (and still improving).</p>
        </header>
        <div className="collection-content content">
          <div className="project-list" aria-label="Project collection">
            {FEATURED_PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`project-pill cursor-can-hover ${activeProject === project.id ? "is-active" : ""}`}
                data-cursor-kind="row"
                data-project={project.id}
                onPointerEnter={() => setPreview(project.id)}
                onPointerLeave={() => setPreview(null)}
                onFocus={() => setPreview(project.id)}
                onBlur={() => setPreview(null)}
                onClick={(event) => openDialog(project, event.currentTarget)}
              >
                <span className="project-number">{project.number}</span>
                <span className="project-pill-copy">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
            <a href="/projects" className="projects-all-link cursor-can-hover" data-cursor-kind="cta">
              View all projects <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div
            className={`archive ${activeProject ? "has-preview" : ""}`}
            data-no-custom-cursor="true"
            onPointerLeave={() => setActiveProject(null)}
          >
            <div className="archive-stage">
              <img className="box-back" src="/assets/proj-box-new.png" alt="" aria-hidden="true" />
              <div className="folder-deck">
                {FEATURED_PROJECTS.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-folder ${FOLDER_CLASSES[index]} ${activeProject === project.id ? "is-highlighted" : ""}`}
                    data-project={project.id}
                    aria-label={`Open ${project.title} project folder`}
                    style={{ "--folder-color": project.folderColor } as CSSProperties}
                    onPointerEnter={() => setActiveProject(project.id)}
                    onPointerLeave={() => setActiveProject(null)}
                    onFocus={() => setActiveProject(project.id)}
                    onBlur={() => setActiveProject(null)}
                    onClick={(event) => openDialog(project, event.currentTarget)}
                  >
                    <span className="folder-tab">{project.number} / {project.title.toUpperCase()}</span>
                    <span className="folder-face">
                      <span className="folder-face-top">
                        <small>PROJECT / {project.number}</small>
                        <strong className="folder-logo">{project.title}</strong>
                      </span>
                      <span className="folder-open">OPEN FILE ↗</span>
                    </span>
                  </button>
                ))}
              </div>
              <img className="box-front" src="/assets/proj-box-new.png" alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <CaseStudyDialog project={openProject} dialogRef={dialogRef} onClose={closeDialog} />
    </>
  );
}

function ContactSocialLinks() {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/parnilV06",
      icon: <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.09c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.71 2.09 3.67 1.56.1-.72.4-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.11-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.29-2.61 5.23-5.1 5.5.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/parnil-vyawahare-70a1b0287/",
      icon: <path d="M5.2 8.6H2.1V22h3.1V8.6ZM3.65 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM22 13.4c0-4.04-2.16-5.92-5.05-5.92a4.36 4.36 0 0 0-3.94 2.17V8.6H9.9V22H13v-7.45c0-1.97.37-3.88 2.82-3.88 2.41 0 2.44 2.25 2.44 4.01V22h3.1l.64-8.6Z" />,
    },
    {
      label: "Bluesky",
      href: "https://bsky.app/profile/parnil.bsky.social",
      icon: <path d="M5.7 3.6c2.55 1.92 5.3 5.81 6.3 7.9 1-2.09 3.75-5.98 6.3-7.9 1.84-1.38 4.8-2.45 4.8.95 0 .68-.39 5.72-.62 6.53-.8 2.78-3.73 3.5-6.33 3.06 4.55.78 5.7 3.36 3.2 5.94-4.75 4.9-6.83-1.23-7.36-3.14-.1-.36-.15-.53-.19-.53s-.09.17-.19.53c-.53 1.91-2.61 8.04-7.36 3.14-2.5-2.58-1.35-5.16 3.2-5.94-2.6.44-5.53-.28-6.33-3.06C.89 12.27.5 7.23.5 6.55c0-3.4 2.96-2.33 4.8-.95Z" />,
    },
    {
      label: "X",
      href: "https://x.com/VyawahareParnil",
      icon: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.63 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.92 6.06-6.92Zm-1.29 19.62h2.04L6.48 3.11H4.29l13.32 17.66Z" />,
    },
  ];

  return (
    <div className="contact-social-links" aria-label="Social links">
      {socials.map((social) => (
        <a
          key={social.label}
          className="contact-social-link cursor-can-hover"
          data-cursor-kind="small"
          href={social.href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={social.label}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{social.icon}</svg>
          <span>{social.label}</span>
          <span className="contact-social-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function PortfolioPopover({
  kind,
  dialogRef,
  onClose,
}: {
  kind: PopoverKind | null;
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      className={`portfolio-popover portfolio-popover-${kind ?? "resume"}`}
      aria-labelledby="popover-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
    >
      {kind === "resume" && (
        <div className="popover-inner">
          <div className="popover-heading-row">
            <p className="popover-eyebrow">/ RESUME</p>
            <button type="button" className="popover-close cursor-can-hover"
              data-cursor-kind="small" onClick={onClose}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="popover-grid">
            <div className="popover-main-copy">
              <h2 id="popover-title">My <em>Resume.</em></h2>
              <p>A quick look at my background, skills and experience. You can view it online or download a copy.</p>
              <div className="popover-actions">
                <button type="button" className="cursor-can-hover" data-cursor-kind="small" disabled title="Resume destination coming soon">
                  View Online <span aria-hidden="true">↗</span>
                </button>
                <button type="button" className="cursor-can-hover" data-cursor-kind="small" disabled title="Resume PDF coming soon">
                  Download PDF <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
            <aside className="popover-meta" aria-label="Resume contents">
              <p className="popover-meta-label">INCLUDES</p>
              <ul>
                <li>Education</li>
                <li>Skills</li>
                <li>Projects</li>
                <li>Experience</li>
                <li>Achievements</li>
              </ul>
            </aside>
          </div>
        </div>
      )}
      {kind === "process" && (
        <div className="popover-inner popover-process-inner">
          <div className="popover-heading-row">
            <p className="popover-eyebrow">/ MY PROCESS</p>
            <button type="button" className="popover-close cursor-can-hover"
              data-cursor-kind="small" onClick={onClose}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="popover-process-heading">
            <h2 id="popover-title">How I <em>build.</em></h2>
            <p>Understand the problem. Shape the direction. Build, test, and keep improving.</p>
          </div>
          <div className="popover-process-steps" aria-label="Five-step process">
            {PROCESS_STEPS.map((step) => (
              <article className="popover-process-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}

function Marquee() {
  const groupRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(38);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const updateDuration = () => {
      const groupWidth = group.getBoundingClientRect().width;
      setDuration(Math.max(18, groupWidth / 50));
    };
    updateDuration();
    const observer = new ResizeObserver(updateDuration);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  const group = (ref?: React.RefObject<HTMLDivElement>) => (
    <div className="marquee-group" ref={ref} aria-hidden="true">
      <span>{MARQUEE_MESSAGE}</span>
      <span>{MARQUEE_MESSAGE}</span>
    </div>
  );

  return (
    <section className="marquee" aria-label="Portfolio message">
      <span className="sr-only">{MARQUEE_MESSAGE}</span>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {group(groupRef)}
        {group()}
      </div>
    </section>
  );
}

export default function Index() {
  const [openPopover, setOpenPopover] = useState<PopoverKind | null>(null);
  const popoverRef = useRef<HTMLDialogElement>(null);
  const lastPopoverTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.title = "Parnil Vyawahare — Full-Stack Developer & Web Developer";
  }, []);

  useEffect(() => {
    const dialog = popoverRef.current;
    if (!dialog) return;

    if (openPopover && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => dialog.querySelector<HTMLButtonElement>(".popover-close")?.focus());
    }
    if (!openPopover && dialog.open) dialog.close();
  }, [openPopover]);

  useEffect(() => {
    document.body.classList.toggle("portfolio-popover-open", Boolean(openPopover));
    return () => document.body.classList.remove("portfolio-popover-open");
  }, [openPopover]);

  const closePopover = () => {
    setOpenPopover(null);
    if (popoverRef.current?.open) popoverRef.current.close();
    window.requestAnimationFrame(() => lastPopoverTriggerRef.current?.focus());
  };

  const handleOpenPopover = (kind: PopoverKind, trigger: HTMLButtonElement) => {
    lastPopoverTriggerRef.current = trigger;
    setOpenPopover(kind);
  };

  return (
    <div className="portfolio-site">
      <header className="site-header portfolio-nav">
        <a className="wordmark cursor-can-hover" data-cursor-kind="small" href="#top" aria-label="parnil. home">
          parnil<span>.me</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="cursor-can-hover" data-cursor-kind="nav" href="#work">Work</a>
          <a className="nav-contact cursor-can-hover" data-cursor-kind="nav" href="#contact">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="top" className="portfolio" aria-label="Parnil Vyawahare portfolio">
        <section className="hero" aria-labelledby="intro-heading">
          <DotField />
          <div className="hero-inner">
            <div className="intro" id="intro">
              <h1 id="intro-heading">
                <span>Hi, I&apos;m Parnil.</span>
                <span><em>I build things</em></span>
                <span>for the web.</span>
              </h1>
              <p className="hero-description">A Computer Science student, full-stack developer, and product builder turning ideas into useful experiences for the web.</p>
              <p className="hero-detail">Coding up to the Future!</p>
            </div>
            <div className="keyboard-wrap" id="keyboard">
              <Keyboard onOpenPopover={handleOpenPopover} />
            </div>
          </div>
        </section>

        <Marquee />
        <AboutSection />
        <EducationSection />
        <SkillsSection />

        <PortfolioWork />
        <ExperienceSection />
        <section className="contact-section contact-section-new" id="contact" aria-labelledby="contact-heading">
          <div className="contact-inner">
            <SectionMarker number="06" label="CONTACT" />
            <article className="contact-card" aria-label="Contact details and social links">
              <DotField />
              <div className="contact-card-content">
                <div className="contact-card-lead">
                  <h2 id="contact-heading">Let&apos;s build<br />something <em>great.</em></h2>
                  <p>I&apos;m always open to interesting projects, opportunities, or just a good conversation.</p>
                  <a className="contact-primary-action cursor-can-hover" data-cursor-kind="cta" href={`mailto:${CONTACT_EMAIL}`}>
                    Get in touch <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="contact-card-information">
                  <div className="contact-detail">
                    <p className="contact-detail-label">EMAIL</p>
                    <a className="contact-information-link cursor-can-hover" data-cursor-kind="link" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div className="contact-detail">
                    <p className="contact-detail-label">PHONE</p>
                    <a className="contact-information-link cursor-can-hover" data-cursor-kind="link" href={`tel:${CONTACT_PHONE_HREF}`}>
                      {CONTACT_PHONE}
                    </a>
                  </div>
                  <div className="contact-socials">
                    <p className="contact-detail-label">CONNECT</p>
                    <ContactSocialLinks />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-footer-brand">
          <strong>Parnil Vyawahare</strong>
          <span>Build. Learn. Ship. Repeat.</span>
        </div>
        <div className="site-footer-right">
          <div className="site-footer-copyright">
            <span>© {new Date().getFullYear()} Parnil Vyawahare</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
      <PortfolioPopover kind={openPopover} dialogRef={popoverRef} onClose={closePopover} />
      <ScrollToTopButton />
    </div>
  );
}
