import keepPreset from "keep-react/src/keep-preset.js";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        leafGreen: {
          400: "#85c226",
          500: "#4b740b",
        },
        skyGlow: {
          200: "#222222",
        }
      }
    }
  },
  daisyui: {
    themes: ["light", "dark"],
  }
};
