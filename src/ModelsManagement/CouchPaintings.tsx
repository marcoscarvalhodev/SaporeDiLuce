import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    couch_paintings: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function CouchPaintings(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/couch_paintings.glb') as GLTFResult;

  const base_map = TextureAssetsLoader(
    '/textures/couch_paintings/couch_paintings_base.webp'
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.couch_paintings.geometry}
        material={nodes.couch_paintings.material}
        position={[2.473, 2.023, 5.344]}
      >
        <meshStandardMaterial map={base_map} lightMap={base_map} lightMapIntensity={1}/>
      </mesh>
    </group>
  );
}

useGLTF.preload('/couch_paintings.glb');
