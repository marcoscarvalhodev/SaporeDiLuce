import {
  UseAnimationsContext,
  UseButtonsContext,
} from '../context/UseContexts';

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    waiter: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function RestaurantWaiter(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF('/restaurant_waiter.glb') as GLTFResult;
  const { mixer, actions } = useAnimations(animations, group);

  const { setFinishedWaiterAnim } = UseAnimationsContext();

  const { foodOrdered, setFoodOrdered, setFoodOnTable } = UseButtonsContext();

  React.useEffect(() => {
    const waiterAnim1 = actions['waiter_anim_1'];
    const waiterAnim2 = actions['waiter_anim_2'];

    if (foodOrdered) {
      if (waiterAnim2) {
        // Stop the first animation if it's playing
        if (waiterAnim1 && waiterAnim1.isRunning()) {
          waiterAnim1.fadeOut(1); // Stop the first animation
        }

        waiterAnim2.reset();
        waiterAnim2.clampWhenFinished = true;
        waiterAnim2.timeScale = 1;
        waiterAnim2.fadeIn(1);
        waiterAnim2.setLoop(THREE.LoopOnce, 1);
        waiterAnim2.play();

        mixer.addEventListener('finished', (e) => {
          if (e.action === waiterAnim2) {
            setFinishedWaiterAnim(true);
            setFoodOrdered(false);
            setFoodOnTable(true);
            waiterAnim2.reset();
          }
        });
      }
    } else {
      if (waiterAnim1) {
        if (waiterAnim2 && waiterAnim2.isRunning()) {
          waiterAnim2.reset();
          waiterAnim2.stop();
        }

        waiterAnim1.reset();
        waiterAnim1.play();
      }
    }
  }, [
    animations,
    mixer,
    foodOrdered,
    setFinishedWaiterAnim,
    actions,
    setFoodOrdered,
    setFoodOnTable,
  ]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          name='waiter'
          castShadow
          receiveShadow
          geometry={nodes.waiter.geometry}
          material={nodes.waiter.material}
          position={[-2.057, 1.084, -6.992]}
          scale={[0.149, 1.072, 0.149]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant_waiter.glb');

export default RestaurantWaiter;
