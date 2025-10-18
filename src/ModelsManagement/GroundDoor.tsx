import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';
import {
  UseCameraMovementContext,
  UseAnimationsContext,
} from '../context/UseContexts';
import { useGSAP } from '@gsap/react';
import { useAnimations } from '@react-three/drei';
import gsap from 'gsap';

type GLTFResult = GLTF & {
  nodes: {
    glass_material: THREE.SkinnedMesh;
    ground_door: THREE.SkinnedMesh;
    door_right: THREE.Bone;
    door_left: THREE.Bone;
    neutral_bone: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function GroundDoor(props: JSX.IntrinsicElements['group']) {
  const { nodes, animations } = useGLTF('/ground_door.glb') as GLTFResult;
  const group = useRef<THREE.Group>(null);
  const base_map = TextureAssetsLoader(
    '/textures/ground_door/ground_door_base.webp'
  );
  const { mixer } = useAnimations(animations, group);

  const { roomNameState } = UseCameraMovementContext();

  const { doorClose } = UseAnimationsContext();

  const { door_right, door_left } = nodes;

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
        <skinnedMesh
          geometry={nodes.ground_door.geometry}
          material={nodes.ground_door.material}
          skeleton={nodes.ground_door.skeleton}
        >
          <meshStandardMaterial
            map={base_map}
            lightMap={base_map}
            lightMapIntensity={1}
          />
        </skinnedMesh>
        <primitive object={nodes.door_right} />
        <primitive object={nodes.door_left} />
        <primitive object={nodes.neutral_bone} />
      </group>
    </group>
  );
}

useGLTF.preload('/ground_door.glb');
