/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:            "var(--color-bg)",
        "surface-low": "var(--color-surface-low)",
        "surface-card":"var(--color-surface-card)",
        "surface-hover":"var(--color-surface-hover)",
        "surface-high": "var(--color-surface-high)",
        "border-rest":  "var(--color-border-rest)",
        "border-hover": "var(--color-border-hover)",
        "border-subtle":"var(--color-border-subtle)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary":"var(--color-text-secondary)",
        "text-muted":   "var(--color-text-muted)",
        "text-faint":   "var(--color-text-faint)",
        accent:         "var(--color-accent)",
        "accent-dim":   "var(--color-accent-dim)",
        "footer-bg":    "var(--color-footer-bg)",
        "footer-text":  "var(--color-footer-text)",
        "footer-muted": "var(--color-footer-muted)",
        "footer-divider":"var(--color-footer-divider)",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        full: "9999px",
      },
      transitionDuration: {
        fast:  "150ms",
        base:  "250ms",
        slow:  "400ms",
      },
      animation: {
        panorama:    "panorama var(--panorama-duration) linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        panorama: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
}
