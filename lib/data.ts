export const profile = {
  name: "Hadi Mourad",
  title: "Actuarial Science Student · CIA UAP Candidate",
  bio: "Honours Specialization in Actuarial Science student at Western University with a 3.7 GPA and the Western Scholarship of Distinction. I'm pursuing the Canadian Institute of Actuaries (CIA) University Accreditation Program path, taking ACIA Module 1 from November 2026 to April 2027 on the way to FCIA, and I'm most interested in pricing, valuation, and enterprise risk management.",
  target:
    "Seeking an Actuarial Student co-op/internship — available May 2027 for 4 to 16 months, London-based and able to work on-site.",
  location: "London, ON",
  email: "hadimourad1014@gmail.com",
  linkedin: "https://www.linkedin.com/in/hadi-mourad1014/",
  resume: "/Hadi_Mourad_Resume_New.pdf",
  resumePage: "/resume",
};

export const highlights = [
  { value: "3.7", label: "Cumulative GPA" },
  { value: "Distinction", label: "Western Scholarship" },
  { value: "Nov 2026 – Apr 2027", label: "ACIA Module 1 (CIA UAP)" },
  { value: "May 2027", label: "Co-op availability" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Accreditations", href: "#accreditations" },
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

export type ProjectType = "statistical";

export const projects: {
  title: string;
  type: ProjectType;
  preview: "simulation" | "distribution";
  category: string;
  description: string;
  tags: string[];
  link?: { href: string; label: string };
  featured?: boolean;
  metrics?: { value: string; label: string }[];
}[] = [
  {
    title: "Stochastic ALM & Portfolio Immunization Dashboard",
    type: "statistical",
    preview: "simulation",
    category: "Statistical / Actuarial",
    description:
      "Built an interactive web application to perform Redington immunization of a guaranteed-annuity liability ($13.5M PV) against a 3-bond universe. The tool leverages an SLSQP optimizer to minimize cash-flow tracking error while strictly satisfying duration-matching and convexity constraints. To stress-test the immunized surplus, the dashboard runs 2,500 Monte Carlo simulations using Gaussian shift and Vasicek interest-rate models, calculating risk metrics including 95% VaR and TVaR. Integrates financial mathematics, optimization, corporate finance, and statistics into a single comprehensive view.",
    tags: [
      "Python",
      "Streamlit",
      "Financial Mathematics",
      "Optimization (SLSQP)",
      "Monte Carlo",
      "Asset-Liability Management (ALM)",
    ],
    link: {
      href: "https://actuarial-alm-dashboard-6co58eeep2i8nesyeteubv.streamlit.app/",
      label: "Open live dashboard",
    },
    featured: true,
    metrics: [
      { value: "$13.5M", label: "Liability PV" },
      { value: "3", label: "Bond universe" },
      { value: "2,500", label: "Monte Carlo paths" },
      { value: "95%", label: "VaR & TVaR" },
    ],
  },
  {
    title: "Actuarial & Statistical Coursework",
    type: "statistical",
    preview: "distribution",
    category: "Academic Focus · 2026/27",
    description:
      "Mathematics of Finance, Long Term Actuarial Mathematics, Financial Modelling, Financial Markets and Investments, Probability and Statistics I & II, Statistical Programming, and Calculus with Analysis for Statistics.",
    tags: ["Excel", "Python", "R", "Financial Modelling", "Probability"],
  },
];

export const skillGroups = [
  {
    title: "Languages & Software",
    icon: "code",
    skills: [
      "Microsoft Excel (data analysis, financial modelling, reconciliation)",
      "Python (object-oriented & statistical programming)",
      "R / RStudio (Enrolled for Winter 2027 via Statistical Programming course)",
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
    title: "Risk & Quantitative Methods",
    icon: "activity",
    skills: [
      "Asset-Liability Management (ALM) & Redington Immunization",
      "Monte Carlo Simulation & Stochastic Modelling",
      "Sensitivity Analysis & Scenario Testing (VaR / TVaR)",
      "Cash Flow Reconciliation & Auditing",
    ],
  },
] as const;

export const spokenLanguages = "Fluent in both English and Arabic";

export type RoadmapStatus = "in-progress" | "upcoming" | "planned" | "goal";

export const roadmap: {
  title: string;
  period: string;
  status: RoadmapStatus;
  description: string;
}[] = [
  {
    title: "Honours Specialization in Actuarial Science",
    period: "2025 – 2029",
    status: "in-progress",
    description:
      "Completing the accredited Honours Specialization in Actuarial Science at Western University through the CIA University Accreditation Program (UAP) pathway.",
  },
  {
    title: "ACIA Module 1",
    period: "Nov 2026 – Apr 2027",
    status: "upcoming",
    description:
      "First module on the Associate of the Canadian Institute of Actuaries (ACIA) pathway, completed alongside full-time studies.",
  },
  {
    title: "ACIA Module 2",
    period: "2027 – 2028 (Third Year)",
    status: "planned",
    description:
      "Applying theoretical knowledge to practical scenarios through graded assignments, predictive analytics, and a comprehensive case study during my third year at Western University.",
  },
  {
    title: "ACIA Capstone Exam",
    period: "2029 (Post-Graduation)",
    status: "planned",
    description:
      "A comprehensive two-day, open-book examination assessing the integration of actuarial concepts and communication skills across common and specialized tracks, utilizing Microsoft Excel and RStudio.",
  },
  {
    title: "CIA Professionalism Workshop",
    period: "2029",
    status: "planned",
    description:
      "Final prerequisite workshop focusing on business ethics, professional standards of practice, and the legal environment for actuaries in Canada.",
  },
  {
    title: "Associate of the CIA (ACIA)",
    period: "2029",
    status: "planned",
    description:
      "Attaining the ACIA designation upon the successful completion of Western's UAP-accredited degree, ACIA Modules 1 and 2, the Capstone Exam, and the Professionalism Workshop.",
  },
  {
    title: "Fellow of the CIA (FCIA)",
    period: "Long-term goal",
    status: "goal",
    description:
      "Fellowship-level specialization in pricing, valuation, and enterprise risk management, culminating in the completion of FCIA modules, fellowship examinations, and practical experience.",
  },
];
