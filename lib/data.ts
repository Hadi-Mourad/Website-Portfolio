// Replace EMAIL / LINKEDIN_URL with your real details, and drop your resume at public/resume.pdf.
export const profile = {
  name: "Hadi Mourad",
  title: "Actuarial Science Student & Analytical Thinker",
  bio: "Undergraduate student pursuing an Honours Specialization in Actuarial Science at Western University, blending a foundation in Computer Science with advanced statistical analysis and financial modelling.",
  location: "London, ON",
  email: "hadi.mourad@example.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  resume: "/resume.pdf",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
] as const;

export const experience = [
  {
    role: "Customer Service & Operations",
    company: "Pistachios Quality Meat and Groceries",
    location: "London, ON",
    period: "Present",
    bullets: [
      "Track inventory levels and stock rotation across perishable and dry goods, flagging shortfalls early to minimize spoilage and waste.",
      "Observe daily and weekly demand patterns to anticipate high-volume periods and inform restocking and ordering decisions.",
      "Identify bottlenecks in restocking, prep, and checkout workflows, adjusting task order to keep peak-hour operations running smoothly.",
      "Apply consistent quality-control checks on product freshness, handling, and display to maintain food-safety standards.",
    ],
    tags: [
      "Inventory Tracking",
      "Demand Patterns",
      "Process Optimization",
      "Quality Control",
    ],
  },
];

export type ProjectType = "statistical" | "design";

export const projects: {
  title: string;
  type: ProjectType;
  category: string;
  description: string;
  tags: string[];
}[] = [
  {
    title: "Actuarial & Statistical Computing",
    type: "statistical",
    category: "Academic Focus",
    description:
      "Applying advanced mathematical concepts through coursework in Financial Modelling, Probability and Statistics, and Calculus with Analysis for Statistics.",
    tags: ["R", "RStudio", "Statistical Analysis", "Data Modeling"],
  },
  {
    title: "Large-Scale Event Design & Production",
    type: "design",
    category: "Design",
    description:
      "Designed and formatted large-scale (36×72 inch) wedding seating charts and custom signage for print production, utilizing image gradient fades and precise alignment.",
    tags: ["Canva", "GIMP", "Graphic Design", "Print Production"],
  },
];

export const skillGroups = [
  {
    title: "Languages & Software",
    icon: "code",
    skills: ["R", "RStudio", "Canva", "GIMP"],
  },
  {
    title: "Mathematics & Analysis",
    icon: "sigma",
    skills: [
      "Financial Modelling",
      "Probability & Statistics",
      "Linear Algebra",
      "Microeconomics",
    ],
  },
  {
    title: "Hardware & Systems",
    icon: "cpu",
    skills: [
      "Windows Desktop Customization (Rainmeter, TranslucentTB)",
      "Custom PC / Workspace Builds",
    ],
  },
] as const;

export const interests = [
  {
    icon: "dumbbell",
    title: "Weightlifting",
    description:
      "Structured training and body recomposition: progressive overload, tracking, and patience.",
  },
  {
    icon: "crosshair",
    title: "Tactical FPS (CS2)",
    description:
      "Split-second decisions, team coordination, and reading probabilities under pressure.",
  },
  {
    icon: "grid",
    title: "Extreme Sudoku",
    description:
      "Grid deduction puzzles that reward rigorous logic and pattern recognition.",
  },
  {
    icon: "trophy",
    title: "European Football",
    description:
      "Following the tactics, stats, and storylines of the top European leagues.",
  },
] as const;
