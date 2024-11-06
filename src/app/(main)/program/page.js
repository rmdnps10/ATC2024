'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
//
//
//
export default function ProgramPage() {
  const [openPrograms, setOpenPrograms] = useState([])
  const [hoveredProgram, setHoveredProgram] = useState(null)

  const timeToRow = time => {
    const [hour, minute] = time.split(':').map(Number)
    return (
      hour - 15 + (minute === 30 ? 1 : 0) + 1
    ) /*나중에 30분 단위 프로그램 고려해야함*/
  }

  const dayToColumn = day => {
    switch (day) {
      case '수':
        return 1
      case '목':
        return 2
      case '금':
        return 3
      default:
        return 0
    }
  }

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
      title: '대협팀 1',
      description: '상시운영 프로그램 1 설명'
    },
    {
      id: 'always2',
      title: '대협팀 2',
      description: '상시운영 프로그램 2 설명'
    }
  ]

  const getDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const start = startHour * 60 + startMinute
    const end = endHour * 60 + endMinute

    return (end - start) / 60
  }

  // 요일 데이터 추가
  const days = ['수', '목', '금']

  const generateTable = () => {
    const table = Array.from({ length: 6 }, () => Array(3).fill(null)) // 시간당 1행씩으로 총 6개 행

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
          {/* 요일 표시 */}
          <div></div>
          {days.map((day, index) => (
            <div
              key={index}
              className={styles.dayHeader}></div>
          ))}

          {/* 시간 표시 및 프로그램 셀 */}
          {['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(
            (time, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {/* 시간 표시 */}
                <div
                  className={styles.timeLabel}
                  style={{ gridRow: rowIndex + 2 }}>
                  {time}
                </div>

                {/* 프로그램 데이터 */}
                {Array(3)
                  .fill(null)
                  .map((_, colIndex) => {
                    const cellData = tableData[rowIndex][colIndex]
                    if (cellData === 'skip') return null

                    return cellData ? (
                      <div
                        key={colIndex}
                        className={`${styles.programCellStyled} ${
                          hoveredProgram === cellData.id
                            ? styles.highlightedBackground
                            : ''
                        }`}
                        /*style={{
                          gridColumn: colIndex + 2,
                          gridRow: `span ${cellData.rowspan}`
                        }}*/
                        onMouseEnter={() => setHoveredProgram(cellData.id)}
                        onMouseLeave={() => setHoveredProgram(null)}>
                        <div
                          className={`${styles.gradientText} ${
                            hoveredProgram === cellData.id
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
                hoveredProgram === program.id
                  ? styles.highlightedBackground
                  : ''
              }`}
              onMouseEnter={() => setHoveredProgram(program.id)}
              onMouseLeave={() => setHoveredProgram(null)}>
              <div
                className={`${styles.gradientText} ${
                  hoveredProgram === program.id ? styles.highlightedText : ''
                }`}>
                {program.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 오른쪽 프로그램 목록 */}
      <section className={styles.programContainer}>
        {alwaysAvailablePrograms.map(program => (
          <div
            key={program.id}
            className={`${styles.programItem} ${
              openPrograms.includes(program.id) ? styles.activeShadow : ''
            }`}>
            <div
              className={`${styles.programHeader}  ${
                openPrograms.includes(program.id) ? styles.activeHeader : ''
              }`}
              onMouseEnter={() => setHoveredProgram(program.id)}
              onMouseLeave={() => setHoveredProgram(null)}
              onClick={() =>
                setOpenPrograms(
                  openPrograms.includes(program.id)
                    ? openPrograms.filter(id => id !== program.id)
                    : [...openPrograms, program.id]
                )
              }>
              <div
                className={`${styles.gradientText} ${
                  hoveredProgram === program.id ? styles.highlightedText : ''
                }`}>
                {program.title}
              </div>
              <span className={styles.arrow}>
                {openPrograms.includes(program.id) ? (
                  <Image
                    src="/icon/button/toggleUp.svg"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/icon/button/toggleDown.svg"
                    width={24}
                    height={24}
                  />
                )}
              </span>
            </div>
            {openPrograms.includes(program.id) && (
              <div
                className={`${styles.accordionContent} ${styles.activeContent}`}>
                <div className={styles.programDetails}>
                  <p className={styles.programLocation}>{program.location}</p>
                  <p className={styles.programDescription}>
                    {program.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        {programs.map(program => (
          <div
            key={program.id}
            className={`${styles.programItem} ${
              openPrograms.includes(program.id) ? styles.activeShadow : ''
            }`}>
            <div
              className={`${styles.programHeader}  ${
                openPrograms.includes(program.id) ? styles.activeHeader : ''
              }`}
              onMouseEnter={() => setHoveredProgram(program.id)}
              onMouseLeave={() => setHoveredProgram(null)}
              onClick={() =>
                setOpenPrograms(
                  openPrograms.includes(program.id)
                    ? openPrograms.filter(id => id !== program.id)
                    : [...openPrograms, program.id]
                )
              }>
              <div
                className={`${styles.gradientText} ${
                  hoveredProgram === program.id ? styles.highlightedText : ''
                }`}>
                {program.title}
              </div>
              <span className={styles.arrow}>
                {openPrograms.includes(program.id) ? (
                  <Image
                    src="/icon/button/toggleUp.svg"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/icon/button/toggleDown.svg"
                    width={24}
                    height={24}
                  />
                )}
              </span>
            </div>
            {openPrograms.includes(program.id) && (
              <div
                className={`${styles.accordionContent} ${styles.activeContent}`}>
                <div className={styles.programDetails}>
                  <p className={styles.programTime}>
                    {program.startTime} - {program.endTime} ({program.day})
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
