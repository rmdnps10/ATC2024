'use client'
import { useEffect, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import InfiniteBanner from '@/components/about/InfiniteBanner'
//
//
//
export default function AboutPage() {
  return (
    <main className={styles.main}>
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

      <section className={styles.description}>
        <article>
          <span>'코끼리를 냉장고에 넣는 방법'</span>은
          <Image
            src="/images/about/starBalloon.svg"
            alt="emoji"
            width={78}
            height={56}
          />
          불가능해보이는 도전에 대한 아트&테크놀로지의 물음
          <Image
            src="/images/about/starCrystal2.svg"
            alt="emoji"
            width={78}
            height={56}
          />
          입니다. 우리는 예술과 기술
          <Image
            src="/images/about/starWood 1.svg"
            alt="emoji"
            width={78}
            height={56}
          />
          이라는, 거대한 두 축
          <Image
            src="/images/about/starPaper.svg"
            alt="emoji"
            width={78}
            height={56}
          />
          을 통해 이 물음에 답하고자 합니다.
        </article>
      </section>

      <section className={styles.quote}>
        <div>
          <blockquote>
            <p className={styles.quoteTitle}>최용순 교수님 축사</p>
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

      <section className={styles.credit}>
        <div className={styles.gradContainer}>
          <div className={styles.box}>
            <p>Credit</p>
            <p>ATC를 함께 만들어간 분들을 소개합니다</p>
            <Link
              href={'/credit'}
              passHref
              className={styles.creditButton}>
              {' '}
              Credit List
              <Image
                src="/icon/button/credit-button.svg"
                alt="버튼 화살표"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
        <div className={styles.designedTags}>
          <div>A & T</div>
          <div>Atc Staff</div>
          <div>Artist</div>
        </div>
      </section>
    </main>
  )
}
