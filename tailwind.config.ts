import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
import containerPlugin from "@tailwindcss/container-queries";
import { typography } from "./src/lib/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)"],
      serif: ["var(--font-serif)"],
    },
    boxShadow: {
      DEFAULT: "var(--shadow)",
    },
    colors: {
      background: {
        DEFAULT: "hsl(var(--background))",
        accent: "hsl(var(--background-accent))",
      },
      primary: "hsl(var(--primary))",
      foreground: "hsl(var(--foreground))",
      border: "hsl(var(--border))",
      white: {
        DEFAULT: "hsl(var(--white))",
        dark: "hsl(var(--white-dark))"
      },
      black: "hsl(var(--black))",
    },
    extend: {
      maxWidth: {
        DEFAULT: "var(--container)",
        body: "var(--container-body)",
      },
      typography,
    },
  },
  plugins: [typographyPlugin, containerPlugin],
};
export default config;
