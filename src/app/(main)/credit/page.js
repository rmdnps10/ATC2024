'use client'
import Image from 'next/image'
import styles from './page.module.css'
//
//
//
export default function CreditPage() {
  return (
    <main className={styles.main}>
      <div className={styles.selectOption}>
        <div>
          <p>ATC STAFF</p>
          <p>ATC ARTIST</p>
          <Image
            src="/images/credit/option1.svg"
            width="103"
            height="31"
          />
          <Image
            src="/images/credit/option2.svg"
            width="103"
            height="31"
          />
        </div>
      </div>
      <article className={styles.containerList}>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol9.svg"
              width="28"
              height="28"
            />
            <h1>Creative Director</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol8.svg"
              width="28"
              height="28"
            />
            <h1>웹개발팀</h1>
          </div>

          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol7.svg"
              width="28"
              height="28"
            />
            <h1>기획팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol6.svg"
              width="28"
              height="28"
            />
            <h1>디자인팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol5.svg"
              width="28"
              height="28"
            />
            <h1>대외협력팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol4.svg"
              width="28"
              height="28"
            />
            <h1>수집팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol3.svg"
              width="28"
              height="28"
            />
            <h1>영상팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol2.svg"
              width="28"
              height="28"
            />
            <h1>전시팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
        <section className={styles.container}>
          <div>
            <Image
              src="/images/credit/symbol1.svg"
              width="28"
              height="28"
            />
            <h1>작품팀</h1>
          </div>
          <div class="image-container"></div>
        </section>
      </article>
    </main>
  )
}
