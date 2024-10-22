import localFont from "next/font/local";

export const Pretendard = localFont({
  variable: "--font-pretendard",
  src: [
    {
      path: "./Pretendard-Bold.woff",
      weight: "600",
    },
    {
      path: "./Pretendard-Medium.woff",
      weight: "500",
    },
    {
      path: "./Pretendard-Regular.woff",
      weight: "400",
    },
    {
      path: "./Pretendard-ExtraLight.woff2",
      weight: "200",
    },
  ],
});
