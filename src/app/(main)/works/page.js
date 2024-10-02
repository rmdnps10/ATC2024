"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, px } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [tabSelected, setTabSelected] = useState("ALL");
  const [clickedId, setClickedId] = useState(null);
  function handleClick(key) {
    setClickedId(key);
    setTimeout(() => {
      router.push(`/works/${key}`);
    }, 300);
  }
  return (
    <main className={styles.main}>
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
          <motion.div
            layoutId={key}
            onClick={() => handleClick(key)}
            className={styles.figure}
            key={key}
          >
            <Image
              className={styles.image}
              src={el.imgUrl}
              alt={el.title}
              fill
            />
            <figcaption>
              {/* <Link href={`/works/${key}`} className={styles.link}>
                {1}
              </Link> */}
              <div className={styles.figCategory}>{el.category}</div>
              <div className={styles.figBox}>
                <span className={styles.figTeam}>{el.team}</span>
                <span className={styles.figTitle}>{el.title}</span>
                <span className={styles.figDesc}>{el.desc}</span>
              </div>
            </figcaption>
          </motion.div>
        ))}
      </section>
      <AnimatePresence>
        {clickedId !== null && (
          <motion.div
            className={styles.animateOverlay}
            onClick={() => {
              setClickedId(null);
            }}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <motion.div
              initial={{
                width: "100vw",
                height: "100vh",
                opacity: 1,
                zIndex: 150,
                backgroundColor: "white",
              }}
              animate={{
                width: "100vw",
                height: "100vh",
                opacity: 1,
                zIndex: 150,
                backgroundColor: "white",
              }}
              exit={{
                width: "100%",
                height: "100%",
                opacity: 0,
                zIndex: 150,
                backgroundColor: "white",
              }}
              transition={{ ease: "easeInOut", duration: 0.33 }}
              layoutId={clickedId}
              className={styles.animateBox}
            >
              {
                // <Image
                //   className={styles.image}
                //   src="/images/Rectangle.jpg"
                //   alt="overlay box"
                //   // width={100}
                //   // height={200}
                //   fill
                // />
              }
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
