import { useEffect } from 'react'

function CameraRig({
  controlsRef,
  targetPosition,
  targetFocus,
  enabled,
  onRigActivate
}) {
  useEffect(() => {
    if (controlsRef.current && targetPosition && targetFocus && enabled) {
      controlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        targetFocus.x,
        targetFocus.y,
        targetFocus.z,
        true
      )
      onRigActivate?.() // CameraRig 활성화 시 콜백 호출
    }
  }, [controlsRef, targetPosition, targetFocus, enabled, onRigActivate])

  return null
}

export default CameraRig
