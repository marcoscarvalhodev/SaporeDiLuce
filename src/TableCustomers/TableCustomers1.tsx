import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
type GLTFResult = GLTF & {
  nodes: {
    body_woman_1: THREE.SkinnedMesh;
    body_man_1: THREE.SkinnedMesh;
    root: THREE.Bone;
    ['MCH-torsoparent']: THREE.Bone;
    ['MCH-hand_ikparentL']: THREE.Bone;
    ['MCH-upper_arm_ik_targetparentL']: THREE.Bone;
    ['MCH-hand_ikparentR']: THREE.Bone;
    ['MCH-upper_arm_ik_targetparentR']: THREE.Bone;
    ['MCH-foot_ikparentL']: THREE.Bone;
    ['MCH-thigh_ik_targetparentL']: THREE.Bone;
    ['MCH-foot_ikparentR']: THREE.Bone;
    ['MCH-thigh_ik_targetparentR']: THREE.Bone;
    root_1: THREE.Bone;
    ['MCH-torsoparent_1']: THREE.Bone;
    ['MCH-hand_ikparentL_1']: THREE.Bone;
    ['MCH-upper_arm_ik_targetparentL_1']: THREE.Bone;
    ['MCH-hand_ikparentR_1']: THREE.Bone;
    ['MCH-upper_arm_ik_targetparentR_1']: THREE.Bone;
    ['MCH-foot_ikparentL_1']: THREE.Bone;
    ['MCH-thigh_ik_targetparentL_1']: THREE.Bone;
    ['MCH-foot_ikparentR_1']: THREE.Bone;
    ['MCH-thigh_ik_targetparentR_1']: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function TableCustomers1(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    '/table_customers/table_customers_1.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    const woman1Anim1 = actions['woman_1_anim_1'];
    const woman1AnimCam = actions['woman_1_anim_cam'];
    const man1Anim1 = actions['man_1_anim_1'];
    const man1AnimCam = actions['man_1_anim_cam'];

    if (woman1Anim1 && man1Anim1) {
      woman1Anim1.reset().play();
      man1Anim1.reset().play();
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'o') {
        if (woman1AnimCam && man1AnimCam && man1Anim1 && woman1Anim1) {
          woman1AnimCam.reset();
          man1AnimCam.reset();

          // Play once and clamp at end
          woman1AnimCam.clampWhenFinished = true;
          man1AnimCam.clampWhenFinished = true;
          woman1AnimCam.setLoop(THREE.LoopOnce, 1);
          man1AnimCam.setLoop(THREE.LoopOnce, 1);

          // Set normal playback
          woman1AnimCam.timeScale = 1;
          man1AnimCam.timeScale = 1;

          woman1AnimCam.play();
          man1AnimCam.play();

          woman1Anim1.crossFadeTo(woman1AnimCam, 1, true);
          man1Anim1.crossFadeTo(man1AnimCam, 1, true);
        }
      } else if (event.key === 'p') {
        if (woman1AnimCam && man1AnimCam && man1Anim1 && woman1Anim1) {
          woman1AnimCam.timeScale = -1;
          man1AnimCam.timeScale = -1;

          // Allow full playback (not clamped) for reversing
          woman1AnimCam.clampWhenFinished = false;
          man1AnimCam.clampWhenFinished = false;
         
          woman1AnimCam.crossFadeTo(woman1Anim1, 1, true);
          man1AnimCam.crossFadeTo(man1Anim1, 1, true);

          woman1AnimCam.play();
          man1AnimCam.play();
        }
      }
    });
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='rig_woman_1'>
          <skinnedMesh
            name='body_woman_1'
            geometry={nodes.body_woman_1.geometry}
            material={nodes.body_woman_1.material}
            skeleton={nodes.body_woman_1.skeleton}
          />
          <primitive object={nodes.root} />
          <primitive object={nodes['MCH-torsoparent']} />
          <primitive object={nodes['MCH-hand_ikparentL']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
          <primitive object={nodes['MCH-hand_ikparentR']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
          <primitive object={nodes['MCH-foot_ikparentL']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
          <primitive object={nodes['MCH-foot_ikparentR']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
        </group>
        <group name='rig_man_1'>
          <skinnedMesh
            name='body_man_1'
            geometry={nodes.body_man_1.geometry}
            material={nodes.body_man_1.material}
            skeleton={nodes.body_man_1.skeleton}
          />
          <primitive object={nodes.root_1} />
          <primitive object={nodes['MCH-torsoparent_1']} />
          <primitive object={nodes['MCH-hand_ikparentL_1']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL_1']} />
          <primitive object={nodes['MCH-hand_ikparentR_1']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR_1']} />
          <primitive object={nodes['MCH-foot_ikparentL_1']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL_1']} />
          <primitive object={nodes['MCH-foot_ikparentR_1']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR_1']} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/table_customers/table_customers_1.glb');
