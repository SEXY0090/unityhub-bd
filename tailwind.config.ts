import type { Config } from "tailwindcss";
export default {
  content:["./app/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme:{extend:{colors:{ink:"#101828",brand:"#635bff",mint:"#a7f3d0"},boxShadow:{soft:"0 18px 60px rgba(16,24,40,.08)"},fontFamily:{sans:["Arial","sans-serif"]}}},
  plugins:[]
} satisfies Config;
