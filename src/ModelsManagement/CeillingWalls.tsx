import * as THREE from 'three';
import React from 'react';
import { useGLTF, useKTX2 } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';



type GLTFResult = GLTF & {
  nodes: {
    ceilling_walls: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function CeillingWalls(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/ceilling_walls.glb') as GLTFResult;
  const base_map = useKTX2(
    '/textures/ceilling_walls/ceilling_walls_base.ktx2'
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.ceilling_walls.geometry}
        material={nodes.ceilling_walls.material}
        position={[-0.378, 4.473, -2.514]}
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

useGLTF.preload('/ceilling_walls.glb');
