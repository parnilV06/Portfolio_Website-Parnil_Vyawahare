export type ProjectCategory =
  | "WEB APP"
  | "TOOL"
  | "HACKATHON"
  | "EXPERIMENT"
  | "PRACTICE"
  | "FREELANCE"
  | "MISC";

export type Project = {
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
};

export const PROJECTS: Project[] = [
  {
    id: "cubit",
    number: "01",
    title: "Cubit",
    description: "A modern speedcubing platform with timing, training and community.",
    category: "WEB APP",
    tags: ["speedcubing", "community"],
    featured: true,
    type: "Web app",
    folderColor: "#171717",
    folderTitle: ["Cu", "bit"],
  },
  {
    id: "slottrack",
    number: "02",
    title: "SlotTrack",
    description: "Track your college slots, simple and smart.",
    category: "WEB APP",
    tags: ["college", "planning"],
    featured: true,
    type: "Web app",
    folderColor: "#1a1a1a",
    folderTitle: ["Slot", "Track"],
  },
  {
    id: "tw-builder",
    number: "03",
    title: "TW-Builder",
    description: "Convert CSS to Tailwind, instantly.",
    category: "TOOL",
    tags: ["css", "tailwind"],
    featured: true,
    type: "Tool",
    folderColor: "#141414",
    folderTitle: ["TW-", "Builder"],
  },
  {
    id: "typecraft",
    number: "04",
    title: "TypeCraft",
    description: "A minimal typing test to track and improve your speed.",
    category: "WEB APP",
    tags: ["typing", "practice"],
    featured: true,
    type: "Web app",
    folderColor: "#1d1d1d",
    folderTitle: ["Type", "Craft"],
  },
  {
    id: "assetflow",
    number: "05",
    title: "AssetFlow",
    description: "Asset management system for teams.",
    category: "HACKATHON",
    tags: ["assets", "teams"],
    featured: false,
    type: "Hackathon",
    folderColor: "#181818",
    folderTitle: ["Asset", "Flow"],
  },
  {
    id: "claire",
    number: "06",
    title: "Claire",
    description: "Inclusive EdTech for dyslexic students.",
    category: "HACKATHON",
    tags: ["edtech", "accessibility"],
    featured: false,
    type: "Hackathon",
    folderColor: "#171717",
    folderTitle: ["Cl", "aire"],
  },
  {
    id: "jams",
    number: "07",
    title: "JAMS",
    description: "Personal AI operating system.",
    category: "EXPERIMENT",
    tags: ["systems", "experiment"],
    featured: false,
    type: "Experiment",
    folderColor: "#1a1a1a",
    folderTitle: ["JA", "MS"],
  },
  {
    id: "nike-clone",
    number: "08",
    title: "Nike Clone",
    description: "Frontend practice project.",
    category: "PRACTICE",
    tags: ["frontend", "practice"],
    featured: false,
    type: "Practice",
    folderColor: "#141414",
    folderTitle: ["Nike", "Clone"],
  },
  {
    id: "painganga-publications",
    number: "09",
    title: "Painganga Publications",
    description: "Websites & automation for journals.",
    category: "FREELANCE",
    tags: ["publishing", "automation"],
    featured: false,
    type: "Freelance",
    folderColor: "#1d1d1d",
    folderTitle: ["Painganga", "Pub."],
  },
  {
    id: "moltsteine-files",
    number: "10",
    title: "The MoltSteine Files",
    description: "Scraper and archive for Moltbook.",
    category: "TOOL",
    tags: ["scraper", "archive"],
    featured: false,
    type: "Tool",
    folderColor: "#181818",
    folderTitle: ["Molt", "Steine"],
  },
  {
    id: "sih-bitcoin-analyzer",
    number: "11",
    title: "SIH Bitcoin Analyzer",
    description: "AI-powered transaction analysis.",
    category: "HACKATHON",
    tags: ["bitcoin", "analysis"],
    featured: false,
    type: "Hackathon",
    folderColor: "#171717",
    folderTitle: ["SIH", "Bitcoin"],
  },
  {
    id: "nutriscope",
    number: "12",
    title: "NutriScope",
    description: "Scan. Analyze. Eat better.",
    category: "HACKATHON",
    tags: ["nutrition", "analysis"],
    featured: false,
    type: "Hackathon",
    folderColor: "#1a1a1a",
    folderTitle: ["Nutri", "Scope"],
  },
  {
    id: "leetlibrary",
    number: "13",
    title: "LeetLibrary",
    description: "A complete guide to LeetCode.",
    category: "WEB APP",
    tags: ["leetcode", "learning"],
    featured: false,
    type: "Web app",
    folderColor: "#141414",
    folderTitle: ["Leet", "Library"],
  },
  {
    id: "kalvium-extension",
    number: "14",
    title: "Kalvium Extension",
    description: "Productivity tools for Kalvium.",
    category: "TOOL",
    tags: ["productivity", "extension"],
    featured: false,
    type: "Tool",
    folderColor: "#1d1d1d",
    folderTitle: ["Kalvium", "Ext."],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
