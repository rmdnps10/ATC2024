import React from 'react'
import styles from './StaffImageList.module.css'
import Image from 'next/image'
//
//
//

export default function StaffImageList({ teamName, teamType, memberList }) {
  const renderMember = (member, isLeader = false) => (
    <div
      className={`${styles.imageContainerItem} ${
        isLeader ? styles.leader : ''
      }`}>
      <Image
        src={`/images/staff-profile/${teamType}/${teamType}_${member.이름}.png`}
        alt={member.이름}
        width="200"
        height="280"
      />
      <div className={styles.overlay}>
        <div className={styles.staffId}>
          {member.인스타그램 ? '@' + member.인스타그램 : ''}
        </div>
        <div className={styles.staffInfo}>
          <p>{teamName}</p>
          <p>
            {isLeader
              ? teamName !== 'Creative Director' && teamName !== '회계'
                ? '팀장'
                : ''
              : '팀원'}
          </p>
          <h3>{member.이름}</h3>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {renderMember(memberList[0], true)}
      <div className={styles.imageContainerList}>
        {memberList.slice(1).map(member => renderMember(member))}
      </div>
    </>
  )
}
