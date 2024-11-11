'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import BackgroundModal from './BackgroundModal'
import { buttons } from '@/app/(main)/archive/store/buttonPosition'
import ModalPortal from './ModalPortal'

export default function ScrollContainer() {
  const TIMELINE_WIDTH = 5356 * 0.7
  const TIMELINE_HEIGHT = 842 * 0.7
  const IMAGE_THRESHOLD = 15

  const [position, setPosition] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const scrollRef = useRef(null)

  const moveElephant = async x => {
    setPosition(x)
    await new Promise(resolve => {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: x,
            behavior: 'smooth'
          })
        }
        resolve()
      }, 500)
    })
  }

  const handleKeyDown = e => {
    setImageIndex(prevIndex => {
      if (e.key === 'ArrowRight' && prevIndex < buttons.length - 1) {
        moveElephant(buttons[prevIndex + 1].left)
        return prevIndex + 1
      } else if (e.key === 'ArrowLeft' && prevIndex > 0) {
        moveElephant(buttons[prevIndex - 1].left)
        return prevIndex - 1
      }
      return prevIndex
    })
  }

  const handleClickButton = async (x, y) => {
    await moveElephant(x)
    setImageIndex(y)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <ScrollSection
      ref={scrollRef}
      tabIndex={0}>
      {isModalOpen && (
        <ModalPortal>
          <BackgroundModal
            moveElephant={moveElephant}
            closeModal={closeModal}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
          />
        </ModalPortal>
      )}

      <Image
        src="/images/archive/연표.png"
        alt="atc2024 연표, timeline"
        width={TIMELINE_WIDTH}
        height={TIMELINE_HEIGHT}
        priority={true}
      />
      <Elephant
        alt="atc2024 elephant"
        src="/images/archive/코끼리.webp"
        width={171 * 0.5}
        height={163 * 0.5}
        position={position}
      />
      {buttons.map((button, index) => {
        const ButtonComponent =
          button.type === 'LowButton' ? LowButton : HighButton
        return (
          <ButtonComponent
            key={index}
            $top={button.top}
            $left={button.left}
            onClick={() => handleClickButton(button.left, index)}>
            {button.text}
          </ButtonComponent>
        )
      })}
      <Refrigerator
        alt="atc2024 refrigerator"
        src="/images/archive/냉장고.png"
        width={270}
        height={270}
        onClick={() => handleClickButton(3450, IMAGE_THRESHOLD)}
      />
    </ScrollSection>
  )
}

const ScrollSection = styled.section`
  width: 99%;
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: visible;
  margin-top: -12rem;
  padding-top: 50px;
  position: relative;
  z-index: 1000;
  &::-webkit-scrollbar {
    display: block;
    width: 10px;
    height: 20px;
    background-color: #aaa; /* 또는 트랙에 추가한다 */
  }
  &::-webkit-scrollbar-thumb {
    background: #000;
  }

  @media (max-width: 768px) {
  }
`

const LowButton = styled.button`
  position: absolute;
  top: 50px;
  left: 0;
  transform: ${props => `translate(${props.$left}px, ${props.$top}px)`};
  width: fit-content;
  padding: 1.3rem 2.8rem;
  color: black;
  border-radius: 1.4rem;
  background: #fff;
  border: none;
  cursor: pointer;
`

const HighButton = styled(LowButton)`
  background: linear-gradient(
    90deg,
    #35cffa 0%,
    #278ffb 20%,
    #3c79fb 40%,
    #dd4ffc 60%,
    #9734fb 80%,
    #7340fb 100%
  );
  color: white;
`

const Elephant = styled(Image)`
  position: absolute;
  top: 190px;
  left: 10px;
  transform: ${props => `translateX(${props.position}px)`};
  transition: 0.5s ease;
  z-index: 11;
`

const Refrigerator = styled(Image)`
  position: absolute;
  top: -2px;
  left: -50px;
  transform: translateX(3440px);
  z-index: 10;
  cursor: pointer;
`
