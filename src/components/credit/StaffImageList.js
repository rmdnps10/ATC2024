import React from 'react'
import styles from './StaffImageList.module.css'
import Image from 'next/image'

export default function StaffImageList({ teamName, teamType, memberList }) {
  return (
    <>
      <div className={`${styles.imageContainerItem} ${styles.leader}`}>
        <Image
          src={`/images/staff-profile/${teamType}/${teamType}_${memberList[0]}.png`}
          alt={memberList[0]}
          width="200"
          height="280"
        />
        <div className={styles.overlay}>
          <div className={styles.staffId}>@rmdnps10</div>
          <div className={styles.staffInfo}>
            <p>{teamName}</p>
            {teamName !== ('Creative Director' || '회계' ) && <p>{'팀장'}</p>}
            <h3>{memberList[0]}</h3>
          </div>
        </div>
      </div>
      <div className={styles.imageContainerList}>
        {memberList.slice(1).map((name, idx) => (
          <div className={styles.imageContainerItem}>
            <Image
              src={`/images/staff-profile/${teamType}/${teamType}_${name}.png`}
              alt={name}
              width="200"
              height="280"
            />
            <div className={styles.overlay}>
              <div className={styles.staffId}>@rmdnps10</div>
              <div className={styles.staffInfo}>
                <p>{teamName}</p>
                <p>{'팀원'}</p>
                <h3>{name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
