import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stark: "#3A3B6D",
        lannister: "#6D3A3A",
        targaryen: "#6D3A6D",
      },
    },
  },
  plugins: [],
} satisfies Config;
