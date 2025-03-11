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
    Object_2: THREE.Mesh;
    Object_2001: THREE.Mesh;
    Object_2004: THREE.Mesh;
    Plane015: THREE.Mesh;
    Plane017: THREE.Mesh;
    WindowFrame004: THREE.Mesh;
    Plane009: THREE.Mesh;
    CTRL_Hole002: THREE.Mesh;
    WindowFrame002: THREE.Mesh;
    WindowL: THREE.Mesh;
    WindowR002: THREE.Mesh;
    Handle002: THREE.Mesh;
    Plane011: THREE.Mesh;
    glass: THREE.Mesh;
    CTRL_Hole: THREE.Mesh;
    WindowFrame003: THREE.Mesh;
    WindowR003: THREE.Mesh;
    CTRL_Hole003: THREE.Mesh;
    WindowFrame001: THREE.Mesh;
    WindowR: THREE.Mesh;
    Handle001: THREE.Mesh;
    CTRL_Hole001: THREE.Mesh;
    WindowFrame: THREE.Mesh;
    WindowR001: THREE.Mesh;
    Handle: THREE.Mesh;
    glass_1: THREE.Mesh;
    Plane022: THREE.Mesh;
    glass_2: THREE.Mesh;
    Plane019: THREE.Mesh;
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
        <group
          name='Sketchfab_model004'
          position={[2.688, 3.713, -7.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.008}
        >
          <group name='Lampara_techoobjcleanermaterialmergergles'>
            <mesh
              name='Object_2'
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={nodes.Object_2.material}
            />
          </group>
        </group>
        <group
          name='Sketchfab_model005'
          position={[4.577, 3.713, -7.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.008}
        >
          <group name='Lampara_techoobjcleanermaterialmergergles001'>
            <mesh
              name='Object_2001'
              castShadow
              receiveShadow
              geometry={nodes.Object_2001.geometry}
              material={nodes.Object_2001.material}
            />
          </group>
        </group>
        <group
          name='Sketchfab_model008'
          position={[6.668, 3.713, -8.804]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.008}
        >
          <group name='Lampara_techoobjcleanermaterialmergergles004'>
            <mesh
              name='Object_2004'
              castShadow
              receiveShadow
              geometry={nodes.Object_2004.geometry}
              material={nodes.Object_2004.material}
            />
          </group>
        </group>
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
          name='WindowFrame004'
          castShadow
          receiveShadow
          geometry={nodes.WindowFrame004.geometry}
          material={nodes.WindowFrame004.material}
          position={[4.656, 2.002, -10.524]}
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
        <group name='Window_Group002' position={[4.656, 2.002, -10.401]}>
          <mesh
            name='CTRL_Hole002'
            castShadow
            receiveShadow
            geometry={nodes.CTRL_Hole002.geometry}
            material={nodes.CTRL_Hole002.material}
            position={[0, 0, 0.105]}
          />
          <mesh
            name='WindowFrame002'
            castShadow
            receiveShadow
            geometry={nodes.WindowFrame002.geometry}
            material={nodes.WindowFrame002.material}
          >
            <mesh
              name='WindowL'
              castShadow
              receiveShadow
              geometry={nodes.WindowL.geometry}
              material={nodes.WindowL.material}
              position={[-0.909, 0.052, 0.07]}
            />
            <mesh
              name='WindowR002'
              castShadow
              receiveShadow
              geometry={nodes.WindowR002.geometry}
              material={nodes.WindowR002.material}
              position={[0.909, 0.052, 0.07]}
            >
              <mesh
                name='Handle002'
                castShadow
                receiveShadow
                geometry={nodes.Handle002.geometry}
                material={nodes.Handle002.material}
                position={[-0.883, 0.703, 0]}
              />
            </mesh>
          </mesh>
        </group>
        <mesh
          name='Plane011'
          castShadow
          receiveShadow
          geometry={nodes.Plane011.geometry}
          material={nodes.Plane011.material}
          position={[8.198, 2.237, 4.13]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          name='glass'
          castShadow
          receiveShadow
          geometry={nodes.glass.geometry}
          material={nodes.glass.material}
          position={[8.117, 2.232, -7.191]}
          rotation={[0, 0, -Math.PI / 2]}
        >
         <meshPhysicalMaterial roughness={0.1} metalness={0.1} envMapIntensity={0.9} transparent opacity={.7} reflectivity={1} transmission={1.0} color={"#9e9fa0"}/>
        </mesh>
        <group
          name='Window_Group003'
          position={[8.074, 3.46, 0.426]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <mesh
            name='CTRL_Hole'
            castShadow
            receiveShadow
            geometry={nodes.CTRL_Hole.geometry}
            material={nodes.CTRL_Hole.material}
            position={[0, 0, 0.105]}
          />
          <mesh
            name='WindowFrame003'
            castShadow
            receiveShadow
            geometry={nodes.WindowFrame003.geometry}
            material={nodes.WindowFrame003.material}
          >
            <mesh
              name='WindowR003'
              castShadow
              receiveShadow
              geometry={nodes.WindowR003.geometry}
              material={nodes.WindowR003.material}
              position={[1.029, 0.052, 0.07]}
            />
          </mesh>
        </group>
        <group name='Window_Group001' position={[4.244, 2.013, -4.151]}>
          <mesh
            name='CTRL_Hole003'
            castShadow
            receiveShadow
            geometry={nodes.CTRL_Hole003.geometry}
            material={nodes.CTRL_Hole003.material}
            position={[0, 0, 0.105]}
          />
          <mesh
            name='WindowFrame001'
            castShadow
            receiveShadow
            geometry={nodes.WindowFrame001.geometry}
            material={nodes.WindowFrame001.material}
          >
            <mesh
              name='WindowR'
              castShadow
              receiveShadow
              geometry={nodes.WindowR.geometry}
              material={nodes.WindowR.material}
              position={[0.549, 0.052, 0.07]}
            >
              <mesh
                name='Handle001'
                castShadow
                receiveShadow
                geometry={nodes.Handle001.geometry}
                material={nodes.Handle001.material}
                position={[-1.073, 0.703, 0]}
              />
            </mesh>
          </mesh>
        </group>
        <group name='Window_Group' position={[6.43, 2.005, -4.138]}>
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
          >
            <mesh
              name='WindowR001'
              castShadow
              receiveShadow
              geometry={nodes.WindowR001.geometry}
              material={nodes.WindowR001.material}
              position={[0.549, 0.052, 0.07]}
            >
              <mesh
                name='Handle'
                castShadow
                receiveShadow
                geometry={nodes.Handle.geometry}
                material={nodes.Handle.material}
                position={[-1.073, 0.703, 0]}
              />
            </mesh>
          </mesh>
        </group>
        <group name='Empty003' position={[8.069, 0, -0.815]}>
          <mesh
            name='glass_1'
            castShadow
            receiveShadow
            geometry={nodes.glass_1.geometry}
            material={nodes.glass_1.material}
            position={[0.048, 2.232, -6.376]}
            rotation={[0, 0, -Math.PI / 2]}
          >
            <meshPhysicalMaterial roughness={0.1} metalness={0.1} envMapIntensity={0.9} transparent opacity={.7} reflectivity={1} transmission={1.0} color={"#9e9fa0"}/>
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
        <group name='Empty004' position={[8.069, 0, 1.649]}>
          <mesh
            name='glass_2'
            castShadow
            receiveShadow
            geometry={nodes.glass_2.geometry}
            material={nodes.glass_2.material}
            position={[0.048, 2.232, -8.839]}
            rotation={[0, 0, -Math.PI / 2]}
          >
           <meshPhysicalMaterial roughness={0.1} metalness={0.1} envMapIntensity={0.9} transparent opacity={.7} reflectivity={1} transmission={1.0} color={"#9e9fa0"}/>
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
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant.glb');
