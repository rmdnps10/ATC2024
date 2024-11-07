import styles from './not-found.module.css'

export default function Notfound() {
  return (
    <section className={styles.notFound}>
      <div>404</div>
      <p>페이지를 찾을 수 없습니다.</p>
      <button>홈으로 돌아가기</button>
    </section>
  )
}
