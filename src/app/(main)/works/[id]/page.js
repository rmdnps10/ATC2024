"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
//
//
//
export default function WorkDetailPage() {
  const pathname = useParams();
  return <main className={styles.main}>{pathname.id}</main>;
}
