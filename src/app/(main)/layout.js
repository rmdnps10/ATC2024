import Header from "./Header";
import "@/style/global.css";

export const metadata = {
  title: "ATC 2024 : 코끼리를 냉장고에 넣는 방법",
  description: "코끼리를 냉장고에 넣는 방법, 2024년 Art&Technolgoy 컨퍼런스 웹",
};

export default function MainRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
