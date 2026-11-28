const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const base = path.join(root, "public", "projects");
const exts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];

if (!fs.existsSync(base)) {
  console.log("No public/projects directory found.");
  process.exit(0);
}

const dirs = fs
  .readdirSync(base)
  .filter(
    (d) =>
      !d.startsWith(".") &&
      !d.startsWith("_") &&
      fs.statSync(path.join(base, d)).isDirectory()
  );

const projects = dirs
  .map((slug) => {
    const dirPath = path.join(base, slug);
    const files = fs.readdirSync(dirPath);
    let info = {};
    const infoPath = path.join(dirPath, "info.json");
    if (fs.existsSync(infoPath)) {
      try {
        info = JSON.parse(fs.readFileSync(infoPath, "utf8"));
      } catch (e) {
        console.error(`Error parsing info.json in ${slug}:`, e.message);
      }
    }

    const coverFiles = files
      .filter(
        (f) =>
          f.startsWith("cover.") &&
          exts.includes(path.extname(f).toLowerCase())
      )
      .map((f) => ({
        name: f,
        mtime: fs.statSync(path.join(dirPath, f)).mtimeMs,
      }))
      .sort((a, b) => b.mtime - a.mtime);

    const coverFile = coverFiles.length > 0 ? coverFiles[0].name : null;
    const image = coverFile ? `/projects/${slug}/${coverFile}` : info.image || null;

    const galleryFiles = files
      .filter(
        (f) =>
          !f.startsWith("cover.") &&
          !f.startsWith(".") &&
          exts.includes(path.extname(f).toLowerCase())
      )
      .sort();
    const gallery = galleryFiles.map((f) => `/projects/${slug}/${f}`);

    const variant = "card";

    return {
      slug,
      title: info.title || slug,
      kind: info.kind || "Product Design",
      category: info.category || "products",
      size: info.size || "m",
      variant,
      order: typeof info.order === "number" ? info.order : 99,
      year: info.year || "2026",
      color: info.color || "#181818",
      ink: info.ink || "#F2F2F2",
      tagline: info.tagline || "",
      summary: info.summary || "",
      role: info.role || "Lead UI/UX Designer",
      tools: info.tools || ["Figma"],
      liveUrl: info.liveUrl || null,
      image,
      gallery,
      facts: info.facts || [],
      stats: info.stats || [],
      flow: info.flow || [],
      sections: (info.sections || []).map((sec) => {
        // resolve image paths in sections if specified as relative filenames
        if (Array.isArray(sec.images)) {
          return {
            ...sec,
            images: sec.images.map((img) =>
              img.startsWith("/") ? img : `/projects/${slug}/${img}`
            ),
          };
        }
        return sec;
      }),
    };
  })
  .sort((a, b) => a.order - b.order);

// Write to data/projects.json
const projectsJsonPath = path.join(root, "data", "projects.json");
fs.writeFileSync(projectsJsonPath, JSON.stringify(projects, null, 2), "utf8");

// Update data/site.js to export projects from projects.json
const siteJsPath = path.join(root, "data", "site.js");
let siteJs = fs.readFileSync(siteJsPath, "utf8");

// If site.js does not yet import projects from projects.json:
const marker = "// PROJECTS_AUTO_SYNC";
const exportBlock = `${marker}
import projectsData from "./projects.json";
export const projects = projectsData;
`;

if (siteJs.includes(marker)) {
  const parts = siteJs.split(marker);
  siteJs = parts[0] + exportBlock;
} else if (siteJs.includes("export const projects = [")) {
  const idx = siteJs.indexOf("export const projects = [");
  siteJs = siteJs.slice(0, idx) + exportBlock;
}

fs.writeFileSync(siteJsPath, siteJs, "utf8");
console.log(`Successfully synced ${projects.length} projects to data/projects.json and data/site.js.`);
