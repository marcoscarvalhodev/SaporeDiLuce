import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const TestMesh = () => {
  const refMesh = React.useRef<Mesh | null>(null);

  useFrame(() => {
    if (refMesh.current) {
      refMesh.current.position.y = 2;
      refMesh.current.rotation.y += 0.05;
      refMesh.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={refMesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};

export default TestMesh;
