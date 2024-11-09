// CameraRig.jsx
import { useEffect } from 'react'

function CameraRig({ controlsRef, targetPosition, targetFocus }) {
  useEffect(() => {
    if (controlsRef.current && targetPosition && targetFocus) {
      controlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        targetFocus.x,
        targetFocus.y,
        targetFocus.z,
        true
      )
    }
  }, [controlsRef, targetPosition, targetFocus])

  return null
}

export default CameraRig
