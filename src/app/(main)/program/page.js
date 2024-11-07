'use client'
import React, { useState, useRef } from 'react'
import styles from './page.module.css'
import Image from 'next/image'

export default function ProgramPage() {
  const [openPrograms, setOpenPrograms] = useState([])
  const [hoveredProgram, setHoveredProgram] = useState(null)
  const programRefs = useRef({})

  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches

  const toggleProgram = id => {
    if (isMobile) {
      setOpenPrograms(prevOpenPrograms => {
        const isOpening = !prevOpenPrograms.includes(id)

        if (isOpening) {
          programRefs.current[id]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          })
        }

        return isOpening
          ? [...prevOpenPrograms, id] // 닫혀 있을 경우 열기
          : prevOpenPrograms.filter(p => p !== id) // 열려 있을 경우 닫기
      })

      // 아코디언을 닫으면 -> 효과 초기화
      if (openPrograms.includes(id)) {
        setHoveredProgram(null)
      }
    } else {
      setOpenPrograms(prevOpenPrograms =>
        prevOpenPrograms.includes(id)
          ? prevOpenPrograms.filter(p => p !== id)
          : [...prevOpenPrograms, id]
      )
    }
  }

  const timeToRow = time => {
    const [hour, minute] = time.split(':').map(Number)
    return (
      hour - 15 + (minute === 30 ? 1 : 0) + 1
    ) /*나중에 30분 단위 프로그램 고려해야함*/
  }

  const dayToColumn = day => ({ 수: 1, 목: 2, 금: 3 }[day] || 0)

  const programs = [
    {
      id: 'program1',
      title: '그래서 그놈의 융합이 뭔데?',
      day: '수',
      startTime: '19:00',
      endTime: '20:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        "노상호의 작업을 중심으로 '융합예술'이 가지고 있는 한계와 오해에 관하여 논하고 함께 고민합니다. 또한 아테커의 고민에 대한 이야기를 나눕니다."
    },
    {
      id: 'program2',
      title: '같은 공간에서 ‘다른 시각’을 갖도록',
      day: '목',
      startTime: '19:00',
      endTime: '20:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        '큐레이터의 시선으로 보는 전시 기획에 관한 이야기를 합니다. 큐레이터가 “전시를 만드는 방법”에 대한 관점을 다룹니다. (설명 미정)'
    },
    {
      id: 'program3',
      title: 'TECH. 새로울지도, 아닐지도?',
      day: '금',
      startTime: '19:00',
      endTime: '20:00',
      location: '서강대학교 하비에르관 5F 이머시브홀',
      description:
        '아트&테크놀로지학과가 만들어졌을 2013년의 TECH와 지금의 TECH는 같은가? 또한 매년 새로운 기술들이 새롭다고 하지만 정말 새로운 것일까?'
    }
  ]
  const alwaysAvailablePrograms = [
    {
      id: 'always1',
      title: '점선면 작가의 Drawing Class',
      location: '서강대학교 하비에르관 5F Fabrication Lab',
      description: '점선면 작가가 진행하는 드로잉 클래스.'
    },
    {
      id: 'always2',
      title: '대협팀 2',
      location: '서강대학교 하비에르관 4F 신영균스튜디오',
      description: '상시운영 프로그램 2 설명'
    }
  ]

  const getDuration = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)
    return (endHour * 60 + endMinute - startHour * 60 - startMinute) / 60
  }

  // 요일 데이터 추가
  const days = ['수', '목', '금']

  const generateTable = () => {
    const table = Array.from({ length: 6 }, () => Array(3).fill(null))

    programs.forEach(program => {
      const row = timeToRow(program.startTime)
      const col = dayToColumn(program.day)
      const rowspan = getDuration(program.startTime, program.endTime)

      if (row > 0 && col > 0 && row <= table.length && col <= table[0].length) {
        if (table[row - 1][col - 1] === null) {
          table[row - 1][col - 1] = {
            title: program.title,
            id: program.id,
            rowspan
          }
          for (let i = 1; i < rowspan; i++) {
            if (table[row - 1 + i]) {
              table[row - 1 + i][col - 1] = 'skip'
            }
          }
        }
      }
    })

    return table
  }

  const tableData = generateTable()

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

                {Array(3)
                  .fill(null)
                  .map((_, colIndex) => {
                    const cellData = tableData[rowIndex][colIndex]
                    if (cellData === 'skip') return null

                    return cellData ? (
                      <div
                        key={colIndex}
                        className={`${styles.programCellStyled} ${
                          hoveredProgram === cellData.id ||
                          openPrograms.includes(cellData.id)
                            ? styles.highlightedBackground
                            : ''
                        }`}
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
                    ) : (
                      <div
                        key={colIndex}
                        className={styles.programCell}
                        style={{
                          gridColumn: colIndex + 2,
                          gridRow: rowIndex + 2
                        }}></div>
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
        {[...alwaysAvailablePrograms, ...programs].map(program => (
          <div
            key={program.id}
            ref={el => (programRefs.current[program.id] = el)}
            className={`${styles.programItem} ${
              openPrograms.includes(program.id) ? styles.activeShadow : ''
            }`}>
            <div
              className={`${styles.programHeader} ${
                openPrograms.includes(program.id) ? styles.activeHeader : ''
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
            {openPrograms.includes(program.id) && (
              <div
                className={`${styles.accordionContent} ${
                  openPrograms.includes(program.id) ? styles.activeContent : ''
                }`}>
                <div className={styles.programDetails}>
                  <p className={styles.programTime}>
                    {program.startTime
                      ? `${program.startTime} - ${program.endTime} (${program.day})`
                      : '상시운영'}
                  </p>
                  <p className={styles.programLocation}>{program.location}</p>
                  <p className={styles.programDescription}>
                    {program.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}
