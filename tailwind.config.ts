import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dofus: {
          gold: "#D4A853",
          brown: "#8B6914",
          green: "#4A7C59",
          blue: "#2E5E8E",
          red: "#C24B3B",
          purple: "#6B4C9A",
          dark: "#0F0F1A",
          darker: "#080812",
          card: "#161625",
          border: "#2A2A40",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "dofus-gradient":
          "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.4)",
        "glow-gold": "0 0 20px rgba(212, 168, 83, 0.3)",
        "glow-blue": "0 0 20px rgba(46, 94, 142, 0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
