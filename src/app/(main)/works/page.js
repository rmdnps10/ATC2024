"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { worksData } from "@/components/works/MockData";
//
//
//
export default function WorksPage({}) {
  const tabList = ["ALL", "GAME", "UI/UX"];
  const router = useRouter();
  const tabRefs = useRef([]);
  const tabListRef = useRef();
  const [tabSelected, setTabSelected] = useState("ALL");
  const [clickedId, setClickedId] = useState(null);
  const [works, setWorks] = useState(worksData);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    //필터링 탭에 useRef
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
    //스크롤 인식
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handleWorkClick(key) {
    setClickedId(key);
    setTimeout(() => {
      router.push(`/works/${key}`, undefined, { shallow: true });
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
    setTabSelected(key);
    if (key === 0) {
      setWorks(worksData);
    } else {
      setWorks(worksData.filter((el) => el.category === tabList[key]));
    }
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
        {works.map((el) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layoutId={el.id}
            onClick={() => handleWorkClick(el.id)}
            className={styles.figure}
            key={el.id}
          >
            <Image
              className={styles.image}
              src={el.imgUrl}
              alt={el.title.title_kor}
              fill
            />
            <figcaption>
              <div className={styles.figCategory}>{el.category}</div>
              <div className={styles.figBox}>
                <span className={styles.figTeam}>{el.team.team_kor}</span>
                <span className={styles.figTitle}>{el.title.title_kor}</span>
                <span className={styles.figDesc}>{el.desc}</span>
              </div>
            </figcaption>
          </motion.div>
        ))}
      </section>
      <AnimatePresence>
        {clickedId !== null && (
          <motion.div
            style={{ transform: `translateY(${scrollY - 100}px)` }}
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
              }}
              animate={{
                width: "100vw",
                height: "200vh",
                opacity: 1,
              }}
              exit={{
                width: "100%",
                height: "100%",
                opacity: 0,
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
