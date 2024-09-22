"use-client";
import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="logo/atc-logo.svg"
        alt="2024 atc 공식 로고"
        width={76}
        height={42}
      />
      <ul>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/work"}>Work</Link>
        </li>
        <li>
          <Link href={"/program"}>Program</Link>
        </li>
        <li>
          <Link href={"/archive"}>Archive</Link>
        </li>
        <li>
          <Link href={"/map"}>Maps</Link>
        </li>
      </ul>
    </header>
  );
}
