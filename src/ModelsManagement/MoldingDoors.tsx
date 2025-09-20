import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    molding_doors001: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function MoldingDoors(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/molding_doors.glb') as GLTFResult;

  const base_map = TextureAssetsLoader(
    '/textures/molding_doors/molding_doors_base.webp'
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.molding_doors001.geometry}
        material={nodes.molding_doors001.material}
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
