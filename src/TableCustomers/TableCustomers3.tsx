import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations, useKTX2 } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import CustomersAnimations from '../helpers/CustomersAnimations';
import { UseAnimationsContext } from '../context/UseContexts';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    girl_eyebrows: THREE.SkinnedMesh;
    girl_lowerbody: THREE.SkinnedMesh;
    girl_upperbody: THREE.SkinnedMesh;
    man_3_eyebrows: THREE.SkinnedMesh;
    man_3_lowerbody: THREE.SkinnedMesh;
    man_3_upperbody: THREE.SkinnedMesh;
    woman_3_eyebrows: THREE.SkinnedMesh;
    woman_3_lowerbody: THREE.SkinnedMesh;
    woman_3_upperbody: THREE.SkinnedMesh;
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
  const { customersAnimationsReady } = UseAnimationsContext();

  const man3AnimCam = actions['man_3_anim_cam'];
  const woman3AnimCam = actions['woman_3_anim_cam'];
  const girlAnimCam = actions['girl_anim_cam'];
  const woman3Anim1 = actions['woman_3_anim_1'];
  const man3Anim1 = actions['man_3_anim_1'];
  const girlAnim1 = actions['girl_anim_1'];
  const man3AnimReview = actions['man_3_anim_review'];
  const woman3AnimReview = actions['woman_3_anim_review'];
  const girlAnimReview = actions['girl_anim_review'];

  const [
    man_3_lowerbody,
    man_3_upperbody,
    woman_3_lowerbody,
    woman_3_upperbody,
    girl_lowerbody,
    girl_upperbody,
    eyebrow_eyelash,
  ] = [
    useKTX2('/textures/bodies/man_3_lowerbody.ktx2'),
    useKTX2('/textures/bodies/man_3_upperbody.ktx2'),
    useKTX2('/textures/bodies/woman_3_lowerbody.ktx2'),
    useKTX2('/textures/bodies/woman_3_upperbody.ktx2'),
    useKTX2('/textures/bodies/girl_lowerbody.ktx2'),
    useKTX2('/textures/bodies/girl_upperbody.ktx2'),
    TextureAssetsLoader('/textures/bodies/eyebrow_eyelash.webp'),
  ];

  return (
    <group ref={group} {...props} dispose={null}>
      <CustomersAnimations
        actions={actions}
        customerAnimationsReady={customersAnimationsReady}
        review_actions={[
          {
            action: {
              customer_cam: man3AnimCam,
              customer_review: man3AnimReview,
              customer_init: man3Anim1,
            },

            customer_id: 'man_table_3',
          },

          {
            action: {
              customer_cam: woman3AnimCam,
              customer_review: woman3AnimReview,
              customer_init: woman3Anim1,
            },
            customer_id: 'woman_table_3',
          },
          {
            action: {
              customer_cam: girlAnimCam,
              customer_review: girlAnimReview,
              customer_init: girlAnim1,
            },
            customer_id: 'girl_table_3',
          },
        ]}
        table_id='check_table_3'
      />
      <group name='Scene'>
        <group name='rig_girl' position={[-8.441, 0, 0]}>
          <skinnedMesh
            name='girl_eyebrows'
            geometry={nodes.girl_eyebrows.geometry}
            material={nodes.girl_eyebrows.material}
            skeleton={nodes.girl_eyebrows.skeleton}
            morphTargetDictionary={nodes.girl_eyebrows.morphTargetDictionary}
            morphTargetInfluences={nodes.girl_eyebrows.morphTargetInfluences}
          >
            <meshStandardMaterial
              alphaMap={eyebrow_eyelash}
              transparent
              color={'black'}
            />
          </skinnedMesh>
          <skinnedMesh
            castShadow
            
            name='girl_lowerbody'
            geometry={nodes.girl_lowerbody.geometry}
            material={nodes.girl_lowerbody.material}
            skeleton={nodes.girl_lowerbody.skeleton}
            morphTargetDictionary={nodes.girl_lowerbody.morphTargetDictionary}
            morphTargetInfluences={nodes.girl_lowerbody.morphTargetInfluences}
          >
            <meshStandardMaterial
              map={girl_lowerbody}
              lightMap={girl_lowerbody}
              lightMapIntensity={1}
            />
          </skinnedMesh>
          <skinnedMesh
            name='girl_upperbody'
            geometry={nodes.girl_upperbody.geometry}
            material={nodes.girl_upperbody.material}
            skeleton={nodes.girl_upperbody.skeleton}
          >
            <meshStandardMaterial
              map={girl_upperbody}
              lightMap={girl_upperbody}
              lightMapIntensity={1}
            />
          </skinnedMesh>
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
            name='man_3_eyebrows'
            geometry={nodes.man_3_eyebrows.geometry}
            material={nodes.man_3_eyebrows.material}
            skeleton={nodes.man_3_eyebrows.skeleton}
            morphTargetDictionary={nodes.man_3_eyebrows.morphTargetDictionary}
            morphTargetInfluences={nodes.man_3_eyebrows.morphTargetInfluences}
          >
            <meshStandardMaterial
              alphaMap={eyebrow_eyelash}
              transparent
              color={'#614c0f'}
            />
          </skinnedMesh>
          <skinnedMesh
            castShadow
            name='man_3_lowerbody'
            geometry={nodes.man_3_lowerbody.geometry}
            material={nodes.man_3_lowerbody.material}
            skeleton={nodes.man_3_lowerbody.skeleton}
            morphTargetDictionary={nodes.man_3_lowerbody.morphTargetDictionary}
            morphTargetInfluences={nodes.man_3_lowerbody.morphTargetInfluences}
          >
            <meshStandardMaterial
              map={man_3_lowerbody}
              lightMap={man_3_lowerbody}
              lightMapIntensity={0}
            />
          </skinnedMesh>
          <skinnedMesh
            name='man_3_upperbody'
            geometry={nodes.man_3_upperbody.geometry}
            material={nodes.man_3_upperbody.material}
            skeleton={nodes.man_3_upperbody.skeleton}
          >
            <meshStandardMaterial
              map={man_3_upperbody}
              lightMap={man_3_upperbody}
              lightMapIntensity={1}
            />
          </skinnedMesh>
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
            name='woman_3_eyebrows'
            geometry={nodes.woman_3_eyebrows.geometry}
            material={nodes.woman_3_eyebrows.material}
            skeleton={nodes.woman_3_eyebrows.skeleton}
            morphTargetDictionary={nodes.woman_3_eyebrows.morphTargetDictionary}
            morphTargetInfluences={nodes.woman_3_eyebrows.morphTargetInfluences}
          >
            <meshStandardMaterial
              alphaMap={eyebrow_eyelash}
              transparent
              color={'black'}
            />
          </skinnedMesh>
          <skinnedMesh
            castShadow
            name='woman_3_lowerbody'
            geometry={nodes.woman_3_lowerbody.geometry}
            material={nodes.woman_3_lowerbody.material}
            skeleton={nodes.woman_3_lowerbody.skeleton}
            morphTargetDictionary={
              nodes.woman_3_lowerbody.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.woman_3_lowerbody.morphTargetInfluences
            }
          >
            <meshStandardMaterial
              map={woman_3_lowerbody}
              lightMap={woman_3_lowerbody}
              lightMapIntensity={1}
            />
          </skinnedMesh>
          <skinnedMesh
            name='woman_3_upperbody'
            geometry={nodes.woman_3_upperbody.geometry}
            material={nodes.woman_3_upperbody.material}
            skeleton={nodes.woman_3_upperbody.skeleton}
          >
            <meshStandardMaterial
              map={woman_3_upperbody}
              lightMap={woman_3_upperbody}
              lightMapIntensity={1}
            />
          </skinnedMesh>
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
