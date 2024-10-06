// CameraController.jsx
import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function CameraController() {
  const scroll = useScroll();
  const { camera } = useThree();

  // 초기 카메라 위치 저장
  const initialPosition = useRef(new THREE.Vector3().copy(camera.position));

  useFrame(() => {
    // 스크롤 오프셋(0부터 1까지)
    const scrollOffset = scroll.offset;

    // 원하는 이동 거리 설정 (예: y축으로 -20만큼 이동)
    const moveDistance = -20;

    // 새로운 카메라 위치 계산
    const newY = initialPosition.current.y + scrollOffset * moveDistance;

    // 카메라 위치 부드럽게 보간
    camera.position.lerp(new THREE.Vector3(initialPosition.current.x, newY, initialPosition.current.z), 0.1);

    // 필요에 따라 카메라 타겟도 조정
    // 예: camera.lookAt(0, newY, 0);
  });

  return null;
}
