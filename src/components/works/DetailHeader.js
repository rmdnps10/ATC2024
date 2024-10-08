import Image from "next/image";
import Link from "next/link";
import styles from "./DetailHeader.module.css";
//
//
//
export default function DetailHeader({
  imgUrl,
  titleKor,
  titleEng,
  summary,
  desc,
  urls,
}) {
  return (
    <section className={styles.section}>
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className={styles.representImage}
      ></div>
      <div>
        <div></div>
        <ul>
          {/* <Link href={"/works"}></Link> */}
          <a></a>
          <a></a>
        </ul>
      </div>
    </section>
  );
}
