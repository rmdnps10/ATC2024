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

  useFrame(() => {
    const scrollOffset = scroll.offset;
    const moveDistance = -80;
    const newY = initialPosition.current.y + scrollOffset * moveDistance;

    camera.position.lerp(new Vector3(initialPosition.current.x, newY, initialPosition.current.z), 0.1);
  });

  return null;
}
