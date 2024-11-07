'use client'
import { useReducer } from 'react'
import styles from './SelectCategory.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
//
//
//

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

export default function SelectCategory() {
  const [selectedOption, dispatch] = useReducer(reducer, initialState)
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
  )
}
