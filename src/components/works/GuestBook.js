'use client'
import Image from 'next/image'
import styles from './GuesBook.module.css'
import React, { useEffect, useState } from 'react'
//
//
//
function GuestBook({ comment }) {
  const data = [
    {
      name: '이것은 여섯글',
      date: '20241120',
      comment:
        "one's commentone's commentone's commentone's commentone's commentone's commentone's commentone's commentone's commentone's commentone's commentone's comment"
    },
    {
      name: 'two',
      date: '20241120',
      comment:
        "two's commenttwo's commenttwo's commenttwo's commenttwo's commenttwo's commenttwo's commenttwo's commentvtwo's commenttwo's commenttwo's commenttwo's comment"
    },
    {
      name: 'three',
      date: '20241120',
      comment: "three's comment"
    },
    {
      name: 'four',
      date: '20241120',
      comment: "four's comment"
    },
    {
      name: 'five',
      date: '20241120',
      comment: "five's comment"
    },
    {
      name: 'six',
      date: '20241120',
      comment: "six's comment"
    },
    {
      name: 'seven',
      date: '20241120',
      comment: "seven's comment"
    },
    {
      name: 'eight',
      date: '20241120',
      comment: "eight's comment"
    },
    {
      name: 'nine',
      date: '20241120',
      comment: "nine's comment"
    },
    {
      name: 'ten',
      date: '20241120',
      comment: "ten's comment"
    }
  ]
  const [commentList, setCommentList] = useState(null)
  const [randomNums, setRandomNums] = useState([])
  useEffect(() => {
    //1. data fetching + 상태 관리 업데이트
    setCommentList(data)
    //2. data 길이 계산
    const length = data.length
    //3. length만큼 랜덤 숫자 배열에 넣기
    const generatedRandoms = Array.from(
      { length },
      () => Math.floor(Math.random() * 7) + 1
    )
    console.log(generatedRandoms)
    setRandomNums(generatedRandoms)
  }, [])

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
