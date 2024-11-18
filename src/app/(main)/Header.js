'use client'
import React, { useReducer, useState, useEffect } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMedia, useLockBodyScroll } from 'react-use'

export default function Header() {
  const [isShowMouseEnterAnimation, setIsShowMouseEnterAnimation] =
    useState(false)
  const [isShowMouseLeaveAnimation, setIsShowMouseLeaveAnimation] =
    useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isPathCredit = pathname === '/credit'
  const isMobile = useMedia('(max-width: 768px)', false)
  const [isOpenMobileMenu, toggleIsShowMobileMenu] = useReducer(
    state => !state,
    false
  )

  useLockBodyScroll(isOpenMobileMenu)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderAtcLogo = isMobile => (
    <div className={isMobile ? styles.mobileLogo : styles.logo}>
      <Link href={'/'}>
        {isMobile ? (
          <img
            src={'/icon/logo/atc-symbol.svg'}
            alt="2024 atc 공식 로고 심볼"
            priority
          />
        ) : (
          <img
            style={{
              marginBottom:
                isShowMouseEnterAnimation ||
                isShowMouseLeaveAnimation ||
                '-0.5rem'
            }}
            src={
              isShowMouseEnterAnimation
                ? '/icon/logo/transition/atc2024-elephant.webp'
                : isShowMouseLeaveAnimation
                ? '/icon/logo/transition/elephant-atc2024.webp'
                : '/icon/logo/atc-typography.svg'
            }
            alt={
              isShowMouseEnterAnimation
                ? 'Mouse Enter Animation'
                : isShowMouseLeaveAnimation
                ? 'Mouse Leave Animation'
                : 'atc2024 타이포그래피'
            }
            onMouseEnter={() => setIsShowMouseEnterAnimation(true)}
            onMouseLeave={() => {
              setIsShowMouseEnterAnimation(false)
              setIsShowMouseLeaveAnimation(true)
            }}
          />
        )}
      </Link>
    </div>
  )

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{
        backgroundColor: (isOpenMobileMenu || isPathCredit) && 'black'
      }}>
      {renderAtcLogo(isMobile)}
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
          {['/about', '/works', '/program', '/archive', '/map'].map(link => (
            <li key={link}>
              <Link href={link}>{link.slice(1).toUpperCase()}</Link>
            </li>
          ))}
        </nav>
      </section>
    </header>
  )
}
