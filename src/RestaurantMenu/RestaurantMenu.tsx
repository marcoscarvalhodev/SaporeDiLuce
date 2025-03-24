import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import {
  UseButtonsContext,
  UseCameraMovementContext,
  UseOverlaysContext,
} from '../context/UseContexts';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';

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

export function RestaurantMenu() {
  const { nodes, materials } = useGLTF('/restaurant_menu.glb') as GLTFResult;
  const { menuActive, setMenuOptionsClick, setMenuActive } =
    UseButtonsContext();
  const refMenu = React.useRef<null | THREE.Group>(null);
  const refArrow = React.useRef<null | THREE.Mesh>(null);

  const { refCanvasUpdated } = UseCameraMovementContext();

  const { setMenuOverlay } = UseOverlaysContext();

  const [menuOptionsHover, setMenuOptionsHover] = React.useState('');

  React.useEffect(() => {
    if (menuActive) {
      setMenuOverlay(true);
    }
  });

  const { camera } = useThree();

  const pointerActiveMenu = ({
    isActive,
    arrowPosition,
    menuOption,
  }: {
    isActive: boolean;
    arrowPosition?: number;
    menuOption: string;
  }) => {
    if (menuActive) {
      if (isActive) {
        setMenuOptionsHover(menuOption);

        gsap.to(refCanvasUpdated.current, {
          cursor: 'pointer',
        });

        if (refArrow.current) {
          gsap.to(refArrow.current.position, {
            x: arrowPosition,
            duration: 0.5,
            onStart: () => {
              camera.updateProjectionMatrix();
            },
          });
        }
      } else {
        setMenuOptionsHover(menuOption);
        gsap.to(refCanvasUpdated.current, {
          cursor: 'grab',
        });
      }
    }
  };

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
          onComplete: () => {
            refMenu.current?.updateMatrixWorld();
          },
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
          onComplete: () => {
            refMenu.current?.updateMatrixWorld();
          },
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
    <>
      <group name='menu-wrapper' dispose={null}>
        <group ref={refMenu} position={[6.383, 0.996, -4.597]}>
          <mesh
            ref={refArrow}
            name='arrow_choose'
            castShadow
            receiveShadow
            geometry={nodes.arrow_choose.geometry}
            material={materials['Material.006']}
            position={[-0.16, 0.002, 0.021]}
            renderOrder={1}
          />
          <mesh
            onClick={() => {
              setMenuActive(false);
              setMenuOptionsClick('dish_1');
            }}
            onPointerEnter={() =>
              pointerActiveMenu({
                isActive: true,
                arrowPosition: -0.158,
                menuOption: 'menu_option_1',
              })
            }
            onPointerLeave={() =>
              pointerActiveMenu({ isActive: false, menuOption: '' })
            }
            name='menu_option_1'
            castShadow
            receiveShadow
            geometry={nodes.menu_option_1.geometry}
            material={nodes.menu_option_1.material}
            position={[-0.16, 0.004, -0.073]}
            renderOrder={1}
          >
            {' '}
            <meshBasicMaterial
              color={new THREE.Color(0, 0, 0)}
              transparent={true}
              opacity={menuOptionsHover === 'menu_option_1' ? 0.1 : 0}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
          <mesh
            onClick={() => {
              setMenuActive(false);
              setMenuOptionsClick('dish_2');
            }}
            onPointerEnter={() =>
              pointerActiveMenu({
                isActive: true,
                arrowPosition: -0.075,
                menuOption: 'menu_option_2',
              })
            }
            onPointerLeave={() =>
              pointerActiveMenu({ isActive: false, menuOption: '' })
            }
            name='menu_option_2'
            castShadow
            receiveShadow
            geometry={nodes.menu_option_2.geometry}
            material={nodes.menu_option_2.material}
            position={[-0.078, 0.004, -0.073]}
            renderOrder={1}
          >
            <meshBasicMaterial
              color={new THREE.Color(0, 0, 0)}
              transparent={true}
              opacity={menuOptionsHover === 'menu_option_2' ? 0.1 : 0}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
          <mesh
            onClick={() => {
              setMenuActive(false);
              setMenuOptionsClick('dish_3');
            }}
            onPointerEnter={() =>
              pointerActiveMenu({
                isActive: true,
                arrowPosition: 0,
                menuOption: 'menu_option_3',
              })
            }
            onPointerLeave={() =>
              pointerActiveMenu({ isActive: false, menuOption: '' })
            }
            name='menu_option_3'
            castShadow
            receiveShadow
            geometry={nodes.menu_option_3.geometry}
            material={nodes.menu_option_3.material}
            position={[0.001, 0.004, -0.073]}
            renderOrder={1}
          >
            {' '}
            <meshBasicMaterial
              color={new THREE.Color(0, 0, 0)}
              transparent={true}
              opacity={menuOptionsHover === 'menu_option_3' ? 0.1 : 0}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
          <mesh
            onClick={() => {
              setMenuActive(false);
              setMenuOptionsClick('dish_4');
            }}
            onPointerEnter={() =>
              pointerActiveMenu({
                isActive: true,
                arrowPosition: 0.08,
                menuOption: 'menu_option_4',
              })
            }
            onPointerLeave={() =>
              pointerActiveMenu({ isActive: false, menuOption: '' })
            }
            name='menu_option_4'
            castShadow
            receiveShadow
            geometry={nodes.menu_option_4.geometry}
            material={nodes.menu_option_4.material}
            position={[0.08, 0.004, -0.073]}
            renderOrder={1}
          >
            {' '}
            <meshBasicMaterial
              color={new THREE.Color(0, 0, 0)}
              transparent={true}
              opacity={menuOptionsHover === 'menu_option_4' ? 0.1 : 0}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
          <mesh
            onClick={() => {
              setMenuActive(false);
              setMenuOptionsClick('dish_5');
            }}
            onPointerEnter={() =>
              pointerActiveMenu({
                isActive: true,
                arrowPosition: 0.155,
                menuOption: 'menu_option_5',
              })
            }
            onPointerLeave={() =>
              pointerActiveMenu({ isActive: false, menuOption: '' })
            }
            name='menu_option_5'
            castShadow
            receiveShadow
            geometry={nodes.menu_option_5.geometry}
            position={[0.159, 0.004, -0.073]}
            renderOrder={1}
          >
            {' '}
            <meshBasicMaterial
              color={new THREE.Color(0, 0, 0)}
              transparent={true}
              opacity={menuOptionsHover === 'menu_option_5' ? 0.1 : 0}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
          <mesh
            name='menu_1'
            castShadow
            receiveShadow
            geometry={nodes.menu_1.geometry}
            material={materials.menu}
          />
          <mesh
            name='menu_2'
            castShadow
            receiveShadow
            geometry={nodes.menu_2.geometry}
            material={materials['Material.005']}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/restaurant_menu.glb');
