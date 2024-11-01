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
      <p>Collaboration & Sponsorship</p>
      <p></p>
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
