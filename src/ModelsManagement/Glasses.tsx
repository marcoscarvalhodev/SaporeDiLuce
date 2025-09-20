import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    red_wine: THREE.Mesh;
    white_wine: THREE.Mesh;
    water: THREE.Mesh;
    glass_cup: THREE.Mesh;
  };
  materials: {
    wine_liquid: THREE.MeshPhysicalMaterial;
    white_wine_liquid: THREE.MeshPhysicalMaterial;
    water: THREE.MeshPhysicalMaterial;
    glass: THREE.MeshPhysicalMaterial;
  };
};

export function Glasses(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/glasses.glb') as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        frustumCulled={false}
        
        
        geometry={nodes.red_wine.geometry}
        material={materials.wine_liquid}
        position={[6.315, 1.041, -4.979]}
      />
      <mesh
        frustumCulled={false}
        
        
        geometry={nodes.white_wine.geometry}
        material={materials.white_wine_liquid}
        position={[4.761, 1.034, -8.547]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <meshStandardMaterial color={'black'} />
      </mesh>
      <mesh
        frustumCulled={false}
        
        geometry={nodes.water.geometry}
        position={[4.617, 1.053, -6.771]}
        rotation={[0, Math.PI / 2, 0]}
      >
        {' '}
        <meshPhysicalMaterial
          roughness={0.1}
          metalness={0.1}
          envMapIntensity={0.9}
          transparent
          opacity={0.7}
          reflectivity={1}
          transmission={1.0}
          color={'#8bc5ff'}
        />
      </mesh>
      <mesh
        frustumCulled={false}
        
        geometry={nodes.glass_cup.geometry}
        position={[2.562, 1.038, -7.988]}
      >
        {' '}
        <meshPhysicalMaterial
          roughness={0.1}
          metalness={0.1}
          envMapIntensity={0.9}
          transparent
          opacity={0.7}
          reflectivity={0.5}
          transmission={1.0}
          color={'#ffffff'}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/glasses.glb');
