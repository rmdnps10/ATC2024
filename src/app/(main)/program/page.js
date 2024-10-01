'use client'
import React, { useState } from 'react';
import styles from './page.module.css';

export default function ProgramPage() {
  const [openPrograms, setOpenPrograms] = useState([]);


  const toggleProgram = (index) => {
    if (openPrograms.includes(index)) {
      setOpenPrograms(openPrograms.filter((i) => i !== index));
    } else {
      setOpenPrograms([...openPrograms, index]);
    }
  }; 

  const programs = [
    {
      title: '프로그램명 1',
      time: '13:00 - 14:00 (수)',
      location: 'X519',
      description:
        '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      title: '프로그램명 2',
      time: '17:00 - 18:00 (수)',
      location: 'X519',
      description:
        '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      title: '프로그램명 3',
      time: '15:00 - 17:00 (목)',
      location: 'X519',
      description:
        '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      title: '프로그램명 4',
      time: '14:00 - 15:00 (금)',
      location: 'X519',
      description:
        '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    },
    {
      title: '프로그램명 5',
      time: '18:00 - 19:00 (금)',
      location: 'X519',
      description:
        '프로그램 설명을 적습니다. 설명 관련해서 기획팀과의 협업이 필요하다고 예상 됩니다.',
    }
  ];

  return (
    <main className={styles.main}>
      {/* 왼쪽 타임테이블 */}
      <section className={styles.timetableContainer}>
      <div className={styles.grid}>
        <div className={styles.day}></div>
        <div className={styles.day}>수</div>
        <div className={styles.day}>목</div>
        <div className={styles.day}>금</div>
        <div className={styles.day}>토</div>

        <div className={styles.time}>12:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>13:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>14:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>15:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>16:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>17:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>18:00</div>
        <div></div> <div></div> <div></div><div></div>
        <div className={styles.time}>19:00</div>
        <div></div> <div></div> <div></div> <div className={styles.program}>프로그램명</div>
      </div>
    </section>
    
      {/* 오른쪽 프로그램 목록 */}
      <section className={styles.programContainer}>
        {programs.map((program, index) => (
          <div
            key={index}
            className={`${styles.programItem} ${
              openPrograms.includes(index) ? styles.active : null
            }`}
          >
            <div
              className={styles.programHeader}
              onClick={() => toggleProgram(index)}
            >
              <span>{program.title}</span>
              <span className={styles.arrow}>
                {openPrograms.includes(index) ? '▲' : '▼'}
              </span>
            </div>
            {openPrograms.includes(index) && (
              <div className={styles.accordionContent}>
                <div className={styles.programDetails}>
                  <p className={styles.programTime}>{program.time}</p>
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
