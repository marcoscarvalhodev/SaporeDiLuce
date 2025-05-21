import { JSX } from 'react';
import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import {
  UseAnimationsContext,
  UseCameraMovementContext,
} from '../context/UseContexts';

type GLTFResult = GLTF & {
  nodes: {
    Plane015: THREE.Mesh;
    Plane017: THREE.Mesh;
    glass_material_2: THREE.Mesh;
    Plane022: THREE.Mesh;
    glass_material_3: THREE.Mesh;
    Plane019: THREE.Mesh;
    glass_material: THREE.Mesh;
    merged_scenery: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Restaurant(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF('/restaurant.glb') as GLTFResult;
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
        <mesh
          name='Plane015'
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={nodes.Plane015.material}
          position={[-4.125, 0.015, -2.908]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.855}
        />
        <mesh
          name='Plane017'
          castShadow
          receiveShadow
          geometry={nodes.Plane017.geometry}
          material={nodes.Plane017.material}
          position={[-4.122, 0.015, -5.085]}
          scale={0.855}
        />
        <group name='door_right_wrapper' position={[8.069, 0, -0.63]}>
          <mesh
            name='glass_material_2'
            castShadow
            receiveShadow
            geometry={nodes.glass_material_2.geometry}
            material={nodes.glass_material_2.material}
            rotation={[0, 0, -Math.PI / 2]}
          >
           
          </mesh>
          <mesh
            name='Plane022'
            castShadow
            receiveShadow
            geometry={nodes.Plane022.geometry}
            material={nodes.Plane022.material}
            rotation={[0, 0, -Math.PI / 2]}
          />
        </group>
        <group name='door_left_wrapper' position={[8.069, 0, 1.482]}>
          <mesh
            name='glass_material_3'
            castShadow
            receiveShadow
            geometry={nodes.glass_material_3.geometry}
            material={nodes.glass_material_3.material}
            rotation={[0, 0, -Math.PI / 2]}
          >
            {' '}
           
          </mesh>
          <mesh
            name='Plane019'
            castShadow
            receiveShadow
            geometry={nodes.Plane019.geometry}
            material={nodes.Plane019.material}
            rotation={[0, 0, -Math.PI / 2]}
          />
        </group>
        <mesh
          name='glass_material'
          castShadow
          receiveShadow
          geometry={nodes.glass_material.geometry}
          material={nodes.glass_material.material}
          position={[-3.332, 2.232, -6.442]}
          rotation={[-Math.PI, 1.187, Math.PI / 2]}
        >
          
        </mesh>
        <mesh
          name='merged_scenery'
          castShadow
          receiveShadow
          geometry={nodes.merged_scenery.geometry}
          material={nodes.merged_scenery.material}
          position={[0.162, 2.526, -3.035]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant.glb');
