export interface Project {
  id: string;
  label: string;
  title: string;
  description: string;
  contributions: string[];
  technologies: string[];
  windowFilename: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  status: "complete" | "in-progress" | "concept";
}

export const projects: Project[] = [
  {
    id: "nbfc",
    label: "ENTERPRISE",
    title: "NBFC Loan & Insurance Platform",
    description:
      "End-to-end lending and insurance management platform for a non-banking financial company, supporting employee onboarding, KYC workflows, and Razorpay payment integration.",
    contributions: [
      "Database architecture and schema design",
      "Keycloak auth integration and role-based access",
      "Employee onboarding workflows",
      "Product catalogue and branch management",
      "KYC workflow automation",
      "Business Rule Engine (BRE) implementation",
      "Razorpay payment gateway integration",
    ],
    technologies: ["Keycloak", "Razorpay"],
    windowFilename: "nbfc-service.ts",
    status: "complete",
  },
  {
    id: "ecommerce",
    label: "PLATFORM",
    title: "E-Commerce Platform",
    description:
      "Modernised a legacy PHP e-commerce system by migrating authentication to Node.js, implementing guest checkout, and improving overall platform reliability.",
    contributions: [
      "PHP → Node.js authentication migration",
      "Guest checkout flow implementation",
      "User creation and order linking system",
      "Database schema improvements",
      "Frontend UI improvements",
    ],
    technologies: ["Node.js", "Express", "PHP", "JavaScript"],
    windowFilename: "platform-core.js",
    status: "complete",
  },
  {
    id: "delivery",
    label: "FULL-STACK",
    title: "Delivery Application",
    description:
      "Full-stack delivery management application with real-time state management on the frontend and a robust REST API backend.",
    contributions: [
      "Frontend development with React and Redux Toolkit",
      "Backend REST API development",
    ],
    technologies: ["React", "Redux Toolkit", "Node.js", "Express"],
    windowFilename: "delivery-state.tsx",
    status: "complete",
  },
  {
    id: "document-ai",
    label: "PIPELINE",
    title: "Document AI",
    description:
      "Intelligent document processing pipeline leveraging machine learning for automated extraction, classification, and analysis.",
    contributions: [],
    technologies: [],
    windowFilename: "document-ai.py",
    status: "concept",
  },
];
