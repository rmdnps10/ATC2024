'use client'

import Image from 'next/image'
import styles from './WorkDetailModal.module.css'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function WorkDetailModal({
  interviewText,
  setModalOpen,
  teamName
}) {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
  const [parsedData, setParsedData] = useState([])
  useEffect(() => {
    const questions = interviewText.split(/Q\.\s+/).slice(1)
    const parsed = questions.map(question => {
      const questionText = question
        .replace(/^\n/, '')
        .match(/^[^?]*\?|[\s\S]*/g)
        .filter(Boolean)
      return questionText
    })
    setParsedData(parsed)
  }, [])

  return (
    <motion.div
      className={styles.section}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}>
      <div className={styles.elephantDiv}>
        <span className={styles.elephantSpan}>
          <Image
            fill
            objectFit="contain"
            src={'/images/works/modalElephant.png'}
            alt="elephant"
          />
        </span>
      </div>
      <Image
        onClick={() => {
          setModalOpen(false)
        }}
        width={15}
        height={15}
        className={styles.exitBtn}
        src={'/images/works/exit.svg'}
        alt="exit"
      />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>아티스트 인터뷰</h1>
          <h2>
            <span className={styles.headerTeam}>{teamName}</span>
            <span>이/가 생각한 주제문과 작품에 대한 이야기입니다.</span>
          </h2>
        </div>
        <div className={styles.body}>
          {parsedData.map(data => (
            <div>
              <h1>
                <span>Q.</span>
                <h3>{data[0]}</h3>
              </h1>
              <h1>
                <span>A.</span>
                <h4
                  dangerouslySetInnerHTML={{
                    __html: data[1]
                      .replace(/^\n/, '')
                      .replace(/\n/g, '<br/><br/>')
                  }}
                />
              </h1>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
