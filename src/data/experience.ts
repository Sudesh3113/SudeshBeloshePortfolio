export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string; // e.g. "Jun 2025" — TODO: verify
  endDate: string;   // empty string = present
  status: "current" | "past";
  location: string;
  description: string;
  skills: string[];
  projectIds: string[]; // references projects.ts ids
}

export const experiences: Experience[] = [
  {
    id: "neurospark",
    company: "Neuro Spark Works",
    role: "Junior Software Developer",
    startDate: "", // TODO: confirm exact start date
    endDate: "",
    status: "current",
    location: "Pune, IN",
    description:
      "Building and maintaining full-stack web applications across fintech and e-commerce domains. Working on enterprise-grade systems with a focus on clean architecture, authentication, and reliable API design.",
    skills: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Keycloak",
      "Docker",
      "REST APIs",
      "TypeScript",
    ],
    projectIds: ["nbfc", "ecommerce", "delivery"],
  },
];
