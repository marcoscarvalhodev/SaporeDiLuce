import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    wine_bottles: THREE.Mesh;
    glasses_liquid: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function GlassesBottles(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/glasses_bottles.glb') as GLTFResult;

  const base_map_bottles = TextureAssetsLoader(
    '/textures/glasses_bottles/glasses_bottles_base.webp'
  );
  const base_map_glasses = TextureAssetsLoader(
    '/textures/glasses_bottles/glasses_liquid_base.webp'
  );
  const alpha_map = TextureAssetsLoader(
    '/textures/glasses_bottles/glasses_liquid_alpha.webp'
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.wine_bottles.geometry}
        material={nodes.wine_bottles.material}
        position={[4.315, 1.312, -8.711]}
        rotation={[0, 0.493, 0]}
      >
        <meshStandardMaterial map={base_map_bottles} roughness={0.1} />
      </mesh>

      <mesh
        geometry={nodes.glasses_liquid.geometry}
        material={nodes.glasses_liquid.material}
        position={[4.315, 1.312, -8.711]}
      >
        <meshPhysicalMaterial
          map={base_map_glasses}
          alphaMap={alpha_map}
          alphaTest={0}
          roughness={0.1}
          metalness={0.3}
          transmission={0.2}
          clearcoat={1}
          transparent
          ior={1.3}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/glasses_bottles.glb');
