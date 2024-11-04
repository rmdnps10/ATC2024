'use client'
import FourthFloorMap from '/public/images/map/4floor.svg'
import styles from './page.module.css'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function CreditPage() {
  const mapRef = useRef(null)
  const [hoveredTitle, setHoveredTitle] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState(null)

  const handleMouseEnter = useCallback(event => {
    const title = event.target.getAttribute('title')
    console.log('Hovered Title:', title) // Debugging log
    if (title) {
      setHoveredTitle(title)
    }
  }, [])

  const handleMouseMove = useCallback(event => {
    if (mapRef.current) {
      const mapBoxRect = mapRef.current.getBoundingClientRect()
      setTooltipPosition({
        x: event.clientX - mapBoxRect.left + 10, // Offset for better positioning
        y: event.clientY - mapBoxRect.top + 10
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredTitle(null)
    setTooltipPosition(null)
  }, [])

  useEffect(() => {
    const mapElement = mapRef.current
    // mapElement.forE
  }, [handleMouseEnter, handleMouseMove, handleMouseLeave])

  return (
    <main className={styles.main}>
      <FourthFloorMap
        ref={mapRef}
        className={styles.svg}
      />
      {/* {hoveredTitle && ( */}
      <div
        style={{
          position: 'absolute',
          // left: tooltipPosition?.x,
          // top: tooltipPosition?.y,
          // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          // color: '#fff',
          padding: '5px',
          borderRadius: '3px'
          // pointerEvents: 'none'
        }}>
        {hoveredTitle}
      </div>
      {/* )} */}
    </main>
  )
}
