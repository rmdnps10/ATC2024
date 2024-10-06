'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
//
//
//
export default function ProgramPage() {
  const [openPrograms, setOpenPrograms] = useState([]);
  const [hoveredProgram, setHoveredProgram] = useState(null); 

  const timeToRow = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return (hour - 12) + (minute === 30 ? 1 : 0) + 1; /*나중에 30분 단위 프로그램 고려해야함*/
  };

  const dayToColumn = (day) => {
    switch (day) {
      case '수': return 1;
      case '목': return 2;
      case '금': return 3;
      case '토': return 4;
      default: return 0;
    }
  };

  const programs = [
    {
      id: 'program1',  
      title: '프로그램명 1',
      day: '수',
      startTime: '13:00',
      endTime: '14:00',
      location: 'X519',
      description: '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      id: 'program2',
      title: '프로그램명 2',
      day: '수',
      startTime: '17:00',
      endTime: '18:00',
      location: 'X519',
      description: '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      id: 'program3',
      title: '프로그램명 3',
      day: '목',
      startTime: '15:00',
      endTime: '17:00',
      location: 'X519',
      description: '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      id: 'program4',
      title: '프로그램명 4',
      day: '금',
      startTime: '14:00',
      endTime: '15:00',
      location: 'X519',
      description: '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      id: 'program5',
      title: '프로그램명 5',
      day: '토',
      startTime: '15:00',
      endTime: '19:00',
      location: 'X519',
      description: '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    }
  ];

  const getDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;
  
    return (end - start) / 60;
  };

  const generateTable = () => {
    const table = Array.from({ length: 8 }, () => Array(4).fill(null));

    programs.forEach((program) => {
      const row = timeToRow(program.startTime);
      const col = dayToColumn(program.day);
      const rowspan = getDuration(program.startTime, program.endTime);

      if (table[row - 1][col - 1] === null) {
        table[row - 1][col - 1] = { title: program.title, id: program.id, rowspan };
        for (let i = 1; i < rowspan; i++) {
          if (table[row - 1 + i]) {
            table[row - 1 + i][col - 1] = 'skip';
          }
        }
      }
    });

    return table;
  };

  const tableData = generateTable();

  return (
    <main className={styles.main}>
      {/* 왼쪽 타임테이블 */}
      <section className={styles.timetableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.dayRow}>
              <th className={styles.dayHeader}></th> 
              <th className={styles.dayHeader} data-day="수"></th>
              <th className={styles.dayHeader} data-day="목"></th>
              <th className={styles.dayHeader} data-day="금"></th>
              <th className={styles.dayHeader} data-day="토"></th>
            </tr>
          </thead>
          <tbody>
            {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td className={styles.timeColumn} data-time={time}></td>
                {Array(4).fill(null).map((_, colIndex) => {
                  const cellData = tableData[rowIndex][colIndex];
                  
                  if (cellData === undefined || cellData === 'skip') {
                    return null; /*병합된 셀은 건너뛰도록 하기*/
                  }

                  if (cellData) {
                    return (
                      <td
                        key={colIndex}
                        className={`${styles.tableCell} ${hoveredProgram === cellData.id ? styles.hovered : ''}`} 
                        rowSpan={cellData.rowspan}
                        onMouseEnter={() => setHoveredProgram(cellData.id)}  
                        onMouseLeave={() => setHoveredProgram(null)}  
                      >
                        {cellData.title}
                      </td>
                    );
                  } else {
                    return <td key={colIndex} className={styles.tableCell}></td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 오른쪽 프로그램 목록 */}
      <section className={styles.programContainer}>
        {programs.map((program, index) => (
          <div
            key={index}
            className={`${styles.programItem} ${openPrograms.includes(index) ? styles.active : ''}`}
          >
            <div
              className={`${styles.programHeader} ${hoveredProgram === program.id ? styles.hovered : ''}`}
              onClick={() => setOpenPrograms(openPrograms.includes(index)
                ? openPrograms.filter(i => i !== index)
                : [...openPrograms, index])}
            >
              <span>{program.title}</span>
              <span className={styles.arrow}>
                {openPrograms.includes(index) ? '▲' : '▼'}
              </span>
            </div>
            {openPrograms.includes(index) && (
              <div className={styles.accordionContent}>
                <div className={styles.programDetails}>
                  <p className={styles.programTime}>{program.startTime} - {program.endTime} ({program.day})</p>
                  <p className={styles.programLocation}>
                    {program.location} 위치 보러가기
                  </p>
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
  );
}
