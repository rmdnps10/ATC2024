'use client'
import React, { useState, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import { style } from 'framer-motion/client'
//
//
//
export default function ProgramPage() {
  const [openPrograms, setOpenPrograms] = useState([])
  const [hoveredProgram, setHoveredProgram] = useState(null)
  const [animatingPrograms, setAnimatingPrograms] = useState([])
  const programRefs = useRef({})

  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches

  const scrollToProgram = id => {
    programRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    })
  }

  const toggleProgram = id => {
    setAnimatingPrograms(prev => [...prev, id])

    if (isMobile) {
      setOpenPrograms(prevOpenPrograms => {
        const isOpening = !prevOpenPrograms.includes(id)
        if (isOpening) scrollToProgram(id)

        return isOpening
          ? [...prevOpenPrograms, id]
          : prevOpenPrograms.filter(p => p !== id)
      })

      if (openPrograms.includes(id)) setHoveredProgram(null)
    } else {
      setOpenPrograms(prevOpenPrograms =>
        prevOpenPrograms.includes(id)
          ? prevOpenPrograms.filter(p => p !== id)
          : [...prevOpenPrograms, id]
      )
    }
  }

  const programs = [
    {
      id: 'program1',
      title: '그래서 그놈의 융합이 뭔데?',
      name: '노상호 작가 강연',
      day: '수',
      startTime: '19:00',
      endTime: '20:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        "노상호의 작업을 중심으로 '융합예술'이 가지고 있는 한계와 오해에 관하여 논하고 함께 고민합니다."
    },
    {
      id: 'program2',
      title: '트러블과 함께 전시하기',
      name: '이수영 백남준아트센터 큐레이터 강연',
      day: '목',
      startTime: '19:00',
      endTime: '20:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        '"트러블과 함께 하라"에서 트러블(Trouble)의 어원은 "불러일으키다. 애매하게 만들다. 방해하다"에서 온 것이다. 프로블럼(Problem)이 해결책을 제시하는 것과 연결되어 있는 반면, 트러블은 하나의 원인으로 환원되지도, 깔끔하게 정리되지도 않는다. 오히려 문제해결을 위해 상황을 잘 정리하는 것 보다 뒤섞어버리는 쪽에 가깝다. 트러블은 지나친 단순화와 싸우며, 지금 당장 가능한 응답을 불러일으키는 능력을 키우는 것을 말한다. 본 강의는 지금까지 기획한 여러 전시들을 돌아보며 트러블과 함께 하는 전시의 몇 가지 원칙에 대해 이야기하고자 한다.'
    },
    {
      id: 'program3',
      title: '기술 비평에 창작을 할애하기',
      name: '포킹룸 강민형 기획자 강연',
      day: '금',
      startTime: '19:00',
      endTime: '20:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        '기술을 기반으로 창작하는 사람들에게 기술은 어떠한 표현의 도구나 창작의 재료가 되는 경우가 많다. 세 명의 여성 멤버로 이루어진 포킹룸은 기술을 도구나 재료로 보기보다 기술을 다루는 사람들 (개발자, 교육자, 사용자 등)의 문화에서 만들어진 기술 사회에 비평적으로 접근하는 것에 관심을 가지고 있다. 이번 강연에서 연사는 기술 기반의 창작 활동의 의의를 기술 문화를 일구어가는 공동체적인 것으로 보고, 기술은 과연 중립적인가, 기술의 실패는 무엇을 의미하는가, 와 같은 질문을 던지며 기술-창작의 이야기의 폭을 넓혀가고자 한다.'
    },
    {
      id: 'program4',
      title: 'MAKE BLANK',
      name: '점선면 작가 워크숍',
      day: '목',
      startTime: '15:00',
      endTime: '18:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        "'우리는 코끼리가 될 수도 있고 냉장고를 만들 수도 있다.' 다양한 여러가지 표현방법을 통해 나의 빈칸을 채워봅시다. 그리는 과정을 통해 우리의 가능성과 꿈, 여백의 아름다움에 대한 이야기를 나눕니다."
    }
  ]
  const alwaysAvailablePrograms = [
    {
      id: 'always1',
      title: '어반비즈서울 X ATC 2024',
      location: '서강대학교 하비에르관 4F, 5F 사이 계단 오른편',
      description:
        "'벌 한 마리가 세상을 바꾼다'는 비전 아래, 도심 속에서 꿀벌을 기르며 생태계를 가꾸어 가는 어반비즈서울의 행보는, 마치 코끼리에 냉장고를 담는 것처럼 환경을 위한 그들만의 독창적인 방식일 것이다. 어반비즈서울XATC 2024에서 제공하는 웰컴 드링크와 양봉에 관한 간접 체험을 통해 그들의 행보와 비전에 공감하고 함께 느껴보자!"
    },
    {
      id: 'always2',
      title: '점선면 작가 X ATC 2024',
      location: '서강대학교 하비에르관 4F, 5F 사이 계단 오른편',
      description:
        '점선면 작가의 작품 세계는 불규칙한 요소들 속에서 자연스럽게 드러나는 규칙성(혼돈 속의 질서)과 규칙적인 일상 속에 신선하고 예측 불가능한 요소를 더하는 방식(질서 속의 혼돈)을 아우른다. 이번 콜라보를 통해, 점선면 작가님과 학생 아티스트들이 서로의 세계를 공유하고 확장하며 함께 시너지를 창출하고자 한다. 작가님의 작품을 감상하며 공감하고, 그 영감을 담아 털실로 타공판에 나만의 점/선/면을 그려 보자!'
    }
  ]

  const days = ['수', '목', '금']

  const tableData = [
    [
      null,
      {
        title: 'MAKE BLANK',
        id: 'program4',
        rowspan: 2
      },
      null
    ],
    [
      null,
      {
        title: 'MAKE BLANK',
        id: 'program4',
        rowspan: 3
      },
      null
    ],
    [
      null,
      {
        title: 'MAKE BLANK',
        id: 'program4',
        rowspan: 3
      },
      ,
      null
    ],
    [null, null, null],
    [
      { title: '그래서 그놈의 융합이 뭔데?', id: 'program1' },
      { title: '트러블과 함께 전시하기', id: 'program2' },
      { title: '기술 비평에 창작을 할애하기', id: 'program3' }
    ],
    [null, null, null],
    [null, null, null]
  ]

  return (
    <main className={styles.main}>
      <div className={styles.cyan1}></div>
      <div className={styles.cyan2}></div>
      <div className={styles.pink1}></div>
      <div className={styles.pink2}></div>
      <div className={styles.blue1}></div>
      <div className={styles.blue2}></div>
      <section className={styles.timetableContainer}>
        <div className={styles.gridContainer}>
          <div></div>
          {days.map((day, index) => (
            <div
              key={index}
              className={styles.dayHeader}></div>
          ))}
          {['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(
            (time, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div
                  className={styles.timeLabel}
                  style={{ gridRow: rowIndex + 2 }}>
                  {time}
                </div>

                {/* 프로그램 셀 */}
                {Array(3)
                  .fill(null)
                  .map((_, colIndex) => {
                    const cellData = tableData[rowIndex][colIndex]
                    
                    if (cellData && cellData.rowspan) {
                      const isStartRow =
                        tableData[rowIndex - 1]?.[colIndex]?.id !== cellData.id

                      if (isStartRow) {
                        return (
                          <div
                            key={`merged-${rowIndex}-${colIndex}`}
                            className={`${styles.programCellStyled} ${
                              hoveredProgram === cellData.id ||
                              openPrograms.includes(cellData.id)
                                ? styles.highlightedBackground
                                : ''
                            }`}
                            style={{
                              gridRow: 'span 3',
                              gridColumn: colIndex + 2
                            }}
                            onMouseEnter={() => setHoveredProgram(cellData.id)}
                            onMouseLeave={() => setHoveredProgram(null)}
                            onClick={() => toggleProgram(cellData.id)}>
                            <div
                              className={`${styles.gradientText} ${
                                hoveredProgram === cellData.id ||
                                openPrograms.includes(cellData.id)
                                  ? styles.highlightedText
                                  : ''
                              }`}>
                              {cellData.title}
                            </div>
                          </div>
                        )
                      }
                      return null
                    }

                    if (!cellData) {
                      return (
                        <div
                          key={`empty-${rowIndex}-${colIndex}`}
                          className={styles.programCell}
                          style={{
                            gridColumn: colIndex + 2,
                            gridRow: rowIndex + 2
                          }}></div>
                      )
                    }

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`${styles.programCellStyled} ${
                          hoveredProgram === cellData.id ||
                          openPrograms.includes(cellData.id)
                            ? styles.highlightedBackground
                            : ''
                        }`}
                        style={{
                          gridColumn: colIndex + 2,
                          gridRow: rowIndex + 2
                        }}
                        onMouseEnter={() => setHoveredProgram(cellData.id)}
                        onMouseLeave={() => setHoveredProgram(null)}
                        onClick={() => toggleProgram(cellData.id)}>
                        <div
                          className={`${styles.gradientText} ${
                            hoveredProgram === cellData.id ||
                            openPrograms.includes(cellData.id)
                              ? styles.highlightedText
                              : ''
                          }`}>
                          {cellData.title}
                        </div>
                      </div>
                    )
                  })}
              </React.Fragment>
            )
          )}
        </div>
        <div className={styles.alwaysTableContainer}>
          <div className={styles.alwaysLabel}>상시운영</div>
          {alwaysAvailablePrograms.map(program => (
            <div
              key={program.id}
              className={`${styles.programCellStyled} ${
                hoveredProgram === program.id ||
                openPrograms.includes(program.id)
                  ? styles.highlightedBackground
                  : ''
              }`}
              onMouseEnter={() => setHoveredProgram(program.id)}
              onMouseLeave={() => setHoveredProgram(null)}
              onClick={() => toggleProgram(program.id)}>
              <div
                className={`${styles.gradientText} ${
                  hoveredProgram === program.id ||
                  openPrograms.includes(program.id)
                    ? styles.highlightedText
                    : ''
                }`}>
                {program.title}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.programContainer}>
        {[
          { title: '강연', programs: programs },
          { title: '부스', programs: alwaysAvailablePrograms }
        ].map(group => (
          <div
            key={group.title}
            className={styles.groups}>
            <div className={styles.headerGroup}>
              {group.title === '강연' ? (
                <Image
                  src="images/program/subComponent1.svg"
                  alt="2024 atc 서브 컴포넌트 - 강연"
                  width={34}
                  height={34}
                />
              ) : (
                <Image
                  src="images/program/subComponent2.svg"
                  alt="2024 atc 서브 컴포넌트 - 부스"
                  width={34}
                  height={34}
                />
              )}
              <p className={styles.groupTitle}>{group.title}</p>
            </div>
            {group.programs.map(program => (
              <div
                key={program.id}
                ref={el => (programRefs.current[program.id] = el)}
                className={`${styles.programAccordion} ${
                  openPrograms.includes(program.id) ? styles.open : ''
                }`}
                onMouseEnter={() => setHoveredProgram(program.id)}
                onMouseLeave={() => setHoveredProgram(null)}>
                <div
                  className={styles.programHeader}
                  onClick={() => toggleProgram(program.id)}>
                  <span
                    className={`${styles.textWrapper} ${
                      hoveredProgram === program.id ||
                      openPrograms.includes(program.id)
                        ? styles.gradientText
                        : ''
                    }`}>
                    {program.title}
                  </span>
                  <span
                    className={`${styles.arrow} ${
                      openPrograms.includes(program.id) ? styles.rotated : ''
                    }`}>
                    <Image
                      src="/icon/button/toggle.svg"
                      width={24}
                      height={24}
                      alt="Toggle Arrow"
                    />
                  </span>
                </div>

                <div
                  className={`${styles.accordionContent} ${
                    openPrograms.includes(program.id)
                      ? styles.activeContent
                      : ''
                  }`}
                  style={{
                    maxHeight: openPrograms.includes(program.id) ? '500px' : '0'
                  }}>
                  <div className={styles.innerContent}>
                    <div className={styles.programDetails}>
                      <p className={styles.programTime}>
                        {program.startTime
                          ? `${program.startTime} - ${program.endTime} (${program.day}), ${program.name}`
                          : '상시운영'}
                      </p>
                      <p className={styles.programLocation}>
                        {program.location}
                      </p>
                      <p className={styles.programDescription}>
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  )
}
