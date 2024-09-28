"use-client"; 
import styles from "./page.module.css";
import Image from "next/image";
//
//
//
export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.imageContainer}>
        <Image
          src="logo/atc-title.svg"
          alt="2024 atc 공식 타이틀"
          width={938}
          height={143}
        />
      </section>
      <div className={styles.videoWrapper}>
        <section className={styles.videoContainer}>
        <video 
          controls
        />
        </section>
      </div>

      <section className={styles.articles}>
        <article>
          <p>
          우리는 모두 해결할 수 없을 것 같은 도전과 마주합니다. &lt;코끼리를 냉장고에 넣는 방법&gt;은 이 불가능해 보이는 도전에 대한 아트&테크놀로지의 물음입니다. 
          그리고 아트&테크놀로지는 예술과 기술이라는, 거대한 두 축을 통해 이 물음에 답하고자 합니다. <br /> <br />
          예술은 과감해졌고, 기술은 정교해졌습니다. 
          아트&테크놀로지라는 사회 속에서 우리는 항상 그 사이의 미묘한 균형을 찾고 있습니다. 
          자유로운 표현의 바다와 정밀한 구조의 정글 사이에서, 각자의 길을 개척하며, 걷습니다. 
          &lt;ATC 2024&gt;에서 수많은 작품들은 다양한 색채와 형태로 질문에 대답하며, 저마다 다른 방식으로 이 도전과 마주합니다.
          </p>
        </article>
        <article>
          <p>
          이 ‘방식’은 각기 다를 것입니다. 어떤 이는 냉장고를 확장하고, 다른 이는 코끼리를 축소합니다. 
          또 어떤 이는 그 사이의 빈 공간을 새롭게 정의합니다. 어쩌면 세상에 없던 것을 가져오는 사람도 있을지 모릅니다. 
          이 전시는 그 아트&테크놀로지에 속한 ‘아테커’ 각자의 ‘방법’을 보여주는 공간입니다. <br /> 
          ATC 2024, &lt;코끼리를 냉장고에 넣는 방법&gt;은 이 도전을 함께 상상하고, 그 안에서 발견한 가능성의 이야기를 여러분과 나누고자 합니다. 
          이 전시는 아테커들이 각자의 시선에서 풀어낸 수많은 이야기들을 공유하는 공간이 될 것입니다. 
          그리고 아트&테크놀로지의 이러한 시도가, 관객 여러분에게도 새로운 물음을 던지는 작은 열쇠가 되기를 희망합니다.
          </p>
        </article>
      </section>

      <section className={styles.quote}>
        <blockquote>
          <p className={styles.quoteTitle}>OOO 교수님 축사</p>
          <p>
            제작에 기여한 사람들, 회사, 또는 단체를 인정하고 감사하는 역할을 합니다. 
            크레딧은 보통 디자인, 개발, 콘텐츠 작성, 사진, 영상, 음악 등 다양한 분야에서 기여한 이들의 이름을 포함합니다. 
            이는 방문자에게 웹사이트의 제작 배경을 이해시키고, 기여자들에게 공로를 인정하는 중요한 부분입니다. 
            또한, 크레딧은 웹사이트의 신뢰성을 높여주며, 기여자들이 자신의 작업을 포트폴리오에 포함할 수 있는 근거가 됩니다.
          </p>
        </blockquote>
        <blockquote>
          <p className={styles.quoteTitle}>Director 한마디</p>
          <p>
            제작에 기여한 사람들, 회사, 또는 단체를 인정하고 감사하는 역할을 합니다. 
            크레딧은 보통 디자인, 개발, 콘텐츠 작성, 사진, 영상, 음악 등 다양한 분야에서 기여한 이들의 이름을 포함합니다. 
            이는 방문자에게 웹사이트의 제작 배경을 이해시키고, 기여자들에게 공로를 인정하는 중요한 부분입니다. 
            또한, 크레딧은 웹사이트의 신뢰성을 높여주며, 기여자들이 자신의 작업을 포트폴리오에 포함할 수 있는 근거가 됩니다.
          </p>
        </blockquote>
      </section>
      <section className={styles.credit}>
        <div>
          <p>Credit</p>
          <p>ATC를 함께 만들어간 분들을 소개합니다</p>
        </div>
      </section>
    </main>
  );
}

