import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';
import { MeshReflectorMaterial } from '../helpers/MeshReflectorMaterial';
import { useFrame, useThree } from '@react-three/fiber';
import { UseFeaturesToggleContext } from '../context/UseContexts';

type GLTFResult = GLTF & {
  nodes: {
    floor_counter: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function FloorCounter(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('/floor_counter.glb') as GLTFResult;
  const reflectMeshRef = React.useRef<null | THREE.Mesh>(null);
  const base_map = TextureAssetsLoader(
    '/textures/floor_counter/floor_counter_base.webp'
  );

  const { gl, camera, scene } = useThree();
  const { activeReflections } = UseFeaturesToggleContext();

  /*const { roomNameState } = UseCameraMovementContext();

  const { doorClose } = UseAnimationsContext();

  const [door_left, door_right] = [nodes['door_left'], nodes['door_right']];

  useGSAP(() => {
    if (
      roomNameState === 'restaurant_enter' ||
      roomNameState === 'restaurant_leave'
    ) {
      gsap.to(door_left.rotation, {
        y: 1.6,
        duration: 1.3,
      });

      gsap.to(door_right.rotation, {
        y: -1.6,
        duration: 1.3,
      });
    }
  }, [roomNameState, animations, mixer]);

  useGSAP(() => {
    if (doorClose) {
      gsap.to(door_left.rotation, {
        y: 0,
        duration: 1.3,
      });

      gsap.to(door_right.rotation, {
        y: 0,
        duration: 1.3,
      });
    }
  }, [doorClose, animations, mixer]);*/

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
            mixStrength: 1,
            resolution: 1024,
            blur: [1024, 56],
            minDepthThreshold: 0.8,
            maxDepthThreshold: 1.9,
            depthScale: 1,
            depthToBlurRatioBias: 0.3,
            mirror: 0.7,
            distortion: 0,
            mixContrast: 1.1,
            reflectorOffset: -0.5,

            planeNormal: new THREE.Vector3(0, 1, 0),
          }
        );

        if (reflectMeshRef.current.material instanceof MeshReflectorMaterial) {
          reflectMeshRef.current.material.setValues({
            map: base_map,
            lightMap: base_map,
            lightMapIntensity: 1,
          });
        }
      } else {
        reflectMeshRef.current.material = new THREE.MeshStandardMaterial({
          map: base_map,
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
          name='floor_counter'
          castShadow
          receiveShadow
          geometry={nodes.floor_counter.geometry}
          position={[-6.251, 0.588, 0.276]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/floor_counter.glb');
