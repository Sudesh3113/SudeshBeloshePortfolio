export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  status: "completed" | "in-progress";
}

export const educations: Education[] = [
  {
    id: "mca",
    degree: "MCA",
    field: "Master of Computer Applications",
    institution: "NCRD SIMS",
    location: "Navi Mumbai",
    startYear: "2024",
    endYear: "2026",
    status: "in-progress",
  },
  {
    id: "bsc",
    degree: "B.Sc.",
    field: "Computer Science",
    institution: "Indira College of Commerce and Science",
    location: "Pune",
    startYear: "2021",
    endYear: "2024",
    status: "completed",
  },
];
