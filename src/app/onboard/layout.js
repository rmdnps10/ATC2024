export const metadata = {
  title: "ATC onboarding page",
  description: "2024년 아트엔 테크놀리지 컨퍼런스의 온보딩 페이지",
};

export default function OnBoardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>onboard</header>
        {children}
      </body>
    </html>
  );
}
