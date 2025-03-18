import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { UseButtonsRoomContext } from '../context/UseContexts';
import gsap from 'gsap';

type GLTFResult = GLTF & {
  nodes: {
    arrow_choose: THREE.Mesh;
    menu_1: THREE.Mesh;
    menu_2: THREE.Mesh;
    menu_option_1: THREE.Mesh;
    menu_option_2: THREE.Mesh;
    menu_option_3: THREE.Mesh;
    menu_option_4: THREE.Mesh;
    menu_option_5: THREE.Mesh;
  };
  materials: {
    ['Material.006']: THREE.MeshStandardMaterial;
    menu: THREE.MeshStandardMaterial;
    ['Material.005']: THREE.MeshStandardMaterial;
  };
};

export function RestaurantMenu(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/restaurant_menu.glb') as GLTFResult;
  const { menuActive } = UseButtonsRoomContext();
  const refMenu = React.useRef<null | THREE.Group>(null);

  React.useEffect(() => {
    if (refMenu.current) {
      if (menuActive) {
        gsap.to(refMenu.current.position, {
          x: 6.8,
          y: 1.36,
          z: -4.8,
          duration: 1,
        });

        gsap.to(refMenu.current.rotation, {
          x: 0,
          y: 0,
          z: -1.4,
          duration: 1,
        });
      } else {
        gsap.to(refMenu.current.position, {
          x: 6.383,
          y: 0.992,
          z: -4.597,
          duration: 1,
        });

        gsap.to(refMenu.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
        });
      }
    }
  });

  React.useEffect(() => {
    /*const gui = new GUI();

    gui.addFolder('menu_move');

    if (refMenu.current) {
      gui.add(refMenu.current.position, 'x', 6, 7.5);
      gui.add(refMenu.current.position, 'y', -1.5, 1.5);
      gui.add(refMenu.current.position, 'z', -6, -4);

      gui.add(refMenu.current.rotation, 'x', 6, 7.5);
      gui.add(refMenu.current.rotation, 'y', -1.5, 1.5);
      gui.add(refMenu.current.rotation, 'z', -10, -4);
    }*/
  });

  return (
    <group {...props} dispose={null}>
      <group ref={refMenu} position={[6.383, 0.992, -4.597]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.arrow_choose.geometry}
          material={materials['Material.006']}
          position={[-0.16, 0.002, 0.021]}
        />
        <group rotation={[-Math.PI, 1.567, -Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.menu_1.geometry}
            material={materials.menu}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.menu_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        {/*<mesh
          castShadow
          receiveShadow
          geometry={nodes.menu_option_1.geometry}
          material={nodes.menu_option_1.material}
          position={[-0.16, 0.005, -0.073]}
        >
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.menu_option_2.geometry}
          material={nodes.menu_option_2.material}
          position={[-0.078, 0.005, -0.073]}
        >
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.menu_option_3.geometry}
          material={nodes.menu_option_3.material}
          position={[0.001, 0.005, -0.073]}
        >
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.menu_option_4.geometry}
          material={nodes.menu_option_4.material}
          position={[0.08, 0.005, -0.073]}
        >
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.menu_option_5.geometry}
          material={nodes.menu_option_5.material}
          position={[0.159, 0.005, -0.073]}
        >
          <meshStandardMaterial opacity={0} transparent />
        </mesh>*/}
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant_menu.glb');
