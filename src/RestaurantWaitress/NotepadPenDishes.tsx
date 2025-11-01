import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { UseFoodContext } from '../context/UseContexts';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';
import { AudioEffects } from '../AudioManagement/AudioEffects';
import { UseButtonsContext } from '../context/UseContexts';

import CurrentDish from './CurrentDish';

type GLTFResult = GLTF & {
  nodes: {
    notepad_pen_dishes: THREE.SkinnedMesh;
    bone_notepad: THREE.Bone;
    bone_pen: THREE.Bone;
    dish_4: THREE.Bone;
    dish_2: THREE.Bone;
    dish_3: THREE.Bone;
    dish_1: THREE.Bone;
    dish_5: THREE.Bone;
    dish_0: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function NotepadPenDishes(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const dishesRef = React.useRef<THREE.SkinnedMesh | null>(null);
  const { nodes, animations } = useGLTF(
    '/notepad_pen_dishes.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const { menuOptionsClick, showEatButton, menuActive } = UseButtonsContext();

  const { foodOrdered, emptyDish, setEmptyDish } = UseFoodContext();
  const dishesWrapperRef = React.useRef<null | THREE.Group>(null);

  const { OrderedFoodAudio } = AudioEffects();

  CurrentDish(dishesWrapperRef.current, menuOptionsClick, showEatButton);

  React.useEffect(() => {
    if (foodOrdered) {
      OrderedFoodAudio();
    }
  }, [foodOrdered, OrderedFoodAudio]);

  const base_map = TextureAssetsLoader('/textures/test_dishes/dishes_test.png');
  const originalUV = React.useRef<
    null | (THREE.BufferAttribute | THREE.InterleavedBufferAttribute)
  >(null);

  const [notepad_pen_anim] = [actions['notepad_pen_anim']];
  React.useEffect(() => {
    if (notepad_pen_anim) {
      if (foodOrdered) {
        notepad_pen_anim.play();

        notepad_pen_anim.paused = false;
      } else {
        notepad_pen_anim.reset();

        notepad_pen_anim.stop();

        notepad_pen_anim.paused = true;
      }
    }
  }, [foodOrdered, notepad_pen_anim]);

  React.useEffect(() => {
    if (menuActive) {
      setEmptyDish(false);
    }
  }, [menuActive, setEmptyDish]);

  React.useEffect(() => {
    if (emptyDish) {
      setTimeout(() => {
        const scaleDish0 = nodes.dish_0.scale;
        if (scaleDish0.z === 1 && scaleDish0.y === 1 && scaleDish0.x === 1) {
          const geometry = dishesRef.current?.geometry;

          if (geometry) {
            if (!originalUV.current && geometry.attributes.uv) {
              originalUV.current = geometry.attributes.uv;
            }

            const uvWrapper = {
              dish_0: originalUV.current,
              dish_1: geometry.attributes.uv1,
              dish_2: geometry.attributes.uv2,
              dish_3: geometry.attributes.uv3,
              dish_4: geometry.attributes.texcoord_4,
              dish_5: geometry.attributes.texcoord_5,
            };

            const selectedUV = uvWrapper[menuOptionsClick];

            if (selectedUV && menuOptionsClick)
              geometry.setAttribute('uv', selectedUV);
            geometry.attributes.uv.needsUpdate = true;
          }
        }
      }, 1000);
    }
  }, [emptyDish, nodes.dish_0.scale, menuOptionsClick]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group
          ref={dishesWrapperRef}
          name='notepad_pen_dishes_bone'
          position={[-1.169, 1.203, -8.636]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <skinnedMesh
            ref={dishesRef}
            name='notepad_pen_dishes'
            geometry={nodes.notepad_pen_dishes.geometry}
            material={nodes.notepad_pen_dishes.material}
            skeleton={nodes.notepad_pen_dishes.skeleton}
          >
            <meshStandardMaterial map={base_map} />
          </skinnedMesh>
          <primitive object={nodes.bone_notepad} />
          <primitive object={nodes.bone_pen} />
          <primitive object={nodes.dish_4} />
          <primitive object={nodes.dish_2} />
          <primitive object={nodes.dish_3} />
          <primitive object={nodes.dish_1} />
          <primitive object={nodes.dish_5} />
          <primitive object={nodes.dish_0} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/notepad_pen_dishes.glb');
