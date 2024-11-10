import React from 'react'
import styles from './StaffSection.module.css'
import StaffImageList from '@/components/credit/StaffImageList'
import Image from 'next/image'
import { 스태프정보 } from '@/app/(main)/credit/store/staff'

//
//
//

export default function StaffSection() {
  const {
    기타팀,
    기획팀,
    대외협력팀,
    디자인팀,
    수집팀,
    영상팀,
    전시팀,
    작품팀,
    웹개발팀
  } = 스태프정보
  return (
    <article className={styles.containerList}>
      <section className={styles.container}>
        <div className={styles.title}>
          <Image
            src="/icon/logo/atc-symbol.svg"
            alt="Creative Director"
            width="28"
            height="28"
          />
          <h1>Creative Director</h1>
        </div>
        <StaffImageList
          teamName={'Creative Director'}
          teamType={'기타'}
          memberList={기타팀.slice(0, 1)}
        />
      </section>
      <section className={styles.container}>
        <div className={styles.title}>
          <Image
            src="/icon/symbol/symbol8.svg"
            alt="웹개발팀"
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
            src="/icon/symbol/symbol7.svg"
            alt="기획팀"
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
            src="/icon/symbol/symbol6.svg"
            alt="디자인팀"
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
            src="/icon/symbol/symbol5.svg"
            alt="대외협력팀"
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
            src="/icon/symbol/symbol4.svg"
            alt="수집팀"
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
            src="/icon/symbol/symbol3.svg"
            alt="영상팀"
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
            src="/icon/symbol/symbol2.svg"
            alt="전시팀"
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
            src="/icon/symbol/symbol1.svg"
            alt="작품팀"
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
      <section className={styles.container}>
        <div className={styles.title}>
          <Image
            src="/icon/symbol/symbol1.svg"
            alt="회계"
            width="28"
            height="28"
          />
          <h1>회계</h1>
        </div>
        <StaffImageList
          teamName={'회계'}
          teamType={'기타'}
          memberList={기타팀.slice(1)}
        />
      </section>
    </article>
  )
}