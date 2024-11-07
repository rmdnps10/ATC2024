import Image from 'next/image'
import styles from './ArtistSection.module.css'
import { 아티스트정보 } from '@/app/(main)/credit/store/artist'
export default function ArtistSection() {
  const projectList = Object.keys(아티스트정보)

  return (
    <article className={styles.main}>
      {projectList.map(project => (
        <section
          className={styles.teamSection}
          key={project}>
          <div className={styles.teamArtworkName}>
            <p>{project}</p>
            <Image
              src={'/images/credit/circle.svg'}
              alt="연결고리"
              width={6}
              height={6}
            />
            <p>{아티스트정보[project][0].팀이름}</p>
          </div>
          <div className={styles.artistTeam}>
            {아티스트정보[project].map(artist => (
              <div
                className={styles.artistIndividual}
                key={artist.이름}>
                <p>{artist.이름}</p>
                <p>{artist.영문명}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
