import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { UseCameraMovementContext } from '../context/UseContexts';
import { UseAnimationsContext } from '../context/UseContexts';

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


  const { roomNameState } = UseCameraMovementContext();
  
    const { doorClose } = UseAnimationsContext();
  
    React.useEffect(() => {
      if (
        roomNameState === 'restaurant_enter' ||
        roomNameState === 'restaurant_leave'
      ) {
        animations.forEach((item) => {
          const doors = mixer.clipAction(item);
          doors.reset();
          doors.clampWhenFinished = true;
          doors.timeScale = 1;
          doors.setLoop(THREE.LoopOnce, 1);
          doors.play();
        });
      }
    }, [roomNameState, animations, mixer]);
  
    React.useEffect(() => {
      if (doorClose) {
        animations.forEach((item) => {
          const doors = mixer.clipAction(item);
          doors.paused = false;
          doors.timeScale = -1;
        });
      }
    }, [doorClose, animations, mixer]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='door_bones' position={[8.09, 0, -0.63]} scale={0.473}>
          <skinnedMesh
            name='floor_counter'
            geometry={nodes.floor_counter.geometry}
            material={nodes.floor_counter.material}
            skeleton={nodes.floor_counter.skeleton}
          />
          <skinnedMesh
            name='glass_material'
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
    </group>
  );
}

useGLTF.preload('/floor_counter.glb');
