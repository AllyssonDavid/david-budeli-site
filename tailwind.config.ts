import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "#050505",
          1: "#0F1115",
          2: "#171A20",
          3: "#1E2229",
        },
        accent: {
          DEFAULT: "#3B82F6",
          bright: "#60A5FA",
          glow: "rgba(59,130,246,0.15)",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          glow: "rgba(139,92,246,0.1)",
        },
        ice: "#E2E8F0",
        muted: "#64748B",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-premium":
          "linear-gradient(135deg, #fff 0%, #60A5FA 50%, #8B5CF6 100%)",
        "grid-tech":
          "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
        "grid-lg": "80px 80px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(59,130,246,0.2)" },
          to: { boxShadow: "0 0 25px rgba(59,130,246,0.5)" },
        },
      },
      backdropBlur: {
        premium: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
