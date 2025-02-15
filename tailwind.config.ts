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
      black: {
        DEFAULT: "hsl(var(--black))",
        medium: "hsl(var(--black-medium))"
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "0.75rem",
        sm: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
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
