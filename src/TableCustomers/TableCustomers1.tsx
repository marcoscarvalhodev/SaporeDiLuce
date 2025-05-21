import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import {
  UseCameraMovementContext,
  UseHumansContext,
} from '../context/UseContexts';

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

interface reviewAnimProps {
  customerCam: THREE.AnimationAction | null;
  customerReview: THREE.AnimationAction | null;
}

export function TableCustomers1(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    '/table_customers/table_customers_1.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const { customerReview } = UseHumansContext();

  const { roomNameState } = UseCameraMovementContext();

  const man1AnimCam = actions['man_1_anim_cam'];
  const woman1AnimCam = actions['woman_1_anim_cam'];
  const woman1Anim1 = actions['woman_1_anim_1'];
  const man1Anim1 = actions['man_1_anim_1'];
  const man1AnimReview = actions['man_1_anim_review'];
  const woman1AnimReview = actions['woman_1_anim_review'];

  const ReviewAnimStart = ({
    customerCam,
    customerReview,
  }: reviewAnimProps) => {
    if (customerCam && customerReview) {
      customerCam?.crossFadeTo(customerReview, 0.3, true);
      customerReview.reset();
      customerReview.timeScale = 1;
      customerReview.repetitions = 1;
      customerReview.clampWhenFinished = true;
      customerReview.play();
    }
  };

  React.useEffect(() => {
    if (man1AnimReview && woman1AnimReview && man1Anim1 && woman1Anim1) {
      if (customerReview === 'man_table_1') {
        ReviewAnimStart({
          customerCam: man1AnimCam,
          customerReview: man1AnimReview,
        });
      } else if (customerReview === 'woman_table_1') {
        ReviewAnimStart({
          customerCam: woman1AnimCam,
          customerReview: woman1AnimReview,
        });
      } else {
        man1AnimReview.crossFadeTo(man1Anim1, 1, true);
        woman1AnimReview.crossFadeTo(woman1Anim1, 1, true);
      }
    }
  }, [
    customerReview,
    man1AnimReview,
    man1AnimCam,
    man1Anim1,
    woman1AnimReview,
    woman1AnimCam,
    woman1Anim1,
  ]);

  React.useEffect(() => {
    function initialAnim() {
      if (woman1Anim1 && man1Anim1) {
        woman1Anim1.stop();
        man1Anim1.stop();
        woman1Anim1.timeScale = 1;
        man1Anim1.timeScale = 1;
        woman1Anim1.play();
        man1Anim1.play();
      }
    }

    initialAnim();
  }, [man1Anim1, woman1Anim1]);

  React.useEffect(() => {
    if (roomNameState === 'check_table_1') {
      if (woman1AnimCam && man1AnimCam && man1Anim1 && woman1Anim1) {
        woman1AnimCam.reset();
        man1AnimCam.reset();

        woman1AnimCam.clampWhenFinished = true;
        man1AnimCam.clampWhenFinished = true;

        woman1AnimCam.repetitions = 1;
        man1AnimCam.repetitions = 1;

        woman1AnimCam.timeScale = 1;
        man1AnimCam.timeScale = 1;

        woman1AnimCam.play();
        man1AnimCam.play();

        woman1Anim1.crossFadeTo(woman1AnimCam, 1, true);
        man1Anim1.crossFadeTo(man1AnimCam, 1, true);
      }
    } else if (roomNameState === 'dining_room_enter') {
      if (woman1AnimCam && man1AnimCam && man1Anim1 && woman1Anim1) {
        woman1Anim1.reset();
        man1Anim1.reset();

        woman1Anim1.clampWhenFinished = false;
        man1Anim1.clampWhenFinished = false;

        man1Anim1.timeScale = 1;
        woman1Anim1.timeScale = 1;

        woman1Anim1.play();
        man1Anim1.play();

        woman1AnimCam.crossFadeTo(woman1Anim1, 1, false);
        man1AnimCam.crossFadeTo(man1Anim1, 1, false);
      }
    }
  }, [
    actions,
    roomNameState,
    man1Anim1,
    woman1Anim1,
    man1AnimCam,
    woman1AnimCam,
  ]);

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
