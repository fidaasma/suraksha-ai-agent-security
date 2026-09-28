import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12233D",      // deep navy: text, primary buttons
        paper: "#F5F6F8",    // page background
        line: "#D9DEE6",     // borders
        muted: "#4F5D73",    // secondary text
        saffron: "#E39A0B",  // brand accent (shield mark, focus)
        pass: "#17704A",
        passbg: "#E6F4EC",
        fail: "#B42318",
        failbg: "#FCEBE9",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
