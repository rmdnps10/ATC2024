"use client";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useState } from "react";
import Transition from "./template";
import Template from "./template";
//
//
//
export default function WorksPage({ children }) {
  const tabList = ["ALL", "GAME", "UI/UX"];
  const worksList = Array(12).fill({
    category: tabList[1],
    imgUrl: "/images/Rectangle.jpg",
    team: "team elephant",
    title: "코끼리를 냉장고에 넣는 23가지 방법",
    // title: "@OMO_unofficial",
    desc: "작품에 대한 설명 입니다.",
  });
  const [tabSelected, setTabSelected] = useState("ALL");
  return (
    <main className={styles.main}>
      <div className={styles.detailPage}>
        <Template>{children}</Template>
      </div>
      <nav>
        <div className="indicator"></div>
        <ul>
          {tabList.map((el, key) => (
            <li key={key}>
              <span>{el}</span>
            </li>
          ))}
        </ul>
      </nav>
      <section>
        {worksList.map((el, key) => (
          <figure key={key}>
            <Image
              className={styles.image}
              src={el.imgUrl}
              alst={el.title}
              fill
            />
            <figcaption>
              <Link href={`/works/${key}`} className={styles.link}>
                {1}
              </Link>
              <div className={styles.figCategory}>{el.category}</div>
              <div className={styles.figBox}>
                <span className={styles.figTeam}>{el.team}</span>
                <span className={styles.figTitle}>{el.title}</span>
                <span className={styles.figDesc}>{el.desc}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
