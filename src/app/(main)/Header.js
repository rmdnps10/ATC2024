'use client'
import React, { useState } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
//
//
//
export default function Header() {
  const [isShowMouseEnterAnimation, setIsShowMouseEnterAnimation] =
    useState(false)
  const [isShowMouseLeaveAnimation, setIsShowMouseLeaveAnimation] =
    useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link
          href={'/'}
          onMouseEnter={() => {
            setIsShowMouseEnterAnimation(true)
          }}
          onMouseLeave={() => {
            setIsShowMouseEnterAnimation(false)
            setIsShowMouseLeaveAnimation(true)
          }}>
          <Image
            src="/icon/logo/atc-typography.svg"
            alt="2024 atc 공식 로고"
            width={80}
            priority
            height={30}
          />
          <div className={styles.line}></div>

          {isShowMouseEnterAnimation ? (
            <Image
              className={styles.transition}
              src="/icon/logo/transition/atc-elephant.webp"
              width={35}
              height={35}
            />
          ) : isShowMouseLeaveAnimation ? (
            <Image
              className={styles.transition}
              src="/icon/logo/transition/elephant-atc.webp"
              width={35}
              height={35}
            />
          ) : (
            <Image
              src="/icon/logo/atc-symbol.svg"
              priority
              alt="2024 atc 공식 로고"
              width={30}
              height={40}
            />
          )}
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
