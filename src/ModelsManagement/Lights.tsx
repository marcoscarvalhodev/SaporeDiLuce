import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Cylinder010: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Lights(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/lights.glb') as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder010.geometry}
        material={nodes.Cylinder010.material}
        position={[-1.409, 4.425, 0.313]}
        scale={[0.274, 0.02, 0.274]}
      >
        <meshStandardMaterial emissive={"#f3d162"} emissiveIntensity={40} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/lights.glb');
