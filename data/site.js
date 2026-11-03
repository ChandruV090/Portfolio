// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio. No other file needs
//  to change for text, links, projects, tools or to-dos.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Chandru",
  handle: "@chandru",
  avatar: null, // e.g. "/me.jpg" (put the photo in /public). Initials show if empty.
  role: "UI/UX Designer",
  company: { name: "Freelance", href: null },
  tagline:
    "I design products people actually enjoy using — from POS systems and self-service kiosks to AI-powered apps. Research, flows, interfaces, and every small detail in between.",
  status: "Open to work",
  currently: { label: "Currently", company: "Freelance", href: null, role: "UI/UX Designer", since: "2026" },
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
    { n: "01", title: "Start with the user", text: "Every screen begins with a real person and a real task. I observe, ask, and map the journey before I open Figma." },
    { n: "02", title: "Make it obvious", text: "Good interfaces don't need instructions. Clear hierarchy, honest labels, and fewer choices beat clever tricks." },
    { n: "03", title: "Ship, then refine", text: "A tested prototype teaches more than a perfect mockup. I put work in front of people early and iterate from evidence." },
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

const posSections = [
  { title: "Overview", text: "A point-of-sale system for busy retail counters, covering billing, product lookup, discounts, payments and end-of-day reports. I owned the experience end to end, from research through high-fidelity UI." },
  { title: "The problem", text: "Cashiers were juggling cluttered screens, deep menus and tiny tap targets while a queue grew in front of them. Every extra tap at checkout cost time and created room for billing mistakes." },
  { title: "Process", text: "I watched how staff worked during peak hours, mapped the most frequent tasks, and restructured the layout around them. Wireframes in FigJam became a clickable Figma prototype that I refined across several rounds of feedback with real users." },
  { title: "Outcome", text: "A calmer, faster checkout: large touch-friendly controls, a persistent cart, one-tap payment methods and a clear visual hierarchy that new staff can pick up quickly." },
];

const kioskSections = [
  { title: "Overview", text: "A self-service kiosk that lets customers browse, customise and pay for an order without waiting for staff. The goal: anyone should be able to complete an order on their first try." },
  { title: "The problem", text: "Kiosk users are standing, often in a hurry, and have never seen the interface before. Small text, unclear steps and surprise upsells quickly lead to abandoned orders." },
  { title: "Process", text: "I designed a linear, step-by-step flow with a visible progress indicator, oversized imagery and generous tap targets sized for arm's-length use. Accessibility, glare and reach height shaped every layout decision." },
  { title: "Outcome", text: "A guided ordering flow with clear back-and-edit paths, a simple review screen before payment, and a confirmation state that tells customers exactly what happens next." },
];

const mailmindSections = [
  { title: "Overview", text: "MailMind is an AI-powered email app that summarises long threads, drafts replies and sorts what matters to the top, so people spend less time managing their inbox." },
  { title: "The problem", text: "AI features are powerful but easy to distrust. Users needed to understand what the assistant did, stay in control of what gets sent, and never feel the app was acting behind their back." },
  { title: "Process", text: "I explored patterns for surfacing AI suggestions inline, designed clear states for generating, editing and undoing, and prototyped the core flows to test how much automation felt helpful rather than intrusive." },
  { title: "Outcome", text: "An inbox where AI is visible but never pushy: one-glance thread summaries, editable draft replies, and transparent labels that show why each email was prioritised." },
];

const designSystemSections = [
  { title: "Overview", text: "A shared component library and set of design tokens that keep products consistent and make new screens faster to design and build." },
  { title: "The problem", text: "Similar screens were being designed slightly differently each time, leading to inconsistent spacing, colours and interactions, and extra back-and-forth with developers." },
  { title: "Process", text: "I audited existing screens, consolidated duplicates into a core set of components, and defined tokens for colour, type and spacing. Each component was documented with variants, states and usage guidance." },
  { title: "Outcome", text: "A single source of truth in Figma that speeds up design work, reduces handoff questions and gives every product a more cohesive feel." },
];

const brandSections = [
  { title: "Overview", text: "A visual identity covering logo, colour palette, typography and core brand assets, designed to feel distinctive and work across digital and print." },
  { title: "The problem", text: "The brand lacked a clear, recognisable look, and assets were being created ad hoc with no shared rules." },
  { title: "Process", text: "I started with mood boards and brand keywords, explored multiple logo directions, and tested the strongest options in real contexts such as app icons, social posts and signage." },
  { title: "Outcome", text: "A flexible identity system with usage guidelines, so anyone on the team can create on-brand material with confidence." },
];

const redesignSections = [
  { title: "Overview", text: "A redesign of an existing mobile app focused on improving navigation, readability and the overall feel of the product." },
  { title: "The problem", text: "Key features were buried in menus, screens felt crowded, and users struggled to find what they came for." },
  { title: "Process", text: "I reviewed the current experience, identified the biggest friction points, simplified the information architecture and redesigned the main screens with a cleaner, more consistent visual language." },
  { title: "Outcome", text: "A more focused app with clearer navigation, better hierarchy and a modern interface that puts the most-used features within easy reach." },
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
    sections: posSections,
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
    sections: kioskSections,
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
    sections: mailmindSections,
  },
  {
    slug: "design-system",
    title: "Design System",
    kind: "Design — Component library",
    category: "design",
    variant: "art",
    column: "left",
    status: "Case study",
    year: "2026",
    color: "#0E3B33",
    ink: "#E6F3EE",
    summary: "A scalable component library and token set that keeps every screen consistent.",
    role: "Product Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: designSystemSections,
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    kind: "Design — Visual identity",
    category: "design",
    variant: "art",
    column: "mid",
    status: "Case study",
    year: "2025",
    color: "#2A1D14",
    ink: "#F2E3D3",
    summary: "A distinctive visual identity with guidelines that work across digital and print.",
    role: "Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: brandSections,
  },
  {
    slug: "app-redesign",
    title: "App Redesign",
    kind: "Design — Mobile app",
    category: "design",
    variant: "art",
    column: "right",
    status: "Case study",
    year: "2025",
    color: "#7A3B22",
    ink: "#FFEBDD",
    summary: "A cleaner, easier-to-navigate mobile app that puts key features within reach.",
    role: "UX/UI Designer",
    tools: ["Figma"],
    image: null,
    liveUrl: null,
    sections: redesignSections,
  },
];
