import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand500: "#8447ff",
        brand400: "#9d6cff",
        primary100: "#eff1f4",
        primary200: "#dee3e9",
        primary300: "#dee3e9",
        primary400: "#bdc6d4",
        primary500: "#adb8c9",
        primary600: "#8a93a1",
        primary700: "#686e79",
      },
      screens: {
        // Define custom max-width breakpoints
        "max-sm": { max: "639px" }, // Up to 639px
        "max-md": { max: "767px" }, // Up to 767px
        "max-lg": { max: "1023px" }, // Up to 1023px
        "max-xl": { max: "1279px" }, // Up to 1279px
      },
    },
  },
  plugins: [],
};
export default config;
