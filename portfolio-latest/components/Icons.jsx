export function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r=".8" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M8 10.5V16M8 7.9v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16" />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path d="M3 7h4.6a2.1 2.1 0 010 4.2H3zM3 11.2h5.2a2.5 2.5 0 010 5H3zM3 7v9.2" />
          <path d="M14 8h6M13.8 13.5h6.2a3 3 0 00-6.2 0zM14.2 14.5a2.8 2.8 0 005.2 1" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M5 8.5c4 .5 9 .2 12.5-2.8M8.5 4c3.2 3.4 5.5 8.2 6.2 15.2M3.8 13c4.5-1.2 10-1.2 16.4 1" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M5 4h3.5l10.5 16h-3.5zM18.5 4L5.5 20" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <path d="M4 7.5l8 6 8-6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17L17 7M8.5 7H17v8.5" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
