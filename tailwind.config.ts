
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        // Theme colors
        dracula: {
          background: "#282a36",
          foreground: "#f8f8f2",
          selection: "#44475a",
          comment: "#6272a4",
          red: "#ff5555",
          orange: "#ffb86c",
          yellow: "#f1fa8c",
          green: "#50fa7b",
          purple: "#bd93f9",
          cyan: "#8be9fd",
          pink: "#ff79c6",
        },
        monokai: {
          background: "#272822",
          foreground: "#f8f8f2",
          selection: "#49483e",
          comment: "#75715e",
          red: "#f92672",
          orange: "#fd971f",
          yellow: "#e6db74",
          green: "#a6e22e",
          blue: "#66d9ef",
          purple: "#ae81ff",
        },
        solarized: {
          background: "#002b36",
          foreground: "#839496",
          selection: "#073642",
          comment: "#586e75",
          red: "#dc322f",
          orange: "#cb4b16",
          yellow: "#b58900",
          green: "#859900",
          blue: "#268bd2",
          cyan: "#2aa198",
          violet: "#6c71c4",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        "waveform": {
          "0%, 100%": { height: "20%" },
          "25%": { height: "100%" },
          "50%": { height: "50%" },
          "75%": { height: "80%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s infinite ease-in-out",
        "waveform": "waveform 0.8s infinite ease-in-out",
        "shimmer": "shimmer 2s infinite linear"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
