'use client'
import { useRouter } from 'next/navigation'
import Header from './(main)/Header'
import styles from './not-found.module.css'

export default function Notfound() {
  const router = useRouter()
  return (
    <>
      <Header />
      <section className={styles.notFound}>
        <div>
          <h1>404</h1>
          <p>페이지를 찾을 수 없습니다.</p>
          <button
            onClick={() => {
              router.push('/')
            }}>
            홈으로 돌아가기
          </button>
        </div>
      </section>
    </>
  )
}
