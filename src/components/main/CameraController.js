'use client'

import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
//
//
//
export default function CameraController() {
  const scroll = useScroll();
  const { camera } = useThree();
  const initialPosition = useRef(new Vector3().copy(camera.position));
  const xRef = useRef(initialPosition.current.x);

  useFrame(() => {
    let adjustedScrollOffset = scroll.offset;

    const scrollOffset = adjustedScrollOffset;
    const moveDistance = -120;
    let newY = initialPosition.current.y + scrollOffset * moveDistance;
    const xMoveDistance = 200;
    let newX = 0;

    if (scrollOffset < 0.45) {
      newX = initialPosition.current.x;
    } else if (scrollOffset >= 0.45 && scrollOffset <= 0.625) {
      const xProgress = (scrollOffset - 0.45) / (1 - 0.45);
      newX = initialPosition.current.x + xMoveDistance * xProgress;
      xRef.current = newX;
    } else if (scrollOffset > 0.625) {
      newY = initialPosition.current.y + scrollOffset * moveDistance;
      newX = 63.5;
    } else {
      newX = xRef.current;
    }

    camera.position.lerp(
      new Vector3(newX, newY, initialPosition.current.z),
      0.08
    );
  });

  return null;
}