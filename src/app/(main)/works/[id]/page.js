"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import DetailHeader from "@/components/works/DetailHeader";
import DetailAbout from "@/components/works/DetailAbout";
import DetailReservation from "@/components/works/DetailReservation";
import DetailArtist from "@/components/works/DetailArtist";
import DetailGuestBook from "@/components/works/DetailGuestBook";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { worksData } from "@/components/works/MockData";
//
//
//
export default function WorkDetailPage() {
  const pathname = useParams();
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    if (pathname.id) {
      setDetailData(worksData[Number(pathname.id)]);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: -1, left: 0, behavior: "smooth" });
    }, 100);
    // document
    //   .querySelector("meta[name=viewport]")
    //   .setAttribute(
    //     "content",
    //     "width=device-width, user-scalable=no, initial-scale=" +
    //       1 / window.devicePixelRatio +
    //       ""
    //   );
  }, []);

  function handleExit() {
    setIsClicked(true);
    setTimeout(() => {
      router.back();
    }, 330);
  }

  return (
    <AnimatePresence>
      {!isClicked && (
        <motion.div
          key={pathname.id}
          initial={animate.initial}
          animate={animate.animate}
          exit={animate.exit}
          transition={animate.transition}
        >
          <main className={styles.main} onClick={handleExit}>
            <DetailHeader
              imgUrl={detailData?.imgUrl}
              titleKor={detailData?.title.title_kor}
              titleEng={detailData?.title.title_eng}
              summary={detailData?.summary}
              desc={detailData?.desc}
              urls={detailData?.urls}
            />
            <DetailAbout />
            <DetailReservation />
            <DetailArtist />
            <DetailGuestBook />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const animate = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
  exit: {
    transform: `translateY(50px)`,
    transition: `transform 0.33s ease`,
  },
  transition: { ease: "ease", duration: 0.33 },
};
