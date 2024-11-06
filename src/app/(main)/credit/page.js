'use client'
import Image from 'next/image'
import styles from './page.module.css'
import StaffSection from '@/components/credit/StaffSection'
import ArtistSection from '@/components/credit/ArtistSection'
import { useState } from 'react'
//
//
//
export default function CreditPage() {
  const [selectedOption, setSelectedOption] = useState('ATC STAFF')
  return (
    <main className={styles.main}>
      <div className={styles.selectOption}>
        <div>
          <p
            onClick={() => {
              setSelectedOption('ATC STAFF')
            }}>
            ATC STAFF
          </p>
          <p
            onClick={() => {
              setSelectedOption('ATC ARTIST')
            }}>
            ATC ARTIST
          </p>
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
      {selectedOption === 'ATC STAFF' ? <StaffSection /> : <ArtistSection />}
    </main>
  )
}
