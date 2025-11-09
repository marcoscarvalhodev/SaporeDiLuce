import * as THREE from 'three';
import React from 'react';
import { useGLTF, useKTX2 } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    molding_doors: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function MoldingDoors(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/molding_doors.glb') as GLTFResult;

  const base_map = useKTX2(
    '/textures/molding_doors/molding_doors_base.ktx2'
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.molding_doors.geometry}
        material={nodes.molding_doors.material}
        position={[-4.19, 0.116, 1.392]}
        rotation={[0, -1.571, 0]}
      >
        <meshStandardMaterial
          map={base_map}
          lightMap={base_map}
          lightMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/molding_doors.glb');
