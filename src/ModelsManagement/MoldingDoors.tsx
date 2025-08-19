import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import React from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Plane012: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function MoldingDoors(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/molding_doors.glb') as GLTFResult;

  const [base_map] = [
    useLoader(TextureLoader, '/textures/molding_doors/molding_doors_base.webp'),
  ];

  React.useLayoutEffect(() => {
    base_map.flipY = false;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane012.geometry}
        material={nodes.Plane012.material}
      >
        <meshStandardMaterial map={base_map} lightMap={base_map} lightMapIntensity={1} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/molding_doors.glb');
