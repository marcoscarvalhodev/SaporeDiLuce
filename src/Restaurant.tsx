import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useThree } from '@react-three/fiber';
import MoveCamera from './MoveCamera';
import { JSX } from 'react';
import { UseOrbitContext } from './context/UseContexts';

type GLTFResult = GLTF & {
  nodes: {
    Plane015: THREE.Mesh;
    Plane017: THREE.Mesh;
    Plane009: THREE.Mesh;
    Plane018: THREE.Mesh;
    Plane022: THREE.Mesh;
    Plane019: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Restaurant(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes,animations } = useGLTF(
    '/restaurant.glb'
  ) as GLTFResult;
  const { mixer } = useAnimations(animations, group);

  const { orbitExists } = UseOrbitContext();

  const { camera } = useThree();
  const { cameraForward } = MoveCamera(camera);

  document
    .getElementById('button-click')
    ?.addEventListener('click', cameraForward);

  React.useEffect(() => {
    if (orbitExists) {
      animations.forEach((item) => {
        const doors = mixer.clipAction(item);
        doors.reset();
        doors.clampWhenFinished = true;
        doors.timeScale = 1;
        doors.setLoop(THREE.LoopOnce, 1);
        doors.play();
      });
    }
  }, [orbitExists, animations, mixer]);

  React.useEffect(() => {
    const closeDoorButton = document.getElementById('close-door');
    closeDoorButton?.addEventListener('click', () => {
      animations.forEach((item) => {
        const doors = mixer.clipAction(item);
        doors.paused = false;
        doors.timeScale = -1;
      });
    });
  });

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
          name='Plane009'
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={nodes.Plane009.material}
          position={[-0.044, 0, -1.457]}
          scale={11.949}
        />
        <mesh
          name='Plane018'
          castShadow
          receiveShadow
          geometry={nodes.Plane018.geometry}
          material={nodes.Plane018.material}
          position={[-4.107, 0, -2.539]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          name='Plane022'
          castShadow
          receiveShadow
          geometry={nodes.Plane022.geometry}
          material={nodes.Plane022.material}
          position={[8.069, 0, -0.815]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          name='Plane019'
          castShadow
          receiveShadow
          geometry={nodes.Plane019.geometry}
          material={nodes.Plane019.material}
          position={[8.069, 0, 1.649]}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant.glb');
