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
      mono: ["var(--font-mono)"],
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
      white: "hsl(var(--white))",
      black: "hsl(var(--black))",
      cream: {
        DEFAULT: "hsl(var(--cream))",
        dark: "hsl(var(--cream-dark))",
      },
      grey: {
        DEFAULT: "hsl(var(--grey))",
        dark: "hsl(var(--grey-dark))",
      },
      blue: {
        light: "hsl(var(--blue-light))",
        "light-muted": "hsl(var(--blue-light-muted))",
        DEFAULT: "hsl(var(--blue))",
        "dark-muted": "hsl(var(--blue-dark-muted))",
        dark: "hsl(var(--blue-dark))",
      },
      yellow: {
        DEFAULT: "hsl(var(--yellow))",
        light: "hsl(var(--yellow-light))",
      },
      green: {
        DEFAULT: "hsl(var(--green))",
        light: "hsl(var(--green-light))",
      },
      red: {
        DEFAULT: "hsl(var(--red))",
        light: "hsl(var(--red-light))",
      },
    },
    extend: {
      spacing: {
        header: "var(--header)",
      },
      borderRadius: {
        DEFAULT: "var(--rounded)",
        button: "var(--rounded-button)",
      },
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
