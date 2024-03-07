import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const neutral = {
  "25": "#F5F5F5",
  "50": "#EAEAEB",
  "100": "#D3D2D4",
  "200": "#A7A6A9",
  "300": "#4E4B55",
  "400": "#302E35",
  "500": "#222027",
  "700": "#141317",
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      sm: [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: 500,
        },
      ],
      base: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: 500,
        },
      ],
      lg: [
        "20px",
        {
          lineHeight: "24px",
          fontWeight: 700,
        },
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      neutral,
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        neutral,
      },
      textColor: {
        primary: "#FFC900",
        secondary: "#222027",
        neutral,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        "light-7007": {
          "color-scheme": "light",
          primary: "#FFC900",
          secondary: "#222027",
          "secondary-content": "#FFFFFF",
          "base-100": "#EAEAEB",
          "base-content": "#141317",
          "--padding-card": "24px",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "--rounded-box": "2px",
          primary: "#00D5FF",
          "base-100": "#3B3B3B",
          "--rounded-btn": "2px",
          // "--fallback-bc": "#FFF",
        },
      },
    ],
  },
} satisfies Config;
export default config;
