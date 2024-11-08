'use client'
import Image from 'next/image'
import styled from 'styled-components'

export default function Container() {
  const 연표너비 = 5356 * 0.7
  const 연표높이 = 842 * 0.7

  return (
    <Scrollsection>
      <Image
        src="/images/archive/연표.png"
        width={연표너비}
        height={연표높이}
      />
      <Elephant
        src={'/images/archive/코끼리.webp'}
        width={171 * 0.5}
        height={163 * 0.5}
      />
      <Button
        $top={430}
        $left={40}>
        Creative Director 선정
      </Button>
      <Button
        $top={360}
        $left={300}>
        Staff 모집
      </Button>
      <Button
        $top={430}
        $left={40}>
        ATC 킥오프
      </Button>{' '}
      <Button
        $top={430}
        $left={40}>
        팀별 첫 회의
      </Button>{' '}
      <Button
        $top={430}
        $left={40}>
        주제문 확정
      </Button>{' '}
      <Button
        $top={430}
        $left={40}>
        아티스트 모집
      </Button>{' '}
      <Button
        $top={430}
        $left={40}>
        브랜딩 완성
      </Button>{' '}
      <Button
        $top={430}
        $left={40}>
        아티스트 교류의 날
      </Button>{' '}
      <Button
        $top={430}
        $left={40}>
        스태프 프로필 촬영
      </Button>
      <Button
        $top={430}
        $left={40}>
        외부 인사 미팅
      </Button>
    </Scrollsection>
  )
}

const Scrollsection = styled.section`
  width: 99%;
  margin: 0 auto;
  overflow: scroll;
  margin-top: -12rem;
  position: relative;
  z-index: 1;
`

const Button = styled.button`
  display: inline-flex;
  position: absolute;
  top: ${props => props.$top + 'px'};
  left: ${props => props.$left + 'px'};
  padding: 1.3rem 2.8rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: black;
  border-radius: 1.4rem;
  background: #fff;
  border: none;
`

const Elephant = styled(Image)`
  position: absolute;
  top: 14rem;
  left: 8rem;
`
