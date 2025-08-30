import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';
type GLTFResult = GLTF & {
  nodes: {
    glasses_bottle_transparent: THREE.Mesh;
    wine_bottles: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function WineBottles(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/wine_bottles.glb') as GLTFResult;

  const base_map = TextureAssetsLoader(
    '/textures/wine_bottles/wine_bottles_base.webp'
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.glasses_bottle_transparent.geometry}
        material={nodes.glasses_bottle_transparent.material}
        position={[2.562, 1.038, -7.988]}
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
        <meshStandardMaterial map={base_map} lightMap={base_map} lightMapIntensity={1}/>
      </mesh>
    </group>
  );
}

useGLTF.preload('/wine_bottles.glb');
