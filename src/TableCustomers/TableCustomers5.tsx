import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import CustomersAnimations from '../helpers/CustomersAnimations';
import { UseAnimationsContext } from '../context/UseContexts';
type GLTFResult = GLTF & {
  nodes: {
    man_5_eyebrows: THREE.SkinnedMesh;
    man_5_lowerbody: THREE.SkinnedMesh;
    man_5_upperbody: THREE.SkinnedMesh;
    woman_5_eyebroews: THREE.SkinnedMesh;
    woman_5_lowerbody: THREE.SkinnedMesh;
    woman_5_upperbody: THREE.SkinnedMesh;
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
    neutral_bone: THREE.Bone;
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

export function TableCustomers5(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    '/table_customers/table_customers_5.glb'
  ) as GLTFResult;

  const { customersAnimationsReady } = UseAnimationsContext();

  const { actions } = useAnimations(animations, group);

  const man5AnimCam = actions['man_5_anim_cam'];
  const woman5AnimCam = actions['woman_5_anim_cam'];
  const woman5Anim1 = actions['woman_5_anim_1'];
  const man5Anim1 = actions['man_5_anim_1'];
  const man5AnimReview = actions['man_5_anim_review'];
  const woman5AnimReview = actions['woman_5_anim_review'];

  return (
    <group ref={group} {...props} dispose={null}>
      <CustomersAnimations
        actions={actions}
        customerAnimationsReady={customersAnimationsReady}
        review_actions={[
          {
            action: {
              customer_cam: man5AnimCam,
              customer_review: man5AnimReview,
              customer_init: man5Anim1,
            },

            customer_id: 'man_table_5',
          },

          {
            action: {
              customer_cam: woman5AnimCam,
              customer_review: woman5AnimReview,
              customer_init: woman5Anim1,
            },
            customer_id: 'woman_table_5',
          },
        ]}
        table_id='check_table_5'
      />

      <group name='Scene'>
        <group name='rig_man_5' position={[3.21, 0, 0]}>
          <skinnedMesh
            name='man_5_eyebrows'
            geometry={nodes.man_5_eyebrows.geometry}
            material={nodes.man_5_eyebrows.material}
            skeleton={nodes.man_5_eyebrows.skeleton}
            morphTargetDictionary={nodes.man_5_eyebrows.morphTargetDictionary}
            morphTargetInfluences={nodes.man_5_eyebrows.morphTargetInfluences}
          />
          <skinnedMesh
            name='man_5_lowerbody'
            geometry={nodes.man_5_lowerbody.geometry}
            material={nodes.man_5_lowerbody.material}
            skeleton={nodes.man_5_lowerbody.skeleton}
            morphTargetDictionary={nodes.man_5_lowerbody.morphTargetDictionary}
            morphTargetInfluences={nodes.man_5_lowerbody.morphTargetInfluences}
          />
          <skinnedMesh
            name='man_5_upperbody'
            geometry={nodes.man_5_upperbody.geometry}
            material={nodes.man_5_upperbody.material}
            skeleton={nodes.man_5_upperbody.skeleton}
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
          <primitive object={nodes.neutral_bone} />
        </group>
        <group name='rig_woman_5'>
          <skinnedMesh
            name='woman_5_eyebroews'
            geometry={nodes.woman_5_eyebroews.geometry}
            material={nodes.woman_5_eyebroews.material}
            skeleton={nodes.woman_5_eyebroews.skeleton}
            morphTargetDictionary={
              nodes.woman_5_eyebroews.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.woman_5_eyebroews.morphTargetInfluences
            }
          />
          <skinnedMesh
            name='woman_5_lowerbody'
            geometry={nodes.woman_5_lowerbody.geometry}
            material={nodes.woman_5_lowerbody.material}
            skeleton={nodes.woman_5_lowerbody.skeleton}
            morphTargetDictionary={
              nodes.woman_5_lowerbody.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.woman_5_lowerbody.morphTargetInfluences
            }
          />
          <skinnedMesh
            name='woman_5_upperbody'
            geometry={nodes.woman_5_upperbody.geometry}
            material={nodes.woman_5_upperbody.material}
            skeleton={nodes.woman_5_upperbody.skeleton}
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

useGLTF.preload('/table_customers/table_customers_5.glb');
