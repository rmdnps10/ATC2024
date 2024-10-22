'use-client'
import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
//
//
//
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>
          <Image
            src="/icon/logo/atc-typography.svg"
            alt="2024 atc 공식 로고"
            width={80}
            height={30}
          />
          <div className={styles.line}></div>
          <Image
            src="/icon/logo/atc-symbol.svg"
            alt="2024 atc 공식 로고"
            width={30}
            height={40}
          />
        </Link>
      </div>

      <ul>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/works'}>Works</Link>
        </li>
        <li>
          <Link href={'/program'}>Program</Link>
        </li>
        <li>
          <Link href={'/archive'}>Archive</Link>
        </li>
        <li>
          <Link href={'/map'}>Maps</Link>
        </li>
      </ul>
    </header>
  )
}
