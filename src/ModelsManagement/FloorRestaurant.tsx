import * as THREE from 'three';
import React from 'react';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
  nodes: {
    Cube079: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function FloorRestaurant(props: JSX.IntrinsicElements['group']) {
  const meshRef = React.useRef<null | THREE.Mesh>(null);
  const { nodes } = useGLTF('/floor_restaurant.glb') as GLTFResult;
  const [base_map] = [
    useLoader(TextureLoader, '/textures/floor_counter/floor_counter_base.webp'),
  ];

  React.useLayoutEffect(() => {
    base_map.flipY = false;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Cube079.geometry}
        position={[-6.251, 0.588, 0.276]}
      >
        <meshStandardMaterial map={base_map} lightMap={base_map} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/floor_restaurant.glb');
