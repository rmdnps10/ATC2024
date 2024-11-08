'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styled from 'styled-components'

export default function Container() {
  const 연표너비 = 5356 * 0.7
  const 연표높이 = 842 * 0.7

  const [position, setPosition] = useState(0)
  const scrollRef = useRef(null)
  const handleButtonClick = x => {
    setPosition(x)
    scrollRef.current.scrollTo({
      left: x,
      behavior: 'smooth'
    })
  }

  return (
    <Scrollsection ref={scrollRef}>
      <Image
        src="/images/archive/연표.png"
        width={연표너비}
        height={연표높이}
      />
      <Elephant
        src={'/images/archive/코끼리.webp'}
        width={171 * 0.5}
        height={163 * 0.5}
        position={position}
      />
      <LowButton
        $top={430}
        $left={40}
        onClick={() => handleButtonClick(40)}>
        Creative Director 선정
      </LowButton>
      <LowButton
        $top={360}
        $left={300}
        onClick={() => handleButtonClick(300)}>
        STAFF 모집
      </LowButton>
      <LowButton
        $top={390}
        $left={490}
        onClick={() => handleButtonClick(490)}>
        ATC 킥오프
      </LowButton>
      <LowButton
        $top={320}
        $left={680}
        onClick={() => handleButtonClick(680)}>
        팀별 첫 회의
      </LowButton>
      <LowButton
        $top={380}
        $left={880}
        onClick={() => handleButtonClick(880)}>
        주제문 확정
      </LowButton>
      <LowButton
        $top={420}
        $left={1020}
        onClick={() => handleButtonClick(1020)}>
        아티스트 모집
      </LowButton>
      <LowButton
        $top={350}
        $left={1190}
        onClick={() => handleButtonClick(1190)}>
        브랜딩 완성
      </LowButton>
      <LowButton
        $top={300}
        $left={1420}
        onClick={() => handleButtonClick(1420)}>
        아티스트 교류의 날
      </LowButton>
      <LowButton
        $top={320}
        $left={1720}
        onClick={() => handleButtonClick(1720)}>
        스태프 프로필 촬영
      </LowButton>
      <LowButton
        $top={240}
        $left={1860}
        onClick={() => handleButtonClick(1860)}>
        외부 인사 미팅
      </LowButton>
      <HightButton
        $top={100}
        $left={2450}
        onClick={() => handleButtonClick(2450)}>
        팀장단 인터뷰
      </HightButton>
      <HightButton
        $top={10}
        $left={2580}
        onClick={() => handleButtonClick(2580)}>
        작품팀 작품 완성
      </HightButton>
      <HightButton
        $top={50}
        $left={2780}
        onClick={() => handleButtonClick(2780)}>
        웹페이지 배포 완성
      </HightButton>
      <HightButton
        $top={-10}
        $left={2950}
        onClick={() => handleButtonClick(2950)}>
        영상팀 영상 완성
      </HightButton>
      <HightButton
        $top={70}
        $left={3050}
        onClick={() => handleButtonClick(3050)}>
        ATC 전시 설치 시작
      </HightButton>
      <Refrigerator
        src={'/images/archive/냉장고.png'}
        width={270}
        height={270}
      />
    </Scrollsection>
  )
}

const Scrollsection = styled.section`
  width: 99%;
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: visible;
  margin-top: -12rem;
  padding-top: 50px;
  position: relative;
  z-index: 1;
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

const HightButton = styled(LowButton)`
  background: var(
    --linear,
    linear-gradient(
      90deg,
      #35cffa 0%,
      #278ffb 20%,
      #3c79fb 40%,
      #dd4ffc 60%,
      #9734fb 80%,
      #7340fb 100%
    )
  );
  color: white;
`

const Elephant = styled(Image)`
  position: absolute;
  top: 190px;
  left: 10px;
  transform: ${props => `translateX(${props.position}px)`};
  transition: 0.5s ease;
`

const Refrigerator = styled(Image)`
  position: absolute;
  top: -2px;
  left: -50px;
  transform: translateX(3440px);
  z-index: 10;
`
