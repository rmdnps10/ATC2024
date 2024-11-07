'use client'
import styles from './page.module.css'
import Image from 'next/image'
import InfiniteBanner from '@/components/about/InfiniteBanner'
import TypingDescription from '@/components/about/TypingDescription'
import ToCreditPage from '@/components/about/ToCreditPage'

//
//
//
export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <div className={styles.cyan1}></div>
        <div className={styles.cyan2}></div>
        <div className={styles.cyan3}></div>
        <div className={styles.cyan4}></div>
        <div className={styles.cyan5}></div>
        <div className={styles.pink1}></div>
        <div className={styles.pink2}></div>
        <div className={styles.pink3}></div>
        <div className={styles.blue1}></div>
        <div className={styles.blue2}></div>
        <div className={styles.blue3}></div>
      </div>

      <div className={styles.components}>
        <Image
          src="images/about/component1.svg"
          alt="2024 atc 서브 컴포넌트"
          width={330.43}
          height={554.85}
        />
        <Image
          src="images/about/component2.svg"
          alt="2024 atc 서브 컴포넌트"
          width={264.51}
          height={196.31}
        />
        <Image
          src="images/about/component3.svg"
          alt="2024 atc 서브 컴포넌트"
          width={343}
          height={343}
        />
        <Image
          src="images/about/component4.svg"
          alt="2024 atc 서브 컴포넌트"
          width={253}
          height={262}
        />
        <Image
          src="images/about/component5.svg"
          alt="2024 atc 서브 컴포넌트"
          width={240}
          height={240}
        />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <section className={styles.imageContainer}>
        <div className={styles.typography}>
          <Image
            src="icon/logo/atc-typography.svg"
            alt="2024 atc 공식 타이포그래피"
            layout="fill"
          />
        </div>
        <div className={styles.title}>
          <Image
            src="icon/logo/atc-title.svg"
            alt="2024 atc 공식 타이틀"
            layout="fill"
          />
        </div>
      </section>
      <div className={styles.subtitle}>
        <p>코끼리를 냉장고에 넣는 방법이란?</p>
      </div>
      <div className={styles.videoWrapper}>
        <section className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/_GNQDgsa5GE?si=sC-lJBJ70MJnZ5MY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        </section>
      </div>
      <TypingDescription />
      <section className={styles.quote}>
        <div>
          <blockquote>
            <p className={styles.quoteTitle}>최용순 교수님 축사</p>
            <p>
              서강대학교 Art & Technology 학과에서 《코끼리를 냉장고에 넣는
              방법》이라는 주제로 제13회 Art & Technology Conference (ATC)를
              개최합니다. <br />
              <br />
              2012년 부터 매해 학생들이 직접 기획, 제작, 운영해 오고 있는 ATC는
              차세대 크리에이터인 학생들의 초학제적 융합과 경계 없는 다양한
              실험과 상상력 넘치는 탐험을 통해 서로 자극받고 즐기는 하나의
              놀이이자 축제이며, 또한 창의성 발현의 장으로서 공유하고, 협력의
              중요성을 다시 한번 되새기는 소중한 교육의 기회입니다.
              <br />
              <br />
              48명의 스태프들과 138명의 아티스트들이 6개월 넘게 준비해 온 이번
              ATC 2024는 11월 20일부터 23일 4일동안 서강대학교 하비에르관
              4/5층에서 진행될 예정입니다. <br />
              <br />
              가끔은 답이 없고 불가능 일처럼 해결 할 수 없을 것만 같은 일들을
              종종 만나게 됩니다. 이번 ATC 2024 《코끼리를 냉장고에 넣는 방법》
              을 통해 불가능하다고 생각한것들에 대한 미래 크리에이터들의
              도발적이고 엉뚱하며 재기발랄한 이야기들을 만날 수 있습니다. <br />
              <br />
              여러분들을 정중히 ATC 2024에 초대합니다.
            </p>
          </blockquote>
          <blockquote>
            <p className={styles.quoteTitle}>Director 한마디</p>
            <p>
              제작에 기여한 사람들, 회사, 또는 단체를 인정하고 감사하는 역할을
              합니다. 크레딧은 보통 디자인, 개발, 콘텐츠 작성, 사진, 영상, 음악
              등 다양한 분야에서 기여한 이들의 이름을 포함합니다. 이는
              방문자에게 웹사이트의 제작 배경을 이해시키고, 기여자들에게 공로를
              인정하는 중요한 부분입니다. 또한, 크레딧은 웹사이트의 신뢰성을
              높여주며, 기여자들이 자신의 작업을 포트폴리오에 포함할 수 있는
              근거가 됩니다.
            </p>
          </blockquote>
        </div>
      </section>
      <InfiniteBanner />
      <ToCreditPage />
    </main>
  )
}
