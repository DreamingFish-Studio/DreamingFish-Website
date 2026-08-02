import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#071111",
        forest: "#0b2522",
        mist: "#d9f7ef",
        aqua: "#58dbc5",
        gold: "#e5c878"
      },
      boxShadow: {
        glow: "0 0 42px rgba(88, 219, 197, 0.18)"
      },
      opacity: {
        "8": "0.08",
        "12": "0.12",
        "14": "0.14",
        "15": "0.15",
        "18": "0.18",
        "22": "0.22",
        "25": "0.25",
        "30": "0.3",
        "35": "0.35",
        "45": "0.45",
        "58": "0.58",
        "62": "0.62",
        "66": "0.66",
        "68": "0.68",
        "70": "0.7",
        "72": "0.72",
        "75": "0.75",
        "76": "0.76",
        "78": "0.78",
        "80": "0.8",
        "82": "0.82",
        "85": "0.85",
        "86": "0.86",
        "88": "0.88",
        "92": "0.92",
        "95": "0.95"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
