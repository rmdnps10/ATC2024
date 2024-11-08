'use client'
import { useReducer } from 'react'
import styles from './SelectCategory.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
//
//
//

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

export default function SelectCategory({ category }) {
  const [selectedOption, dispatch] = useReducer(
    reducer,
    category === 'staff' ? 'ATC STAFF' : 'ATC ARTIST'
  )
  const router = useRouter()

  return (
    <div className={styles.selectOption}>
      <div>
        <p
          className={
            selectedOption === 'ATC STAFF' ? styles.staffVer1 : styles.staffVer2
          }
          onClick={() => {
            dispatch({ type: 'SET_STAFF' })
            router.push('/credit?category=staff')
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
            router.push('/credit?category=artist')
          }}>
          ATC ARTIST
        </p>
        <Image
          className={`${styles.onlyPC} ${styles.leftImage}`}
          alt="credit option1"
          src="/images/credit/option1.svg"
          width="103"
          height="31"
        />
        <Image
          className={`${styles.onlyPC} ${styles.rightImage}`}
          src="/images/credit/option2.svg"
          alt="credit option2"
          width="103"
          height="31"
        />
        <Image
          className={`${styles.onlyMobile} ${styles.leftImage}`}
          src="/images/credit/m-option1.svg"
          alt="credit option1"
          width="66"
          height="18"
        />
        <Image
          className={`${styles.onlyMobile} ${styles.rightImage}`}
          src="/images/credit/m-option2.svg"
          alt="credit option2"
          width="66"
          height="18"
        />
      </div>
    </div>
  )
}
