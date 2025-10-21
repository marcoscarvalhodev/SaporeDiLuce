import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    wine_bottles: THREE.Mesh;
    liquid_glasses: THREE.Mesh;
    transparent_glasses: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function GlassesBottles(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/glasses_bottles.glb') as GLTFResult;

  const base_map = TextureAssetsLoader(
    '/textures/glasses_bottles/glasses_bottles_base.webp'
  );
  const alpha_map = TextureAssetsLoader(
    '/textures/glasses_bottles/glasses_bottles_alpha.webp'
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.transparent_glasses.geometry}
        material={nodes.transparent_glasses.material}
        position={[4.315, 1.312, -8.711]}
      >
        <meshPhysicalMaterial
          roughness={0.1}
          metalness={0.1}
          envMapIntensity={0.1}
          transparent
          opacity={1}
          ior={2}
          reflectivity={0.1}
          transmission={0.9}
          color={'#ffffff'}
          depthWrite={false}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wine_bottles.geometry}
        material={nodes.wine_bottles.material}
        position={[4.315, 1.312, -8.711]}
        rotation={[0, 0.493, 0]}
      >
        <meshStandardMaterial map={base_map} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.liquid_glasses.geometry}
        material={nodes.liquid_glasses.material}
        position={[4.315, 1.312, -8.711]}
        rotation={[0, 0.493, 0]}
      >
        <meshPhysicalMaterial
          map={base_map}
          alphaMap={alpha_map}
          alphaTest={0.6}
          transparent
          ior={0.2}
          transmission={0.8}
          reflectivity={0.5}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/glasses_bottles.glb');
