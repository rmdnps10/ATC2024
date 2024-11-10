'use client'
import Image from 'next/image'
import styles from './GuesBook.module.css'
import React, { useEffect, useState } from 'react'
//
//
//
function GuestBook({ comment }) {
  const [commentList, setCommentList] = useState(null)
  const [randomNums, setRandomNums] = useState([])
  useEffect(() => {
    //1.상태 관리 업데이트
    setCommentList(comment)
    //2. data 길이 계산
    const length = comment.length
    //3. length만큼 랜덤 숫자 배열에 넣기
    const generatedRandoms = Array.from(
      { length },
      () => Math.floor(Math.random() * 7) + 1
    )
    setRandomNums(generatedRandoms)
  }, [comment])

  return (
    <div className={styles.wrapper}>
      <div className={styles.smallWrapper}>
        <div className={styles.row}>
          {commentList?.map((el, idx) => {
            if (idx % 2 === 0)
              return (
                <div
                  className={styles.commentBox}
                  key={idx}>
                  <span className={styles.imageContainer}>
                    <Image
                      alt="icon"
                      src={`/images/works/branding${randomNums[idx]}.svg`}
                      fill
                      objectFit="contain"
                    />
                  </span>
                  <div className={styles.commentInBox}>
                    <div className={styles.comment}>
                      <h1>{el.name}</h1>
                      <p>{el.date}</p>
                      <h3>{el.comment}</h3>
                    </div>
                  </div>
                </div>
              )
            else return null
          })}
        </div>
        <div className={styles.row}>
          {commentList?.map((el, idx) => {
            if (idx % 2 === 1)
              return (
                <div
                  className={styles.commentBox}
                  key={idx}>
                  <span className={styles.imageContainer}>
                    <Image
                      alt="icon"
                      src={`/images/works/branding${randomNums[idx]}.svg`}
                      fill
                      objectFit="contain"
                    />
                  </span>
                  <div className={styles.commentInBox}>
                    <div className={styles.comment}>
                      <h1>{el.name}</h1>
                      <p>{el.date}</p>
                      <h3>{el.comment}</h3>
                    </div>
                  </div>
                </div>
              )
            else return null
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(GuestBook)
