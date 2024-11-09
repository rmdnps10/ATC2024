'use client'

import { useRef, useState, useEffect } from 'react'
import Experience from '@/components/onboard/Experience'
import styles from './page.module.css'

export default function Page() {
  const [rigActive, setRigActive] = useState(false) // CameraRig 활성화 상태 관리
  const nextPortalRef = useRef(null)
  const prevPortalRef = useRef(null)
  const centerPortalRef = useRef(null)

  return (
    <div className={styles.root}>
      <Experience
        setRigActive={setRigActive}
        nextPortalRef={nextPortalRef}
        prevPortalRef={prevPortalRef}
        centerPortalRef={centerPortalRef}
        rigActive={rigActive}
      />

      {/* rigActive가 true일 때만 버튼 표시 */}
      {rigActive && (
        <>
          <div className={styles.portalNavigationLeft}>
            <button
              className={styles.portalButton}
              onClick={() => prevPortalRef.current()}>
              {'<'}
            </button>
          </div>
          <div className={styles.portalNavigationRight}>
            <button
              className={styles.portalButton}
              onClick={() => nextPortalRef.current()}>
              {'>'}
            </button>
          </div>
          <div className={styles.portalNavigationBottom}>
            <button
              className={styles.portalButton}
              onClick={() => centerPortalRef.current()}>
              O
            </button>
          </div>
        </>
      )}
    </div>
  )
}
