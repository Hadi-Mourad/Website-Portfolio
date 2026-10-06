export const profile = {
  name: "Hadi Mourad",
  title: "Actuarial Science Student · CIA UAP Candidate",
  bio: "Honours Specialization in Actuarial Science student at Western University with a 3.7 GPA and the Western Scholarship of Distinction. I'm pursuing the Canadian Institute of Actuaries (CIA) University Accreditation Program path, beginning ACIA Module 1 in November 2026 on the way to FCIA, and I'm most interested in pricing, valuation, and enterprise risk management.",
  target:
    "Seeking an Actuarial Student co-op/internship at Canada Life — available May 2027 for 4 to 16 months, London-based and able to work on-site.",
  location: "London, ON",
  email: "Hadimourad1014@gmail.com",
  linkedin: "https://www.linkedin.com/in/hadi-mourad1014",
  resume: "/resume.pdf",
};

export const highlights = [
  { value: "3.7", label: "Cumulative GPA" },
  { value: "Distinction", label: "Western Scholarship" },
  { value: "Nov 2026", label: "ACIA Module 1 (CIA UAP)" },
  { value: "May 2027", label: "Co-op availability" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
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
    period: "Jul 2025 – Sep 2026",
    bullets: [
      "Processed high-volume cash transactions and tracked inventory, maintaining zero end-of-shift financial discrepancies through accurate reconciliation.",
      "Collaborated with staff and management to resolve customer inquiries and improve inventory processes during peak hours.",
    ],
    tags: ["Reconciliation", "Inventory Tracking", "Process Improvement"],
  },
  {
    role: "Deputy Returning Officer (Contract)",
    company: "Elections Canada",
    location: "London, ON",
    period: "Apr 2025",
    bullets: [
      "Counted and numerically reconciled ballots, delivering accurate, quantitative results with close attention to detail under strict deadlines.",
      "Followed federal electoral procedures and compliance requirements to protect the integrity and security of the vote, working independently and as part of a team.",
      "Communicated clearly with voters and polling station staff, guiding people through the voting process and keeping operations running smoothly.",
    ],
    tags: ["Ballot Reconciliation", "Federal Compliance", "Attention to Detail"],
  },
  {
    role: "Assistant Manager",
    company: "Bekaa Steel · Hardware & Building Materials Supplier",
    location: "Lebanon",
    period: "Feb 2023 – Mar 2025",
    bullets: [
      "Reconciled daily cash flows and audited inventory datasets in Excel for a high-volume materials supplier, identifying and reducing stock discrepancies.",
      "Analyzed hourly utilization data for heavy machinery rentals (Bobcats, JCBs) to verify billing accuracy and support asset management.",
      "Led and delegated daily tasks for staff in a fast-paced setting, meeting deadlines and resolving complex customer needs.",
    ],
    tags: ["Cash Flow Reconciliation", "Excel Auditing", "Utilization Analysis", "Leadership"],
  },
];

export const leadership = [
  {
    icon: "briefcase",
    role: "Attendee",
    organization: "Canada Life “Actuary for a Day”",
    location: "London, ON",
    period: "Sep 2026",
    description:
      "Met actuaries at the London head office and learned how pricing, valuation, reinsurance, and enterprise risk management work in practice.",
    featured: true,
  },
  {
    icon: "chart",
    role: "Member",
    organization: "Actuarial and Statistical Undergraduate Association (ASUA)",
    location: "Western University",
    period: "2026 – 2027",
    description:
      "Attend networking events, workshops, and actuarial industry panels to build knowledge of the profession.",
    featured: false,
  },
  {
    icon: "users",
    role: "Externals Manager",
    organization: "Lebanese Student Association (LSA)",
    location: "Western University",
    period: "2025 – 2026",
    description:
      "Built and managed relationships with university stakeholders, sponsors, and student organizations to deliver cultural programming and events.",
    featured: false,
  },
] as const;

export type ProjectType = "statistical" | "design";

export const projects: {
  title: string;
  type: ProjectType;
  category: string;
  description: string;
  tags: string[];
}[] = [
  {
    title: "Actuarial & Statistical Coursework",
    type: "statistical",
    category: "Academic Focus · 2026/27",
    description:
      "Mathematics of Finance, Long Term Actuarial Mathematics, Financial Modelling, Financial Markets and Investments, Probability and Statistics I & II, Statistical Programming, and Calculus with Analysis for Statistics.",
    tags: ["Excel", "Python", "R", "Financial Modelling", "Probability"],
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
    skills: [
      "Microsoft Excel (data analysis, financial modelling, reconciliation)",
      "Python (object-oriented & statistical programming)",
      "R / RStudio",
      "Canva, GIMP",
    ],
  },
  {
    title: "Actuarial & Quantitative",
    icon: "sigma",
    skills: [
      "Probability & Statistics",
      "Financial Mathematics & Time Value of Money",
      "Financial Modelling",
      "Life Insurance Mathematics (in progress)",
      "Calculus, Linear Algebra, Microeconomics",
    ],
  },
  {
    title: "Industry Knowledge",
    icon: "shield",
    skills: [
      "Life Insurance",
      "Valuation",
      "Pricing",
      "Market Risk",
      "Enterprise Risk Management",
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

export const spokenLanguages = "Fluent in both English and Arabic";

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
