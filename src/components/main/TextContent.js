// TextContent.js
import { Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function TextContent() {
  const { viewport } = useThree();
  const scroll = useScroll();
  const groupRef = useRef();

  const texts = [
    { position: [0, 0, 0], text: 'ATC2024' },
    { position: [0, -viewport.height * 1, 0], text: '냉장고에 코끼리를 넣는법' },
    { position: [0, -viewport.height * 2, 0], text: '간단한 소개' },
  ];

  useFrame(() => {
    const offset = scroll.offset;
    if (groupRef.current) {
      // 스크롤에 따라 텍스트 그룹의 위치를 변경하여 텍스트들이 나타나고 사라지게 함
      groupRef.current.position.y = offset * viewport.height * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {texts.map((item, index) => (
        <Text
          key={index}
          position={item.position}
          fontSize={1}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {item.text}
        </Text>
      ))}
    </group>
  );
}
