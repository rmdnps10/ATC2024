import Link from 'next/link'
import styles from './InfiniteBanner.module.css'
import Image from 'next/image'

export default function InfiniteBanner() {
  const sponsors = [
    { name: '교육부', link: null },
    { name: 'smilegate_orange', link: null },
    {
      name: 'urbanbeesseoul',
      link: 'https://www.instagram.com/urban.bees.seoul/'
    },
    { name: 'futurelab', link: null },
    { name: 'BARO', link: null },
    { name: '점선면작가', link: 'https://www.instagram.com/basicfigure03/' }
  ]

  const renderSponsorRow = (sponsorList, rowClass) => (
    <div className={styles[rowClass]}>
      {sponsorList.map((sponsor, index) => (
        <div
          className={styles.sponsorBox}
          key={index}>
          {sponsor.link ? (
            <Link
              href={sponsor.link}
              passHref
              target="_blank"
              rel="noopener noreferrer">
              <Image
                src={`/logo/${sponsor.name}.svg`}
                alt={sponsor.name}
                width={160}
                height={90}
              />
            </Link>
          ) : (
            <Image
              src={`/logo/${sponsor.name}.svg`}
              alt={sponsor.name}
              width={160}
              height={90}
            />
          )}
        </div>
      ))}

      {sponsorList.map((sponsor, index) => (
        <div
          className={styles.sponsorBox}
          key={`copy-${index}`}>
          {sponsor.link ? (
            <Link
              href={sponsor.link}
              passHref
              target="_blank"
              rel="noopener noreferrer">
              <Image
                src={`/logo/${sponsor.name}.svg`}
                alt={sponsor.name}
                width={160}
                height={90}
              />
            </Link>
          ) : (
            <Image
              src={`/logo/${sponsor.name}.svg`}
              alt={sponsor.name}
              width={160}
              height={90}
            />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <section className={styles.sponsorContainer}>
      {renderSponsorRow(sponsors, 'firstRow')}
      <div className={styles.text}>
        <p>Collaboration & Sponsorship</p>
      </div>
      {renderSponsorRow(sponsors, 'secondRow')}
    </section>
  )
}
