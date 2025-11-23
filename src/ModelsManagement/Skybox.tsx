import * as THREE from 'three';
import React from 'react';
import { useGLTF, useKTX2 } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';


type GLTFResult = GLTF & {
  nodes: {
    skybox: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Skybox(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/skybox.glb') as GLTFResult;

  const skybox_base = useKTX2('./textures/skybox/skybox_base.ktx2');

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.skybox.geometry}
        material={nodes.skybox.material}
        position={[0.263, -0.016, -0.42]}
        rotation={[Math.PI, 0.142, -3.142]}
      >
        <meshStandardMaterial
          map={skybox_base}
          lightMap={skybox_base}
          lightMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/skybox.glb');
