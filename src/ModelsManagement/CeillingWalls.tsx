import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    ceilling_walls: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function CeillingWalls(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/ceilling_walls.glb') as GLTFResult;
  const base_map = TextureAssetsLoader(
    '/textures/ceilling_walls/ceilling_walls_base.webp'
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ceilling_walls.geometry}
        material={nodes.ceilling_walls.material}
        position={[-0.378, 4.473, -2.514]}
      >
        <meshStandardMaterial map={base_map} lightMap={base_map} lightMapIntensity={1}/>
      </mesh>
    </group>
  );
}

useGLTF.preload('/ceilling_walls.glb');
