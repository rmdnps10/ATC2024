'use client'
import React, { useReducer, useState, useEffect } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLockBodyScroll } from 'react-use'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  const pathname = usePathname()
  const isPathCredit = pathname === '/credit'

  const [isOpenMobileMenu, toggleIsShowMobileMenu] = useReducer(state => {
    return !state
  }, false)

  useLockBodyScroll(isOpenMobileMenu)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = event => {
    event.preventDefault()
    const targetDate = new Date('2024-11-18T00:00:00')
    const now = new Date()
    const timeDifference = targetDate - now

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    alert(
      `웹사이트 오픈까지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남았습니다. `
    )
  }

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{
        backgroundColor: (isOpenMobileMenu || isPathCredit) && 'black'
      }}>
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
            className={styles.typography}
            src="/icon/logo/atc-typography.svg"
            priority
            alt="2024 atc 공식 타이포그래피"
            width={80}
            height={30}
          />
          <Image
            className={styles.symbol}
            src="/icon/logo/atc-symbol.svg"
            priority
            alt="2024 atc 공식 로고"
            width={30}
            height={40}
          />
        </Link>
      </div>

      <ul>
        {['/about', '/works', '/program', '/archive', '/map'].map(link => (
          <li key={link}>
            <Link
              href={link}
              onClick={handleClick}
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
            <Link
              href={'/about'}
              onClick={handleClick}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href={'/works'}
              onClick={handleClick}>
              WORK
            </Link>
          </li>
          <li>
            <Link
              href={'/program'}
              onClick={handleClick}>
              PROGRAM
            </Link>
          </li>
          <li>
            <Link
              href={'/archive'}
              onClick={handleClick}>
              ARCHIVE
            </Link>
          </li>
          <li>
            <Link
              href={'/map'}
              onClick={handleClick}>
              MAPS
            </Link>
          </li>
        </nav>
      </section>
    </header>
  )
}
