import * as THREE from 'three';
import React from 'react';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    chairs_decoration: THREE.SkinnedMesh;
    Bone: THREE.Bone;
    neutral_bone: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function ChairsDecorations(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/chairs_decorations.glb') as GLTFResult;
  const group = useRef<THREE.Group | null>(null);
  const base_map = TextureAssetsLoader(
    '/textures/chairs_decorations/chairs_decorations_base.webp'
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group
          name='fork'
          position={[3.807, 1.033, -4.702]}
          rotation={[1.486, -0.01, 0.122]}
        >
          <skinnedMesh
            name='chairs_decoration'
            geometry={nodes.chairs_decoration.geometry}
            material={nodes.chairs_decoration.material}
            skeleton={nodes.chairs_decoration.skeleton}
          >
            <meshStandardMaterial
              map={base_map}
              lightMap={base_map}
              lightMapIntensity={1}
            />
          </skinnedMesh>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/chairs_decorations.glb');
