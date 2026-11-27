// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio. No other file needs
//  to change for text, links, projects, tools or to-dos.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Chandru",
  handle: "@chandru",
  avatar: null, // e.g. "/me.jpg" (put the photo in /public). Initials show if empty.
  role: "UI/UX Designer",
  company: { name: "Your Company", href: null },
  tagline:
    "I design products people actually enjoy using — from POS systems and kiosks to AI-powered apps. Research, flows, interfaces, and the details in between.",
  status: "Open to work",
  currently: { label: "Currently at", company: "Your Company", href: null, role: "UI/UX Designer", since: "2026" },
  email: "you@example.com",
  cvUrl: null, // e.g. "/Chandru-CV.pdf" after putting the PDF in /public
  location: {
    label: "India",
    lat: 20.5937, // used for the globe marker
    lng: 78.9629,
    availability: "Open to remote & hybrid roles",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST",
  },
  // icon: instagram | linkedin | behance | dribbble | x
  socials: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/your-handle" },
    { label: "Behance", icon: "behance", href: "https://www.behance.net/your-handle" },
    { label: "Dribbble", icon: "dribbble", href: "https://dribbble.com/your-handle" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/your-handle" },
  ],
  principles: [
    { n: "01", title: "Start with the user", text: "Replace with a principle that guides how you work." },
    { n: "02", title: "Make it obvious", text: "Replace with another principle or belief." },
    { n: "03", title: "Ship, then refine", text: "Replace with a third principle." },
  ],
  tools: [
    { name: "Figma", level: "Primary" },
    { name: "FigJam", level: "Primary" },
    { name: "Prototyping", level: "In my workflow" },
    { name: "AI tools", level: "In my workflow" },
  ],
  todos: [
    { text: "Design a POS used by real shops", done: true },
    { text: "Ship a kiosk interface", done: true },
    { text: "Launch an AI email app", done: false },
    { text: "Write my first case study", done: false },
    { text: "Speak at a design meetup", done: false },
  ],
};

const placeholderSections = [
  { title: "Overview", text: "Replace this with a short summary of the project, the client or team, and what you were asked to do." },
  { title: "The problem", text: "Describe the problem users faced and what was at stake." },
  { title: "Process", text: "Walk through research, flows, wireframes, iterations and testing. Add images here later." },
  { title: "Outcome", text: "Share what shipped and the impact — metrics, feedback, learnings." },
];

// Add, remove or reorder projects here. Each gets its own page at /work/<slug>.
//   category: "products" | "design"       (drives the floating filter)
//   variant:  "card"    → image on top, text + buttons below
//             "feature" → wide tile with a glass title bar
//             "art"     → full-bleed image, title shows on hover
//   column:   "left" | "mid" | "right"
//   image:    "/projects/pos-cover.png" — the tile + case-study cover (file goes in public/projects/)
//   gallery:  ["/projects/pos-1.png", "/projects/pos-2.png"] — extra design images on the case-study page
//   liveUrl:  adds a "Try it" / "Visit" button
//
// ADD A NEW PROJECT: copy one object below, give it a new unique `slug`, and fill it in.
export const projects = [
  {
    slug: "pos-system",
    title: "POS System",
    kind: "Product — Point of sale",
    category: "products",
    variant: "card",
    column: "left",
    status: "Case study",
    year: "2026",
    color: "#C4694A",
    ink: "#FFF4EC",
    summary: "A point-of-sale experience designed for speed at the counter.",
    role: "UX/UI Designer",
    tools: ["Figma", "FigJam"],
    image: null, // "/projects/pos-cover.png"
    gallery: [], // ["/projects/pos-1.png", "/projects/pos-2.png"]
    liveUrl: null,
    sections: placeholderSections,
  },
  {
    slug: "kiosk-interface",
    title: "Kiosk Interface",
    kind: "Product — Self-service kiosk",
    category: "products",
    variant: "feature",
    column: "mid",
    status: "Case study",
    year: "2026",
    color: "#E8A020",
    ink: "#1A1208",
    summary: "A self-service kiosk flow that anyone can use on the first try.",
    role: "UX/UI Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: placeholderSections,
  },
  {
    slug: "mailmind",
    title: "MailMind",
    kind: "Product — AI email app",
    category: "products",
    variant: "art",
    column: "right",
    status: "Case study",
    year: "2026",
    color: "#3B3A9A",
    ink: "#F0EFFF",
    summary: "An AI-powered email app that helps you clear the inbox faster.",
    role: "Product Designer",
    tools: ["Figma", "Prototyping", "AI tools"],
    image: null,
    liveUrl: null,
    sections: placeholderSections,
  },
  {
    slug: "design-system",
    title: "Design System",
    kind: "Design — Placeholder",
    category: "design",
    variant: "art",
    column: "left",
    status: "Case study",
    year: "2026",
    color: "#0E3B33",
    ink: "#E6F3EE",
    summary: "Placeholder — replace with one of your design projects.",
    role: "Product Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: placeholderSections,
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    kind: "Design — Placeholder",
    category: "design",
    variant: "art",
    column: "mid",
    status: "Case study",
    year: "2025",
    color: "#2A1D14",
    ink: "#F2E3D3",
    summary: "Placeholder — replace with one of your design projects.",
    role: "Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: placeholderSections,
  },
  {
    slug: "app-redesign",
    title: "App Redesign",
    kind: "Design — Placeholder",
    category: "design",
    variant: "art",
    column: "right",
    status: "Case study",
    year: "2025",
    color: "#7A3B22",
    ink: "#FFEBDD",
    summary: "Placeholder — replace with one of your design projects.",
    role: "UX/UI Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: placeholderSections,
  },
];
