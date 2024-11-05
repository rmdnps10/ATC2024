'use client'
import Image from 'next/image'
import styles from './page.module.css'
import StaffImageList from '@/components/credit/StaffImageList'
//
//
//

const 기타팀 = ['임동준', '강주헌']
const 기획팀 = [
  '신우석',
  '남현지',
  '박주현',
  '송명은',
  '조현우',
  '홍서원',
  '황나금'
]
const 대외협력팀 = ['임수빈', '김현규', '우소정', '채서연', '안소연']
const 디자인팀 = ['이현우', '김예찬', '신서윤', '이현서', '최송화', '현지민']
const 수집팀 = ['금유현', '김서영', '김현지', '이다은', '정가인']
const 영상팀 = ['김인규', '김서영', '김시리', '오현서', '최윤정']
const 웹개발팀 = [
  '정인영',
  '길민경',
  '김가윤',
  '김민균',
  '김별',
  '윤기완',
  '최보현'
]
const 작품팀 = ['신채원', '김대희', '김시윤', '이소윤', '장창엽']
const 전시팀 = ['김지윤', '김준수', '박서영', '서가언', '주민교']

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
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol9.svg"
              width="28"
              height="28"
            />
            <h1>Creative Director</h1>
          </div>
          <StaffImageList
            teamName={'기타팀'}
            teamType={'기타'}
            memberList={기타팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol8.svg"
              width="28"
              height="28"
            />
            <h1>웹개발팀</h1>
          </div>
          <StaffImageList
            teamName={'웹개발팀'}
            teamType={'웹'}
            memberList={웹개발팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol7.svg"
              width="28"
              height="28"
            />
            <h1>기획팀</h1>
          </div>
          <StaffImageList
            teamName={'기획팀'}
            teamType={'기획'}
            memberList={기획팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol6.svg"
              width="28"
              height="28"
            />
            <h1>디자인팀</h1>
          </div>
          <StaffImageList
            teamName={'디자인팀'}
            teamType={'디자인'}
            memberList={디자인팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol5.svg"
              width="28"
              height="28"
            />
            <h1>대외협력팀</h1>
          </div>
          <StaffImageList
            teamName={'대외협력팀'}
            teamType={'대외협력'}
            memberList={대외협력팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol4.svg"
              width="28"
              height="28"
            />
            <h1>수집팀</h1>
          </div>
          <StaffImageList
            teamName={'수집팀'}
            teamType={'수집'}
            memberList={수집팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol3.svg"
              width="28"
              height="28"
            />
            <h1>영상팀</h1>
          </div>
          <StaffImageList
            teamName={'영상팀'}
            teamType={'영상'}
            memberList={영상팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol2.svg"
              width="28"
              height="28"
            />
            <h1>전시팀</h1>
          </div>
          <StaffImageList
            teamName={'전시팀'}
            teamType={'전시'}
            memberList={전시팀}
          />
        </section>
        <section className={styles.container}>
          <div className={styles.title}>
            <Image
              src="/images/credit/symbol1.svg"
              width="28"
              height="28"
            />
            <h1>작품팀</h1>
          </div>
          <StaffImageList
            teamName={'작품팀'}
            teamType={'작품'}
            memberList={작품팀}
          />
        </section>
      </article>
    </main>
  )
}
