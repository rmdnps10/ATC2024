import Image from 'next/image'
import styles from './page.module.css'
export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <div>오프라인 맵 | OFFLINE MAP</div>
        <div>
          <span>2024 ATC : 코끼리를 냉장고에 넣는 방법</span>은<br />
          서강대학교 <span>하비에르관(X관) 4층&5층과 로욜라도서관 1층</span>에서
          진행됩니다. 아래 지도에서 공간 별로 전시되는 작품들을 확인해보세요!
        </div>
      </header>
      <section>
        <ul>
          <li>하비에르관 4F</li>
          <li>하비에르관 5F</li>
          <li>로욜라도서관 1관</li>
        </ul>
        <div>
          <span>
            <Image></Image>
          </span>
          <span>
            <Image></Image>
          </span>
          <span>
            <Image></Image>
          </span>
        </div>
        <Image></Image>
        <Image></Image>
      </section>
    </main>
  )
}
