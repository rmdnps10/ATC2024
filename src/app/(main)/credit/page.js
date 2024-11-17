'use client'
import styles from './page.module.css'
import StaffSection from '@/components/credit/StaffSection'
import ArtistSection from '@/components/credit/ArtistSection'
import SelectCategory from '@/components/credit/SelectCategory'
import { motion, AnimatePresence } from 'framer-motion'
//
//
//
export default function CreditPage({ searchParams }) {
  const { category } = searchParams

  return (
    <main className={styles.main}>
      <SelectCategory category={category} />
      <AnimatePresence>
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}>
          {category === 'artist' ? <ArtistSection /> : <StaffSection />}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
