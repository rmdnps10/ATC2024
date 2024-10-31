'use client'
import React, { useReducer, useState } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLockBodyScroll } from 'react-use'
//
//
//
export default function Header() {
  const [isShowMouseEnterAnimation, setIsShowMouseEnterAnimation] =
    useState(false)
  const [isShowMouseLeaveAnimation, setIsShowMouseLeaveAnimation] =
    useState(false)

  const pathname = usePathname()

  const [isOpenMobileMenu, toggleIsShowMobileMenu] = useReducer(state => {
    return !state
  }, false)

  useLockBodyScroll(isOpenMobileMenu)
  return (
    <header
      className={styles.header}
      style={{ backgroundColor: isOpenMobileMenu && 'black' }}>
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
            alt="2024 atc 공식 타이포그래피"
            width={80}
            priority
            height={30}
          />
          <div
            className={`${styles.line} ${
              isOpenMobileMenu && styles.active
            }`}></div>

          {isShowMouseEnterAnimation ? (
            <Image
              className={styles.transition}
              src="/icon/logo/transition/atc-elephant.webp"
              unoptimized
              alt="2024 atc 공식 로고 - 로고에서 코끼리로"
              width={35}
              height={35}
            />
          ) : isShowMouseLeaveAnimation ? (
            <Image
              className={styles.transition}
              src="/icon/logo/transition/elephant-atc.webp"
              unoptimized
              alt="2024 atc 공식 로고 - 코끼리에서 로고로"
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
        {['/about', '/works', '/program', '/archive', '/map'].map(link => (
          <li key={link}>
            <Link
              href={link}
              className={pathname === link ? styles.activeText : ''}>
              {link.charAt(1).toUpperCase() + link.slice(2)}
            </Link>
          </li>
        ))}
      </ul>

      <div
        className={`${styles.hamburgerMenu} ${
          isOpenMobileMenu && styles.active
        }`}
        onClick={toggleIsShowMobileMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <section
        className={styles.mobileMenu}
        style={{
          overflow: 'hidden',
          height: isOpenMobileMenu ? 'calc(100vh - 6.5rem)' : '0'
        }}>
        <nav onClick={toggleIsShowMobileMenu}>
          <li>
            <Link href={'/about'}>ABOUT</Link>
          </li>
          <li>
            <Link href={'/works'}>WORK</Link>
          </li>
          <li>
            <Link href={'/program'}>PROGRAM</Link>
          </li>
          <li>
            <Link href={'/archive'}>ARCHIVE</Link>
          </li>
          <li>
            <Link href={'/map'}>MAPS</Link>
          </li>
        </nav>
      </section>
    </header>
  )
}
