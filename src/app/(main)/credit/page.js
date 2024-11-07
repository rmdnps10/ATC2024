'use client'
import Image from 'next/image'
import styles from './page.module.css'
import StaffSection from '@/components/credit/StaffSection'
import ArtistSection from '@/components/credit/ArtistSection'
import { useReducer } from 'react'

const initialState = 'ATC STAFF'

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STAFF':
      return 'ATC STAFF'
    case 'SET_ARTIST':
      return 'ATC ARTIST'
    default:
      return state
  }
}

export default function CreditPage() {
  const [selectedOption, dispatch] = useReducer(reducer, initialState)

  return (
    <main className={styles.main}>
      <div className={styles.selectOption}>
        <div>
          <p
            className={
              selectedOption === 'ATC STAFF'
                ? styles.staffVer1
                : styles.staffVer2
            }
            onClick={() => {
              dispatch({ type: 'SET_STAFF' })
            }}>
            ATC STAFF
          </p>
          <p
            className={
              selectedOption === 'ATC STAFF'
                ? styles.artistVer1
                : styles.artistVer2
            }
            onClick={() => {
              dispatch({ type: 'SET_ARTIST' })
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
