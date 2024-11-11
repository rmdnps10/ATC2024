'use client'
import { 스태프정보 } from '@/app/(main)/credit/store/staff'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

export default function FixNav() {
  const teamList = Object.keys(스태프정보)
  const [isHover, setIsHover] = useState(false)
  return (
    <StyledFixNav
      onMouseLeave={() => {
        setIsHover(false)
      }}>
      <ul>
        <li
          class="up-arrow"
          onMouseEnter={() => {
            setIsHover(true)
          }}>
          <Image
            src={'/icon/button/up-arrow.svg'}
            alt="위 화살표"
            width={122}
            height={40}
          />
        </li>

        <SlideMenuList isHover={isHover}>
          {teamList.map(team => (
            <a href={`#${team}`}>
              <Team key={team}>{team}</Team>
            </a>
          ))}
        </SlideMenuList>

        <li
          class="down-arrow"
          onMouseEnter={() => {
            setIsHover(true)
          }}>
          <Image
            src={'/icon/button/down-arrow.svg'}
            alt="아래 화살표"
            width={122}
            height={40}
          />
        </li>
      </ul>
    </StyledFixNav>
  )
}

const StyledFixNav = styled.nav`
  position: fixed;
  z-index: 100;
  .up-arrow {
    margin-bottom: -0.5rem;
  } 
  @media (max-width: 768px) {
    bottom: 0px;
    right: 0px;
  }
  @media (min-width: 768px) {
    top: 100px;
    right: 50px;
  }
`

const SlideMenuList = styled.div`
  transition: 0.5s height;
  height: ${props => (props.isHover ? '368px' : '0')};
  overflow: hidden;
`
const Team = styled.li`
  background: #464646;
  color: #d1d1d1;
  border-bottom: 1px solid #333;
  width: 12.2rem;
  padding: 1rem 0;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  cursor: pointer;
`
