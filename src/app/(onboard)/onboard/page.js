// page.js
"use client";

import styles from "./page.module.css";
import Scene from "../../../components/onboard/Scene";

export default function OnBoardPage() {
  return <div className={styles.root}>
    <Scene />
  </div>;
}