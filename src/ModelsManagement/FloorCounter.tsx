import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import React, { JSX } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Cube089: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function FloorCounter(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/floor_counter.glb') as GLTFResult;
  const [base_map, roughness_map, normal_map] = [
    useLoader(TextureLoader, '/textures/floor_counter/floor_counter_base.webp'),
    useLoader(
      TextureLoader,
      '/textures/floor_counter/floor_counter_roughness.webp'
    ),
    useLoader(
      TextureLoader,
      '/textures/floor_counter/floor_counter_normal.webp'
    ),
  ];

  React.useLayoutEffect(() => {
    base_map.flipY = false;
    normal_map.flipY = false;
    roughness_map.flipY = false;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube089.geometry}
        material={nodes.Cube089.material}
        position={[-6.251, 0.588, 0.276]}
      >
        <meshStandardMaterial
          map={base_map}
          
          normalMap={normal_map}
          
          
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/floor_counter.glb');
