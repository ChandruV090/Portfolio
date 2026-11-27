// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio. No other file needs
//  to change for text, links, projects, tools or to-dos.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Chandru Velayudham",
  handle: "@chandru",
  avatar: "/chandru.jpg",
  role: "Lead UI/UX Designer",
  company: null,
  tagline:
    "13+ years crafting intuitive SaaS platforms, design systems, and accessible user experiences. Blending strategic product thinking with polished visual design.",
  status: "Open to work",
  currently: null,
  email: "vchandru090@gmail.com",
  cvUrl: "/Chandru-Velayudham-CV.pdf",
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
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/chandru-velayudham-a4042414a/" },
    { label: "Behance", icon: "behance", href: "https://www.behance.net/ChandruVelayudham" },
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
// PROJECTS_AUTO_SYNC
import projectsData from "./projects.json";
export const projects = projectsData;
