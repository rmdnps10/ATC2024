import Image from "next/image";
import Link from "next/link";
import styles from "./DetailHeader.module.css";
const data = {
  imageUrl: "/images/Rectangle.jpg",
  title: {
    title_kor: "작품 제목",
    title_eng: "Title",
  },
  team: {
    team_kor: "팀명",
    team_eng: "Team Name",
    names: ["최서강", "한지융", "김아텍"],
    team_desc: "팀에 대한 설명을 해주세여",
  },
  summary: "작품한 줄 소개(간단한 설명 정도면 충분할 것 같아요)",
  desc: "작품에 대한 내용을 작성하는 공간입니다.작품 스토리도 좋고, 재밌는 이야깃거리를 담아도 괜찮습니다.작품 소개를 통해서 전달하고자 하는 바가 충분히 전해지기를 바라며 작품 소개란을 채우시길!",
  location: "X423",
  urls: {
    web: "http://localhost:3000",
    instagram: "www.instagram.com",
  },
  about: {
    desc: "세부 이미지에 대한 설명입니다.단계별로 설명해도 되고, 행사 진행 이미지를 설명해도 괜찮을 것 같아요.어떤 얘기를 실을지에 대해서는 아티스트들이 직접 작성해야 할 것 같습니다.세부 이미지에 대한 설명입니다.단계별로 설명해도 되고, 행사 진행 이미지를 설명해도 괜찮을 것 같아요.어떤 얘기를 실을지에 대해서는 아티스트들이 직접 작성해야 할 것 같습니다.",
  },
};
//
//
//
export default function DetailHeader() {
  return (
    <section className={styles.section}>
      <div
        style={{ backgroundImage: `url(${data.imageUrl})` }}
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
