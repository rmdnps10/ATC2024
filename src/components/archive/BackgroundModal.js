import React from 'react'
import { useLockBodyScroll } from 'react-use'
import styled from 'styled-components'
import Image from 'next/image'
import { archiveStore } from '@/app/(main)/archive/archiveStore'

export default function BackgroundModal({ type }) {
  useLockBodyScroll()
  return (
    <Darkscreen>
      <LeftArrow
        src="/icon/button/left-arrow.svg"
        alt="이전 사진"
      />
      <section>
        <CloseX
          src="/icon/button/close.png"
          alt="닫기"
        />
        <div class="image-container">
          <Image
            style={{ objectFit: 'cover' }}
            src={archiveStore[type].imageUrl}
            fill={true}
            alt={archiveStore[type].caption}
          />
        </div>
        <figcaption>{archiveStore[type].caption}</figcaption>
      </section>

      <RightArrow
        src="/icon/button/right-arrow.svg"
        alt="다음 사진"
      />
    </Darkscreen>
  )
}

const Darkscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    position: relative;
  }
  section figcaption {
    bottom: -20px;
    right: 0;
  }
  .image-container {
    width: 30vw;
    height: 70vh;
    object-fit: cover;
  }
`

const CloseX = styled.img`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 30px;
`

const RightArrow = styled.img``
const LeftArrow = styled.img``
