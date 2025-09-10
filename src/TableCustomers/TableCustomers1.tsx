import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import CustomersAnimations from '../helpers/CustomersAnimations';
import { UseAnimationsContext } from '../context/UseContexts';

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
  const {customersAnimationsReady} = UseAnimationsContext();

  const man1AnimCam = actions['man_1_anim_cam'];
  const woman1AnimCam = actions['woman_1_anim_cam'];
  const woman1Anim1 = actions['woman_1_anim_1'];
  const man1Anim1 = actions['man_1_anim_1'];
  const man1AnimReview = actions['man_1_anim_review'];
  const woman1AnimReview = actions['woman_1_anim_review'];


  return (
    <group ref={group} {...props} dispose={null}>
      <CustomersAnimations
      customerAnimationsReady={customersAnimationsReady}
        review_actions={[
          {
            action: {
              customer_cam: man1AnimCam,
              customer_review: man1AnimReview,
              customer_init: man1Anim1,
            },

            customer_id: 'man_table_1',
          },

          {
            action: {
              customer_cam: woman1AnimCam,
              customer_review: woman1AnimReview,
              customer_init: woman1Anim1,
            },
            customer_id: 'woman_table_1',
          },

        ]}
        table_id='check_table_1'
      />
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
