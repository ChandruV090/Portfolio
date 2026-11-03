import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { site } from "../data/site";
import CursorTrail from "../components/CursorTrail";

export const metadata = {
  title: `${site.name} — ${site.role}`,
  description: `Portfolio of ${site.name}, ${site.role}. ${site.tagline}`,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141210",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CursorTrail />
      </body>
    </html>
  );
}
