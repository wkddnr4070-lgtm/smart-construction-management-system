import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d8eaff",
          500: "#2f80ed",
          700: "#1f5fb4"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
