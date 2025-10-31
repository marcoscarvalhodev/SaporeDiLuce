import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { UseFoodContext } from '../context/UseContexts';

type GLTFResult = GLTF & {
  nodes: {
    notepad_pen_dishes: THREE.SkinnedMesh;
    bone_notepad: THREE.Bone;
    bone_pen: THREE.Bone;
    bone_gnocchi: THREE.Bone;
    bone_paccheri: THREE.Bone;
    bone_pasta_gricia: THREE.Bone;
    bone_pasta_scarpariello: THREE.Bone;
    bone_pollo: THREE.Bone;
    bone_empty_plate: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function NotepadPenDishes(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    '/notepad_pen_dishes.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const { foodOrdered } = UseFoodContext();
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
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group
          name='notepad_pen_dishes_bone'
          position={[-1.169, 1.203, -8.636]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <skinnedMesh
            frustumCulled={false}
            name='notepad_pen_dishes'
            geometry={nodes.notepad_pen_dishes.geometry}
            material={nodes.notepad_pen_dishes.material}
            skeleton={nodes.notepad_pen_dishes.skeleton}
          />
          <primitive object={nodes.bone_notepad} />
          <primitive object={nodes.bone_pen} />
          <primitive object={nodes.bone_gnocchi} />
          <primitive object={nodes.bone_paccheri} />
          <primitive object={nodes.bone_pasta_gricia} />
          <primitive object={nodes.bone_pasta_scarpariello} />
          <primitive object={nodes.bone_pollo} />
          <primitive object={nodes.bone_empty_plate} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/notepad_pen_dishes.glb');
