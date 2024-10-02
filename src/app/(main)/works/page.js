"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const tabRefs = useRef([]);
  const tabListRef = useRef();
  const [tabSelected, setTabSelected] = useState(0);
  const [clickedId, setClickedId] = useState(null);
  useEffect(() => {
    tabRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.fontSize = idx === 0 ? "2.3rem" : "1.8rem";
        ref.style.fontWeight = idx === 0 ? "600" : "500";
        ref.style.color = idx === 0 ? "black" : "#767676";
      }
    });
    tabListRef.current.style.transform = `translate(${
      -10 * (1 + 0 * 4)
    }%, -50%)`;
  }, []);
  function handleClick(key) {
    setClickedId(key);
    setTimeout(() => {
      router.push(`/works/${key}`);
    }, 300);
  }
  function handleTabClick(key) {
    tabRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.fontSize = idx === key ? "2.1rem" : "1.8rem";
        ref.style.fontWeight = idx === key ? "600" : "500";
        ref.style.color = idx === key ? "black" : "#767676";
      }
    });
    tabListRef.current.style.transform = `translate(${
      -10 * (1 + key * 4)
    }%, -50%)`;
  }
  return (
    <main className={styles.main}>
      <nav>
        <div className="indicator"></div>
        <ul ref={tabListRef}>
          {tabList.map((el, key) => (
            <li
              key={key}
              ref={(el) => (tabRefs.current[key] = el)}
              onClick={() => handleTabClick(key)}
            >
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
                zIndex: 150,
                backgroundColor: "white",
              }}
              transition={{ ease: "easeInOut", duration: 0.33 }}
              layoutId={clickedId}
              className={styles.animateBox}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
