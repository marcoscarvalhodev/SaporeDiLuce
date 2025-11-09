import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useKTX2 } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { MeshReflectorMaterial } from '../helpers/MeshReflectorMaterial';
import { useFrame, useThree } from '@react-three/fiber';
import { UseFeaturesToggleContext } from '../context/UseContexts';

type GLTFResult = GLTF & {
  nodes: {
    floor: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Floor(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('/floor.glb') as GLTFResult;
  const reflectMeshRef = React.useRef<null | THREE.Mesh>(null);
  const [base_map, normal_map] = [
    useKTX2('/textures/floor/floor_base.ktx2'),
    useKTX2('/textures/floor/floor_normal.ktx2'),
  ];

  const { gl, camera, scene } = useThree();
  const { activeReflections } = UseFeaturesToggleContext();

  React.useEffect(() => {
    if (reflectMeshRef.current?.material) {
      if (activeReflections) {
        reflectMeshRef.current.material = new MeshReflectorMaterial(
          gl,
          camera,
          scene,
          reflectMeshRef.current,
          {
            mixBlur: 100,
            mixStrength: 1.3,
            resolution: 256,
            blur: [1024, 56],
            minDepthThreshold: 0.8,
            maxDepthThreshold: 1.9,
            depthScale: 1,
            depthToBlurRatioBias: 0.5,
            mirror: 0.1,
            distortion: 0,
            mixContrast: 1,
            reflectorOffset: -0.6,
            bufferSamples: 2,
            planeNormal: new THREE.Vector3(0, 1, 0),
          }
        );

        if (reflectMeshRef.current.material instanceof MeshReflectorMaterial) {
          reflectMeshRef.current.material.setValues({
            map: base_map,
            normalMap: normal_map,
            
            lightMap: base_map,
            normalScale: new THREE.Vector2(3, 3),
            lightMapIntensity: 1,
          });
        }
      } else {
        reflectMeshRef.current.material = new THREE.MeshStandardMaterial({
          map: base_map,
          normalMap: normal_map,
          normalScale: new THREE.Vector2(3, 3),
          lightMap: base_map,
          lightMapIntensity: 1,
        });
      }
    }
  });

  useFrame(() => {
    if (reflectMeshRef.current?.material instanceof MeshReflectorMaterial) {
      reflectMeshRef.current.material.update();
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          ref={reflectMeshRef}
          receiveShadow
          geometry={nodes.floor.geometry}
          material={nodes.floor.material}
          position={[-6.251, 0.588, 0.276]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/floor.glb');
