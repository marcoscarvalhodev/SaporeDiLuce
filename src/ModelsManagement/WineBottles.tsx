import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    wine_bottles_transparent: THREE.Mesh;
    wine_bottles: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function WineBottles(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/wine_bottles.glb') as GLTFResult;

  const [base_map] = [
    useLoader(TextureLoader, '/textures/wine_bottles/wine_bottles_base.webp'),
  ];

  React.useLayoutEffect(() => {
    base_map.flipY = false;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wine_bottles_transparent.geometry}
        material={nodes.wine_bottles_transparent.material}
        position={[1.657, 3.456, -9.942]}
        rotation={[0, 0.71, 0]}
      >
        <meshPhysicalMaterial
          roughness={0.1}
          metalness={0.1}
          envMapIntensity={0.9}
          transparent
          opacity={0.7}
          reflectivity={0.5}
          transmission={1.0}
          color={'#ffffff'}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wine_bottles.geometry}
        material={nodes.wine_bottles.material}
        position={[7.404, 2.529, -9.984]}
        rotation={[0, 0.493, 0]}
      >
        <meshStandardMaterial map={base_map} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/wine_bottles.glb');
