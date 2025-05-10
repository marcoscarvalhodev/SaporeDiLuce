import * as THREE from 'three';
import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { UseButtonsContext } from '../context/UseContexts';

import gsap from 'gsap';
import { AudioEffects } from '../AudioManagement/AudioEffects';

type GLTFResult = GLTF & {
  nodes: {
    pasta_scarpariello: THREE.Mesh;
    gnocchi: THREE.Mesh;
    pasta_gricia: THREE.Mesh;
    paccheri: THREE.Mesh;
    pollo: THREE.Mesh;
    empty_plate: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function RestaurantDishes(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/restaurant_dishes.glb') as GLTFResult;

  const {
    menuOptionsClick,
    foodOnTable,
    setFoodOnTable,
    showEatButton,
    foodOrdered,
  } = UseButtonsContext();
  const dishesWrapperRef = React.useRef<null | THREE.Group>(null);

  const emptyPlateRef = React.useRef(false);

  const [currentDish, setCurrentDish] = React.useState('');

  const texture = useTexture('./textures/food_restaurant_bake.jpg');
  const { OrderedFoodAudio } = AudioEffects();

  React.useEffect(() => {
    if (foodOrdered) {
      OrderedFoodAudio();
    }
  }, [foodOrdered, OrderedFoodAudio]);

  React.useLayoutEffect(() => {
    texture.flipY = false;
  });

  React.useEffect(() => {
    if (foodOnTable) {
      setCurrentDish(menuOptionsClick);
      setFoodOnTable(false);
    }
  }, [foodOnTable, menuOptionsClick, setFoodOnTable]);

  const showEmptyPlate = React.useCallback(
    (child: THREE.Mesh) => {
      if (showEatButton) {
        child.material = new THREE.MeshStandardMaterial({
          opacity: 0,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
      } else {
        child.material = new THREE.MeshStandardMaterial({
          opacity: 1,
          transparent: false,
          depthTest: true,
          depthWrite: true,
        });
      }
    },
    [showEatButton]
  );

  React.useEffect(() => {
    dishesWrapperRef.current?.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        if (child.name === currentDish && showEatButton) {
          emptyPlateRef.current = true;
          gsap.to(child.material, {
            opacity: 1,
            duration: 1,
            depthTest: true,
            depthWrite: true,
            delay: 2,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            opacity: 0,
            transparent: true,
            depthTest: false,
            depthWrite: false,
          });
        }

        if (child.name === 'empty_plate' && emptyPlateRef.current) {
          showEmptyPlate(child);
        }
      }
    });
  }, [menuOptionsClick, texture, currentDish, showEatButton, showEmptyPlate]);

  return (
    <group {...props} dispose={null} ref={dishesWrapperRef}>
      <mesh
        name='dish_1'
        castShadow
        receiveShadow
        geometry={nodes.pasta_scarpariello.geometry}
        material={nodes.pasta_scarpariello.material}
        position={[6.549, 1.018, -4.967]}
        scale={0.397}
        renderOrder={1}
      />

      <mesh
        name='dish_2'
        castShadow
        receiveShadow
        geometry={nodes.paccheri.geometry}
        material={nodes.paccheri.material}
        position={[6.549, 1.028, -4.967]}
        rotation={[-0.101, 0.251, 0.035]}
        scale={0.397}
        renderOrder={1}
      />
      <mesh
        name='dish_3'
        castShadow
        receiveShadow
        geometry={nodes.pasta_gricia.geometry}
        material={nodes.pasta_gricia.material}
        position={[6.549, 1.018, -4.967]}
        rotation={[1.237, 0.405, -1.4]}
        scale={0.397}
        renderOrder={1}
      />
      <mesh
        name='dish_4'
        castShadow
        receiveShadow
        geometry={nodes.gnocchi.geometry}
        material={nodes.gnocchi.material}
        position={[6.549, 1.014, -4.967]}
        rotation={[1.506, -0.044, -2.413]}
        scale={0.397}
        renderOrder={1}
      />

      <mesh
        name='dish_5'
        castShadow
        receiveShadow
        geometry={nodes.pollo.geometry}
        material={nodes.pollo.material}
        position={[6.549, 1.014, -4.967]}
        scale={0.397}
        renderOrder={1}
      />
      <mesh
        name='empty_plate'
        castShadow
        receiveShadow
        geometry={nodes.empty_plate.geometry}
        material={nodes.empty_plate.material}
        position={[6.549, 1.014, -4.967]}
        scale={0.397}
        renderOrder={1}
      />
    </group>
  );
}

useGLTF.preload('/restaurant_dishes.glb');
