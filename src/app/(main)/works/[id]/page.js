"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import DetailHeader from "@/components/works/DetailHeader";
import DetailAbout from "@/components/works/DetailAbout";
import DetailReservation from "@/components/works/DetailReservation";
import DetailArtist from "@/components/works/DetailArtist";
import DetailGuestBook from "@/components/works/DetailGuestBook";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
//
//
//
export default function WorkDetailPage() {
  const pathname = useParams();
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  function handleExit() {
    setIsClicked(true);
    setTimeout(() => {
      router.push("/works");
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
            <DetailHeader />
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
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    transition: `scaleX 0.33s ease`,
  },
  transition: { ease: "ease", duration: 0.33 },
};

// initial={{
//   scaleX: 0,
//   scaleY: 0,
//   opacity: 0,
//   background: "none",
// }}
// animate={{
//   scaleX: 1,
//   scaleY: 1,
//   opacity: 1,
//   background: "none",
// }}
// exit={{
//   scaleX: 0,
//   scaleY: 0,
//   opacity: 0,
//   background: "none",
// }}
// transition={{ ease: "easeInOut", duration: 0.5 }}
