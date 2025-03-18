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
    Plane005: THREE.Mesh;
    CTRL_Hole005: THREE.Mesh;
    WindowFrame003: THREE.Mesh;
    Plane018: THREE.Mesh;
    Plane022: THREE.Mesh;
    glass_material_2: THREE.Mesh;
    glass_material_3: THREE.Mesh;
    Plane019: THREE.Mesh;
    CTRL_Hole: THREE.Mesh;
    WindowFrame001: THREE.Mesh;
    CTRL_Hole001: THREE.Mesh;
    WindowFrame: THREE.Mesh;
    glass_material: THREE.Mesh;
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
          position={[-4.126, 0.015, -2.54]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          name='Plane017'
          castShadow
          receiveShadow
          geometry={nodes.Plane017.geometry}
          material={nodes.Plane017.material}
          position={[-4.122, 0.015, -5.085]}
        />
        <mesh
          name='Plane005'
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={nodes.Plane005.material}
          position={[8.114, 5.036, -6.452]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={-1}
        />
        <group
          name='Window_Group003'
          position={[7.973, 3.46, 0.426]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <mesh
            name='CTRL_Hole005'
            castShadow
            receiveShadow
            geometry={nodes.CTRL_Hole005.geometry}
            material={nodes.CTRL_Hole005.material}
            position={[0, 0, 0.42]}
          />
          <mesh
            name='WindowFrame003'
            castShadow
            receiveShadow
            geometry={nodes.WindowFrame003.geometry}
            material={nodes.WindowFrame003.material}
          />
        </group>
        <mesh
          name='Plane018'
          castShadow
          receiveShadow
          geometry={nodes.Plane018.geometry}
          material={nodes.Plane018.material}
          position={[-4.107, 0, -2.539]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <group name='door_right_wrapper' position={[8.069, 0, -0.815]}>
          <mesh
            name='Plane022'
            castShadow
            receiveShadow
            geometry={nodes.Plane022.geometry}
            material={nodes.Plane022.material}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            name='glass_material_2'
            castShadow
            receiveShadow
            geometry={nodes.glass_material_2.geometry}
            material={nodes.glass_material_2.material}
            rotation={[0, 0, -Math.PI / 2]}
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
              color={'#9e9fa0'}
            />
          </mesh>
        </group>
        <group name='door_left_wrapper' position={[8.069, 0, 1.649]}>
          <mesh
            name='glass_material_3'
            castShadow
            receiveShadow
            geometry={nodes.glass_material_3.geometry}
            material={nodes.glass_material_3.material}
            rotation={[0, 0, -Math.PI / 2]}
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
              color={'#9e9fa0'}
            />
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
        <group name='Window_Group001' position={[4.244, 2.013, -4.147]}>
          <mesh
            name='CTRL_Hole'
            castShadow
            receiveShadow
            geometry={nodes.CTRL_Hole.geometry}
            material={nodes.CTRL_Hole.material}
            position={[0, 0, 0.105]}
          />
          <mesh
            name='WindowFrame001'
            castShadow
            receiveShadow
            geometry={nodes.WindowFrame001.geometry}
            material={nodes.WindowFrame001.material}
          />
        </group>
        <group name='Window_Group' position={[6.43, 2.005, -4.169]}>
          <mesh
            name='CTRL_Hole001'
            castShadow
            receiveShadow
            geometry={nodes.CTRL_Hole001.geometry}
            material={nodes.CTRL_Hole001.material}
            position={[0, 0, 0.105]}
          />
          <mesh
            name='WindowFrame'
            castShadow
            receiveShadow
            geometry={nodes.WindowFrame.geometry}
            material={nodes.WindowFrame.material}
          />
        </group>
        <mesh
          name='glass_material'
          castShadow
          receiveShadow
          geometry={nodes.glass_material.geometry}
          material={nodes.glass_material.material}
          position={[8.117, 2.232, -7.191]}
          rotation={[0, 0, -Math.PI / 2]}
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
            color={'#9e9fa0'}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant.glb');
