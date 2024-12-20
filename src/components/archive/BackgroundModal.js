import React from 'react'
import { useLockBodyScroll } from 'react-use'
import styled from 'styled-components'
import Image from 'next/image'
import { archiveStore } from '@/app/(main)/archive/store/archiveStore'
import { elephantPositions } from '@/app/(main)/archive/store/elephantPositions'
//
//
//
export default function BackgroundModal({
  moveElephant,
  closeModal,
  imageIndex,
  setImageIndex
}) {
  useLockBodyScroll()

  const handleClickArrow = direction => {
    const newIndex = imageIndex + direction
    setImageIndex(newIndex)
    moveElephant(elephantPositions[newIndex])
  }

  const imageThreshold = archiveStore.length
  const currentImage = archiveStore[imageIndex]

  return (
    <Darkscreen>
      <Arrow
        src="/icon/button/left-arrow.svg"
        alt="이전 사진"
        onClick={() => handleClickArrow(-1)}
        $visible={imageIndex !== 0}
      />
      <section>
        <CloseX
          src="/icon/button/close.png"
          alt="닫기"
          onClick={closeModal}
        />
        <div className="image-container">
          <Image
            style={{ objectFit: 'contain' }}
            src={currentImage?.imageUrl}
            priority
            fill={true}
            alt={currentImage?.caption}
          />
        </div>
        <figcaption>{currentImage.caption}</figcaption>
      </section>
      <Arrow
        src="/icon/button/right-arrow.svg"
        alt="다음 사진"
        onClick={() => handleClickArrow(1)}
        $visible={imageIndex !== imageThreshold - 1}
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
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  section {
    position: relative;
  }
  section figcaption {
    position: absolute;
    bottom: 0px;
    left: 0;
    color: white;
  }
  .image-container {
    width: 70vw;
    height: 70vh;
    object-fit: cover;
    @media (max-width: 1300px) {
      width: 70vw;
    }
  }
`

const CloseX = styled.img`
  position: absolute;
  cursor: pointer;
  top: -50px;
  right: -50px;
  width: 30px;
`

const Arrow = styled.img`
  cursor: pointer;
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  @media (max-width: 768px) {
    width: 50px;
  }
`
