import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    girl: THREE.SkinnedMesh;
    man_3: THREE.SkinnedMesh;
    woman_3: THREE.SkinnedMesh;
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
    root_2: THREE.Bone;
    ['MCH-torsoparent_2']: THREE.Bone;
    ['MCH-hand_ikparentL_2']: THREE.Bone;
    ['MCH-upper_arm_ik_targetparentL_2']: THREE.Bone;
    ['MCH-hand_ikparentR_2']: THREE.Bone;
    ['MCH-upper_arm_ik_targetparentR_2']: THREE.Bone;
    ['MCH-foot_ikparentL_2']: THREE.Bone;
    ['MCH-thigh_ik_targetparentL_2']: THREE.Bone;
    ['MCH-foot_ikparentR_2']: THREE.Bone;
    ['MCH-thigh_ik_targetparentR_2']: THREE.Bone;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function TableCustomers3(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    'table_customers/table_customers_3.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    actions['girl_anim_1']?.play();
    actions['woman_3_anim_1']?.play();
    actions['man_3_anim_1']?.play();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='rig_girl' position={[-8.441, 0, 0]}>
          <skinnedMesh
            name='girl'
            geometry={nodes.girl.geometry}
            material={nodes.girl.material}
            skeleton={nodes.girl.skeleton}
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
        <group name='rig_man_3' position={[-10.996, 0, 0]}>
          <skinnedMesh
            name='man_3'
            geometry={nodes.man_3.geometry}
            material={nodes.man_3.material}
            skeleton={nodes.man_3.skeleton}
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
        <group name='rig_woman_3' position={[-5.976, 0, 0]}>
          <skinnedMesh
            name='woman_3'
            geometry={nodes.woman_3.geometry}
            material={nodes.woman_3.material}
            skeleton={nodes.woman_3.skeleton}
          />
          <primitive object={nodes.root_2} />
          <primitive object={nodes['MCH-torsoparent_2']} />
          <primitive object={nodes['MCH-hand_ikparentL_2']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL_2']} />
          <primitive object={nodes['MCH-hand_ikparentR_2']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR_2']} />
          <primitive object={nodes['MCH-foot_ikparentL_2']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL_2']} />
          <primitive object={nodes['MCH-foot_ikparentR_2']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR_2']} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('table_customers/table_customers_3.glb');
