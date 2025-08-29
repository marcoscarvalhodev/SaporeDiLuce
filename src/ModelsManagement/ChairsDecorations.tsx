import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
type GLTFResult = GLTF & {
  nodes: {
    chairs_decoration: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function ChairsDecorations(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/chairs_decorations.glb') as GLTFResult;
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chairs_decoration.geometry}
        material={nodes.chairs_decoration.material}
        position={[6.292, 0.749, -4.917]}
      >
        
      </mesh>
    </group>
  );
}

useGLTF.preload('/chairs_decorations.glb');
