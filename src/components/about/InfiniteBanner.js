import styles from './InfiniteBanner.module.css'
import Image from 'next/image'
//
//
//
export default function InfiniteBanner() {
  const firstRowSponsors = [
    'axt-logo',
    'axt-logo',
    'axt-logo',
    'axt-logo',
    'axt-logo'
  ]
  const secondRowSponsors = [
    'axt-logo',
    'axt-logo',
    'axt-logo',
    'axt-logo',
    'axt-logo'
  ]
  return (
    <section className={styles.sponsorContainer}>
      <div className={styles.firstRow}>
        {firstRowSponsors.map((sponsor, index) => (
          <div
            className={styles.sponsorBox}
            key={`row1-${index}`}>
            <Image
              src={`/logo/${sponsor}.png`}
              alt={sponsor}
              width={160}
              height={90}
            />
          </div>
        ))}
        {firstRowSponsors.map((sponsor, index) => (
          <div
            className={styles.sponsorBox}
            key={`row1-copy-${index}`}>
            <Image
              src={`/logo/${sponsor}.png`}
              alt={sponsor}
              width={160}
              height={90}
            />
          </div>
        ))}
      </div>
      <div className={styles.text}>
        <p>Collaboration & Sponsorship</p>
        <p>
          후원사에 대한 설명을 적습니다 이건 참여하는 파트너사들이 어떤 회사이고
          그리고 우리에게 어떤 서포트를 해주는지 정해지면 적는 것으로 합니다
        </p>
      </div>
      <div className={styles.secondRow}>
        {secondRowSponsors.map((sponsor, index) => (
          <div
            className={styles.sponsorBox}
            key={`row2-${index}`}>
            <Image
              src={`/logo/${sponsor}.png`}
              alt={sponsor}
              width={160}
              height={90}
            />
          </div>
        ))}
        {secondRowSponsors.map((sponsor, index) => (
          <div
            className={styles.sponsorBox}
            key={`row2-copy-${index}`}>
            <Image
              src={`/logo/${sponsor}.png`}
              alt={sponsor}
              width={160}
              height={90}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
