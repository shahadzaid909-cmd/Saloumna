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
        background: "#F0FDFA", // Soft cyan
        primary: "#8B5CF6",    // Vibrant Purple
        accent: "#FBBF24",     // Vibrant Yellow
        success: "#10B981",    // Juicy Green
        error: "#EF4444"       // Candy Red
      },
      fontFamily: {
        kid: ["Tajawal", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
