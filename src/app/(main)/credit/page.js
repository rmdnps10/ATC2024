import styles from './page.module.css'
import StaffSection from '@/components/credit/StaffSection'
import ArtistSection from '@/components/credit/ArtistSection'
import SelectCategory from '@/components/credit/SelectCategory'

export default function CreditPage({ searchParams }) {
  const { category } = searchParams

  return (
    <main className={styles.main}>
      <SelectCategory />
      {category === 'artist' ? <ArtistSection /> : <StaffSection />}
    </main>
  )
}
