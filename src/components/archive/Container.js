'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import BackgroundModal from './BackgroundModal'
import { buttons } from '@/app/(main)/archive/store/buttonPosition'

export default function ScrollContainer() {
  const TIMELINE_WIDTH = 5356 * 0.7
  const TIMELINE_HEIGHT = 842 * 0.7
  const IMAGE_THRESHOLD = 15

  const [position, setPosition] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const scrollRef = useRef(null)

  const moveElephant = x => {
    setPosition(x)
    scrollRef.current.scrollTo({
      left: x,
      behavior: 'smooth'
    })
  }

  const handleClickButton = (x, y) => {
    moveElephant(x)
    setImageIndex(y)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <ScrollSection ref={scrollRef}>
      {isModalOpen && (
        <BackgroundModal
          moveElephant={moveElephant}
          closeModal={closeModal}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
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
