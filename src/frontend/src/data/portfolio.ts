// ============================================================
// PORTFOLIO DATA — All placeholder content is clearly marked.
// Search for "// CUSTOMIZE:" to find values to replace.
// ============================================================

// CUSTOMIZE: Replace with your full name
export const PORTFOLIO_NAME = "Alex Nova";

// CUSTOMIZE: Replace with your professional title
export const PORTFOLIO_TITLE = "Full-Stack Engineer & System Architect";

// CUSTOMIZE: Replace with a brief bio (shown in Tesseract/Resume scene)
export const PORTFOLIO_BIO =
  "I architect scalable systems at the intersection of cloud infrastructure, machine learning, and product engineering. Five years shipping production systems that handle millions of requests daily.";

// CUSTOMIZE: Replace with your resume PDF URL
export const RESUME_URL = "/resume.pdf";

// CUSTOMIZE: Replace with your social media URLs
export const SOCIAL_LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

// ============================================================
// SKILLS — Organized by cluster/category
// CUSTOMIZE: Replace technologies with your actual skill set
// ============================================================
export interface Skill {
  name: string;
  level: number; // 0-1, used for star size/brightness
}

export interface SkillCluster {
  id: string;
  label: string;
  color: string;
  position: [number, number, number];
  skills: Skill[];
}

export const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#FF7A18",
    position: [-12, 4, -5],
    skills: [
      { name: "React", level: 0.95 },
      { name: "TypeScript", level: 0.9 },
      { name: "Next.js", level: 0.85 },
      { name: "Tailwind CSS", level: 0.9 },
      { name: "Three.js", level: 0.8 },
      { name: "GraphQL", level: 0.75 },
      { name: "Vite", level: 0.85 },
      { name: "Framer Motion", level: 0.8 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#1E88E5",
    position: [12, 4, -5],
    skills: [
      { name: "Node.js", level: 0.9 },
      { name: "Python", level: 0.92 },
      { name: "Django", level: 0.85 },
      { name: "PostgreSQL", level: 0.88 },
      { name: "Redis", level: 0.82 },
      { name: "REST APIs", level: 0.95 },
      { name: "FastAPI", level: 0.83 },
      { name: "WebSockets", level: 0.78 },
    ],
  },
  {
    id: "ai",
    label: "AI / Data",
    color: "#6D28D9",
    position: [-12, -6, -5],
    skills: [
      { name: "TensorFlow", level: 0.8 },
      { name: "PyTorch", level: 0.82 },
      { name: "Pandas", level: 0.9 },
      { name: "scikit-learn", level: 0.85 },
      { name: "SQL", level: 0.92 },
      { name: "Jupyter", level: 0.88 },
      { name: "MLflow", level: 0.72 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#10B981",
    position: [12, -6, -5],
    skills: [
      { name: "Git", level: 0.95 },
      { name: "Docker", level: 0.88 },
      { name: "AWS", level: 0.85 },
      { name: "Figma", level: 0.8 },
      { name: "Linux", level: 0.87 },
      { name: "Kubernetes", level: 0.75 },
      { name: "CI/CD", level: 0.88 },
    ],
  },
];

// ============================================================
// PROJECTS — Shown as planets in the Planetary System scene
// CUSTOMIZE: Replace with your actual projects
// ============================================================
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  color: string;
  atmosphereColor: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
}

export const PROJECTS: Project[] = [
  {
    id: "nebula",
    title: "Nebula Dashboard",
    description:
      "Real-time analytics platform processing 2M+ events/day with live visualizations, anomaly detection alerts, and multi-tenant architecture.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com", // CUSTOMIZE
    demo: "https://demo.example.com", // CUSTOMIZE
    color: "#FF7A18",
    atmosphereColor: "#FF5500",
    size: 1.4,
    orbitRadius: 8,
    orbitSpeed: 0.3,
  },
  {
    id: "quantum",
    title: "Quantum API",
    description:
      "High-performance REST API framework with automatic OpenAPI generation, rate limiting, JWT auth, and sub-10ms p99 latency.",
    tech: ["Python", "FastAPI", "Redis", "Docker", "PostgreSQL"],
    github: "https://github.com", // CUSTOMIZE
    demo: "https://demo.example.com", // CUSTOMIZE
    color: "#1E88E5",
    atmosphereColor: "#0D47A1",
    size: 1.2,
    orbitRadius: 13,
    orbitSpeed: 0.2,
  },
  {
    id: "stellar",
    title: "Stellar ML",
    description:
      "End-to-end machine learning pipeline for infrastructure anomaly detection with 94.7% accuracy across distributed systems.",
    tech: ["Python", "TensorFlow", "AWS SageMaker", "Airflow"],
    github: "https://github.com", // CUSTOMIZE
    demo: "https://demo.example.com", // CUSTOMIZE
    color: "#6D28D9",
    atmosphereColor: "#4A1D96",
    size: 1.6,
    orbitRadius: 18,
    orbitSpeed: 0.15,
  },
  {
    id: "void",
    title: "Void Commerce",
    description:
      "E-commerce platform with AI-powered recommendations, real-time inventory sync, and one-click checkout processing $500K+ GMV.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Elasticsearch"],
    github: "https://github.com", // CUSTOMIZE
    demo: "https://demo.example.com", // CUSTOMIZE
    color: "#10B981",
    atmosphereColor: "#065F46",
    size: 1.3,
    orbitRadius: 23,
    orbitSpeed: 0.1,
  },
];

// ============================================================
// TIMELINE — Work experience, education, achievements
// CUSTOMIZE: Replace with your actual timeline data
// ============================================================
export interface TimelineNode {
  id: string;
  label: string;
  period: string;
  description: string;
  angle: number; // radians, position on the ring
  type: "education" | "work" | "achievement";
}

export interface TimelineRing {
  id: string;
  label: string;
  radius: number;
  color: string;
  nodes: TimelineNode[];
}

export const TIMELINE_RINGS: TimelineRing[] = [
  {
    id: "education",
    label: "Education",
    radius: 14,
    color: "#FF7A18",
    nodes: [
      {
        id: "bsc",
        label: "B.S. Computer Science",
        period: "2018 – 2022",
        description:
          "State University — GPA 3.9. Specialized in distributed systems and ML.",
        angle: 0.3,
        type: "education",
      },
      {
        id: "certs",
        label: "Online Certifications",
        period: "2022",
        description:
          "AWS Solutions Architect, Google ML Crash Course, Stanford Algorithms.",
        angle: 2.8,
        type: "education",
      },
    ],
  },
  {
    id: "work",
    label: "Work Experience",
    radius: 9,
    color: "#1E88E5",
    nodes: [
      {
        id: "junior",
        label: "Junior Developer",
        period: "2022 – 2023",
        description:
          "TechCorp Inc. — Built internal tooling and migrated legacy monolith to microservices.",
        angle: 0.8,
        type: "work",
      },
      {
        id: "senior",
        label: "Senior Engineer",
        period: "2023 – 2025",
        description:
          "StartupXYZ — Led backend infrastructure, reduced cloud costs by 40%.",
        angle: 2.2,
        type: "work",
      },
      {
        id: "lead",
        label: "Lead Architect",
        period: "2025 – Present",
        description:
          "NovaSystems — Architecting platform serving 500K+ users across 3 products.",
        angle: 4.5,
        type: "work",
      },
    ],
  },
  {
    id: "achievements",
    label: "Achievements",
    radius: 5,
    color: "#6D28D9",
    nodes: [
      {
        id: "oss",
        label: "Open Source Contributor",
        period: "2021 – Present",
        description:
          "1,200+ GitHub stars across personal projects. Active contributor to React ecosystem.",
        angle: 1.2,
        type: "achievement",
      },
      {
        id: "aws",
        label: "AWS Certified",
        period: "2022",
        description: "AWS Solutions Architect Professional certification.",
        angle: 3.5,
        type: "achievement",
      },
      {
        id: "lead-award",
        label: "Tech Lead Award",
        period: "2024",
        description:
          "Company-wide recognition for shipping critical infrastructure on schedule.",
        angle: 5.2,
        type: "achievement",
      },
    ],
  },
];

export const SCENE_NAMES = [
  "Black Hole",
  "Wormhole",
  "Galaxy of Skills",
  "Planetary Projects",
  "Timeline Orbit",
  "Tesseract Archive",
  "Contact Portal",
];

export const WORMHOLE_WORDS = [
  "Creator",
  "Engineer",
  "Problem Solver",
  "System Builder",
];
