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
    body_waitress001: THREE.SkinnedMesh;
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
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function Waitress(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    '/restaurant_waitress.glb'
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const counterActive = React.useRef(false);

  const { roomNameState } = UseCameraMovementContext();
  const { waitressShowTable, waitressTalkTable } = UseHumansContext();
  const [
    pos_anim,
    fake_walk_anim,
    introduction_anim,
    talk_table_anim,
    /*main_walk_anim*/
  ] = [
    actions['waitress_pos_anim'],
    actions['waitress_fake_walking_anim'],
    actions['waitress_introduction_anim'],
    actions['waitress_talk_on_table_anim'],
    actions['waitress_main_walk_anim'],
  ];

  React.useEffect(() => {
    if (waitressTalkTable) {
      if (fake_walk_anim && talk_table_anim) {
        fake_walk_anim.crossFadeTo(talk_table_anim, 0.5, true);
        talk_table_anim.reset();
        talk_table_anim.timeScale = 1;
        talk_table_anim.repetitions = 1;
        talk_table_anim.clampWhenFinished = true;
        talk_table_anim.play();
      }
    } else {
      if (talk_table_anim && pos_anim) {
        talk_table_anim.crossFadeTo(pos_anim, 0.5, true);
        pos_anim.timeScale = 1;
        pos_anim.reset();
        pos_anim.play();
      }
    }
  }, [waitressTalkTable, fake_walk_anim, talk_table_anim, pos_anim]);

  React.useEffect(() => {
    if (waitressShowTable) {
      if (introduction_anim && fake_walk_anim) {
        introduction_anim?.crossFadeTo(fake_walk_anim, 0.5, true);
        fake_walk_anim.reset();
        fake_walk_anim.timeScale = 1;
        fake_walk_anim.repetitions = 1;
        fake_walk_anim.clampWhenFinished = true;
        fake_walk_anim.play();
      }
    }
  }, [fake_walk_anim, waitressShowTable, introduction_anim, talk_table_anim]);

  React.useEffect(() => {

    if (roomNameState === 'check_counter') {
      if (pos_anim && introduction_anim) {
        pos_anim?.crossFadeTo(introduction_anim, 1, true);
        counterActive.current = true;
        introduction_anim.reset();
        introduction_anim.timeScale = 1;
        introduction_anim.repetitions = 1;
        introduction_anim.clampWhenFinished = true;
        introduction_anim.play();
      }
    } else if (roomNameState === 'dining_room_enter' && counterActive.current) {
      counterActive.current = false;

      if (introduction_anim && pos_anim) {
        introduction_anim?.crossFadeTo(pos_anim, 0.5, true);
        pos_anim.reset();
        pos_anim.timeScale = 1;
        pos_anim.play();
      }
    }
  }, [introduction_anim, pos_anim, roomNameState]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='rig_waitress' position={[-4.53, 0, 0]}>
          <skinnedMesh
            name='body_waitress001'
            geometry={nodes.body_waitress001.geometry}
            material={nodes.body_waitress001.material}
            skeleton={nodes.body_waitress001.skeleton}
            frustumCulled={false}
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
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant_waitress.glb');
