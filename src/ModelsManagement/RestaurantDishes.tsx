import * as THREE from 'three';
import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import {
  UseAnimationsContext,
  UseButtonsContext,
} from '../context/UseContexts';

import gsap from 'gsap';

type GLTFResult = GLTF & {
  nodes: {
    food_1: THREE.Mesh;
    plate_1: THREE.Mesh;
    food_2: THREE.Mesh;
    plate_2: THREE.Mesh;
    food_3: THREE.Mesh;
    plate_3: THREE.Mesh;
    food_5: THREE.Mesh;
    plate_5: THREE.Mesh;
    food_4: THREE.Mesh;
    plate_4: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function RestaurantDishes(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/restaurant_plates.glb') as GLTFResult;

  const { menuOptionsClick } = UseButtonsContext();
  const { finishedWaiterAnim } = UseAnimationsContext();

  const dishesWrapperRef = React.useRef<null | THREE.Group>(null);

  const texture = useTexture('./textures/food_restaurant_bake.jpg');

  React.useLayoutEffect(() => {
    texture.flipY = false;
  });

  React.useEffect(() => {
    dishesWrapperRef.current?.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.map = texture;

        if (child.parent) {
          if (child.parent.name === menuOptionsClick && finishedWaiterAnim) {
           

            gsap.to(child.material, {
              opacity: 1,
              duration: 1,
              delay: 2,
              onComplete: () => {
                
              }
            })
          } else {
            child.material = new THREE.MeshStandardMaterial({
              opacity: 0,
              transparent: true,
            });
          }
        }
      }
    });
  });

  return (
    <group ref={dishesWrapperRef} {...props} dispose={null}>
      <group position={[6.539, 1.02, -4.999]} name='dish_1'>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.food_1.geometry}
          material={nodes.food_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plate_1.geometry}
          material={nodes.plate_1.material}
        />
      </group>
      <group position={[6.539, 1.02, -4.999]} name='dish_2'>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.food_2.geometry}
          material={nodes.food_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plate_2.geometry}
          material={nodes.plate_2.material}
        />
      </group>
      <group position={[6.539, 1.02, -4.999]} name='dish_3'>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.food_3.geometry}
          material={nodes.food_3.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plate_3.geometry}
          material={nodes.plate_3.material}
        />
      </group>
      <group position={[6.539, 1.02, -4.999]} name='dish_4'>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.food_5.geometry}
          material={nodes.food_5.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plate_5.geometry}
          material={nodes.plate_5.material}
        />
      </group>
      <group position={[6.539, 1.02, -4.999]} name='dish_5'>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.food_4.geometry}
          material={nodes.food_4.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plate_4.geometry}
          material={nodes.plate_4.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant_plates.glb');
