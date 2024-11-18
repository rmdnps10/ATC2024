import styles from './page.module.css'
import Image from 'next/image'
import InfiniteBanner from '@/components/about/InfiniteBanner'
import TypingDescription from '@/components/about/TypingDescription'
import ToCreditPage from '@/components/about/ToCreditPage'
//
//
//
export const metadata = {
  title: 'About · 코끼리를 냉장고에 넣는 방법',
  metadataBase: new URL('https://www.atc2024.site/'),
  description:
    '2024년 Art&Technology 컨퍼런스의 소개 페이지입니다. ATC 2024의 주제와 관련된 소개 영상과 축사를 확인해보세요!'
}
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
            src="/icon/logo/atc-typography.svg"
            alt="2024 atc 공식 타이포그래피"
            layout="fill"
          />
        </div>
        <div className={styles.title}>
          <Image
            src="/icon/logo/atc_slogan_horizontal_black.png"
            alt="2024 atc 공식 타이틀"
            layout="responsive"
            width={924}
            height={126}
          />
          <Image
            src="/icon/logo/atc_slogan_vertical_black.png"
            alt="2024 atc 공식 타이틀"
            layout="responsive"
            width={542}
            height={444}
          />
        </div>
      </section>
      <div className={styles.subtitle}>
        <p>코끼리를 냉장고에 넣는 방법이란?</p>
      </div>
      <div className={styles.videoWrapper}>
        <section className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/F1Kab1fGy0A?si=EpG1I9iCLU8rXSMb"
            title="atc2024 공식 영상"
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
            <Image
              src="images/about/quotation.svg"
              alt="쉼표 아이콘"
              width={123}
              height={106}
            />
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
              <span>
                반갑습니다 ! ATC2024 : 코끼리를 냉장고에 넣는 법의 크리에이티브
                디렉터를 맡은 임동준입니다.
              </span>
              <br />
              <br />
              아트&테크놀로지는 무엇을 하는 학과일까요? 4학년이 된 지금도 이
              질문에 답하기에 참 많은 생각이 스쳐갑니다. 명쾌한 한 문장으로
              설명하기는 어려워도 ‘코끼리를 냉장고에 넣는 방법’ 그 문장이 질문과
              닮아있다는 생각을 합니다. 이 문장은 보는 사람으로 하여금 독특하고
              이상한 생각을 하게 만들더라구요. <br />
              <br />
              많은 아테커가 모여, 전시를 만들었습니다. 평소 낯설었던 아텍에 대해
              알아가는 자리가 되었으면 합니다. 웹 뿐만 아니라 서강대학교
              하비에르 관에서도 진행됩니다. 부담 없이 방문해 주세요. 많은 관심
              부탁드립니다. 감사합니다.
            </p>
            <Image
              src="images/about/quotation.svg"
              alt="쉼표 아이콘"
              width={123}
              height={106}
            />
          </blockquote>
        </div>
      </section>
      <InfiniteBanner />
      <ToCreditPage />
    </main>
  )
}
