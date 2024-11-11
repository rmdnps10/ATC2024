import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import ScrollContainer from '@/components/archive/Container'

export default function ArchivePage() {
  return (
    <>
      <main className={styles.main}>
        <article>
          <h1>
            <div className={styles.pcOnly}>
              <Image
                src={'/images/archive/atc-slogan-black.png'}
                alt="코끼리를 냉장고에 넣는법"
                priority={true}
                width={402}
                height={54}
              />
            </div>
            <div className={styles.mobileOnly}>
              <Image
                src={'/icon/logo/atc_slogan_vertical_black.png'}
                alt="코끼리를 냉장고에 넣는법"
                priority={true}
                width={150}
                height={120}
              />
            </div>
            <span>의 작업과정을 소개합니다.</span>
          </h1>
          <p>
            가로 스크롤을 통해 시간 순서대로 2024 ATC가 만들어진 과정을 감상하실
            수 있습니다. 컨텐츠를 클릭하시면 각 단계를 더 자세하게 만나보실 수
            있습니다. <br />
            <br />
            ATC를 만든 사람들이 궁금하다면?
          </p>
          <Link href={'/credit'}>
            <button>ATC 크레딧</button>
          </Link>
        </article>
        <ScrollContainer />
      </main>
      <div
        id="modal-root"
        style={{ zIndex: 9999, position: 'relative' }}></div>
    </>
  )
}
