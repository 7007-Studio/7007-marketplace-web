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

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderColor: {
      neutral,
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
    textColor: {
      primary: "#FFC900",
      secondary: "#222027",
      neutral,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      neutral,
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        "light-7007": {
          "color-scheme": "light",
          primary: "#FFC900",
          secondary: "#222027",
          "secondary-content": "#FFFFFF",
          "base-100": "#F5F5F5",
          "base-content": "#4E4B55",
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
};
export default config;
