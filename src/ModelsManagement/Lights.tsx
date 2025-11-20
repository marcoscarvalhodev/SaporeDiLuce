import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Cylinder046: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Lights(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/lights.glb') as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <pointLight
      color={"#fff09e"}
      position={[1, 6, -3]}
      intensity={20}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-radius={4}
      shadow-bias={-0.000001}
        
      />

<ambientLight intensity={0.8}/>

      <mesh
        geometry={nodes.Cylinder046.geometry}
        material={nodes.Cylinder046.material}
        position={[6.496, 4.466, -8.554]}
        scale={0.463}
      >
        <meshStandardMaterial emissive={'#fcd787'} emissiveIntensity={50} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/lights.glb');
