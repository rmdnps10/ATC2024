"use-client";

import Image from "next/image";
import styles from "./page.module.css";
//
//
//
export default function WorksPage() {
  const tabList = ["ALL", "GAME", "UI/UX"];
  const worksList = Array(12).fill({
    imgUrl: "/images/Rectangle.jpg",
    team: "팀 이름",
    title: "작품 타이틀",
    desc: "작품에 대한 설명 입니다.",
  });
  return (
    <main className={styles.main}>
      <nav>
        <ul>
          {tabList.map((el, key) => (
            <li key={key}>
              <span>{el}</span>
            </li>
          ))}
        </ul>
        <div className="indicator"></div>
      </nav>
      <section>
        {worksList.map((el, key) => (
          <figure key={key}>
            <Image className="image" src={el.imgUrl} alt={el.title} fill />
            <figcaption>
              <span>{el.team}</span>
              <span>{el.title}</span>
              <span>{el.desc}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
