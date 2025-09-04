import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { JSX } from 'react';
import { Group } from 'three';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    chairs_decoration: THREE.SkinnedMesh;
    boy_lowerbody: THREE.SkinnedMesh;
    boy_upperbody: THREE.SkinnedMesh;
    man_2_lowerbody: THREE.SkinnedMesh;
    man_2_upperbody: THREE.SkinnedMesh;
    woman_2_lowerbody: THREE.SkinnedMesh;
    woman_2_upperbody: THREE.SkinnedMesh;
    Bone: THREE.Bone;
    neutral_bone: THREE.Bone;
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

export function TableCustomers2(props: JSX.IntrinsicElements['group']) {
  const group = useRef<Group | null>(null);
  const { nodes, animations } = useGLTF(
    '/table_customers/table_customers_2.glb'
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    console.log(actions);
  });

  const [chairs_base_map] = [
    TextureAssetsLoader(
      '/textures/chairs_decorations/chairs_decorations_base.webp'
    ),
  ];

  /*React.useEffect(() => {
    actions['boy_anim_1']?.play();
    actions['woman_2_anim_1']?.play();
    actions['man_2_anim_1']?.play();
    actions['fork_anim']?.play();
  });*/
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group
          name='fork'
          position={[3.807, 1.033, -4.702]}
          rotation={[1.486, -0.01, 0.122]}
        >
          <skinnedMesh
            name='chairs_decoration'
            geometry={nodes.chairs_decoration.geometry}
            material={nodes.chairs_decoration.material}
            skeleton={nodes.chairs_decoration.skeleton}
          >
            <meshStandardMaterial
              map={chairs_base_map}
              lightMap={chairs_base_map}
              lightMapIntensity={1}
            />
          </skinnedMesh>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
        </group>
        <group name='rig_boy' position={[-19.655, 0, 0]}>
          <skinnedMesh
            name='boy_lowerbody'
            geometry={nodes.boy_lowerbody.geometry}
            material={nodes.boy_lowerbody.material}
            skeleton={nodes.boy_lowerbody.skeleton}
          />
          <skinnedMesh
            name='boy_upperbody'
            geometry={nodes.boy_upperbody.geometry}
            material={nodes.boy_upperbody.material}
            skeleton={nodes.boy_upperbody.skeleton}
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
        <group name='rig_man_2' position={[-13.46, 0, 0]}>
          <skinnedMesh
            name='man_2_lowerbody'
            geometry={nodes.man_2_lowerbody.geometry}
            material={nodes.man_2_lowerbody.material}
            skeleton={nodes.man_2_lowerbody.skeleton}
          />
          <skinnedMesh
            name='man_2_upperbody'
            geometry={nodes.man_2_upperbody.geometry}
            material={nodes.man_2_upperbody.material}
            skeleton={nodes.man_2_upperbody.skeleton}
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
        <group name='rig_woman_2' position={[-16.575, 0, 0]}>
          <skinnedMesh
            name='woman_2_lowerbody'
            geometry={nodes.woman_2_lowerbody.geometry}
            material={nodes.woman_2_lowerbody.material}
            skeleton={nodes.woman_2_lowerbody.skeleton}
          />
          <skinnedMesh
            name='woman_2_upperbody'
            geometry={nodes.woman_2_upperbody.geometry}
            material={nodes.woman_2_upperbody.material}
            skeleton={nodes.woman_2_upperbody.skeleton}
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

useGLTF.preload('/table_customers/table_customers_2.glb');
