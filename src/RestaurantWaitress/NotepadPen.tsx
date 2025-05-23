import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import { UseFoodContext } from '../context/UseContexts';

type GLTFResult = GLTF & {
  nodes: {
    notepad: THREE.Mesh;
    pen: THREE.Mesh;
    Bone: THREE.Bone;
    Bone_1: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function NotepadPen(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF('/notepad_pen.glb') as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const { foodOrdered } = UseFoodContext();
  const [notepad_anim, pen_anim] = [
    actions['notepad_anim'],
    actions['pen_anim'],
  ];
  React.useEffect(() => {
    if (notepad_anim && pen_anim) {
      if (foodOrdered) {
        notepad_anim.play();
        pen_anim.play();
        notepad_anim.paused = false;
        pen_anim.paused = false;
      } else {
        notepad_anim.reset();
        pen_anim.reset();
        notepad_anim.stop();
        pen_anim.stop();
        notepad_anim.paused = true;
        pen_anim.paused = true;
      }
    }
  }, [foodOrdered, notepad_anim, pen_anim]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group
          name='notepad_bone'
          position={[-1.169, 1.203, -8.636]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <primitive object={nodes.Bone} />
        </group>
        <group
          name='pen_bone'
          position={[-1.207, 1.209, -8.553]}
          rotation={[0, 0.337, -1.559]}
        >
          <primitive object={nodes.Bone_1} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/notepad_pen.glb');
