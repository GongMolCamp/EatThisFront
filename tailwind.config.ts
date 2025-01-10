import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFF3E0", // 연한 주황
          DEFAULT: "#FFA726", // 메인 주황
          dark: "#F57C00", // 진한 주황
        },
        secondary: {
          light: "#E3F2FD", // 연한 파랑
          DEFAULT: "#4A90E2", // 메인 파랑
          dark: "#1976D2", // 진한 파랑
        },
        beige: {
          light: "#FFF9E6",
          DEFAULT: "#FFF3E0",
          dark: "#FFE0B2",
        },
        gray: {
          lightest: "#F5F5F5",
          light: "#E3F2FD",
          DEFAULT: "#A0A0A0",
          dark: "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)"],
        logo: ["var(--font-logo)"],
      },
      fontSize: {
        title: ["24px", { lineHeight: "1.4", fontWeight: "700" }], // 제목
        subtitle: ["18px", { lineHeight: "1.4", fontWeight: "500" }], // 부제목
        body: ["16px", { lineHeight: "1.4", fontWeight: "400" }], // 본문
        caption: ["14px", { lineHeight: "1.4", fontWeight: "400" }], // 보조 텍스트
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
