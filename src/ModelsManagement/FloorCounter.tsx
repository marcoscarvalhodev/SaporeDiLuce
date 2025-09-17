import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { useAnimations } from '@react-three/drei';
import {
  UseCameraMovementContext,
  UseAnimationsContext,
} from '../context/UseContexts';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type GLTFResult = GLTF & {
  nodes: {
    floor_counter: THREE.SkinnedMesh;
    glass_material: THREE.SkinnedMesh;
    door_right: THREE.Bone;
    door_left: THREE.Bone;
    neutral_bone: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function FloorCounter(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF('/floor_counter.glb') as GLTFResult;
  const { mixer } = useAnimations(animations, group);

  const base_map = TextureAssetsLoader(
    '/textures/floor_counter/floor_counter_base.webp'
  );

  const { roomNameState } = UseCameraMovementContext();

  const { doorClose } = UseAnimationsContext();

  const [door_left, door_right] = [nodes['door_left'], nodes['door_right']];

  React.useEffect(() => {});

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
  }, [doorClose, animations, mixer]);
  return (
    <group {...props} dispose={null}>
      <group position={[8.09, 0, -0.63]} scale={0.473}>
        <skinnedMesh
          geometry={nodes.floor_counter.geometry}
          material={nodes.floor_counter.material}
          skeleton={nodes.floor_counter.skeleton}
        >
          <meshStandardMaterial
            map={base_map}
            lightMap={base_map}
            lightMapIntensity={0}
          />
        </skinnedMesh>
        <skinnedMesh
          geometry={nodes.glass_material.geometry}
          material={nodes.glass_material.material}
          skeleton={nodes.glass_material.skeleton}
        >
          <meshPhysicalMaterial
            roughness={0.1}
            metalness={0.1}
            envMapIntensity={0.9}
            transparent
            opacity={0.8}
            reflectivity={1}
            transmission={1.0}
            color={'#ccd3ff'}
          />
        </skinnedMesh>
        <primitive object={nodes.door_right} />
        <primitive object={nodes.door_left} />
        <primitive object={nodes.neutral_bone} />
      </group>
    </group>
  );
}

useGLTF.preload('/floor_counter.glb');
