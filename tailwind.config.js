import keepPreset from "keep-react/src/keep-preset.js";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [keepPreset],
  plugins: [
    require("daisyui"),
    require("tailwindcss-gradients"),
    require('tailwind-scrollbar'),
  ],
  theme: {
    extend: {
      colors: {
        "gradient-custom": "linear-gradient(to right, #10e2ee, #04ffa3)",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "dim"],
  },
};
