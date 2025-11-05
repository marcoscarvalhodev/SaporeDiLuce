import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { JSX } from 'react';
import {
  UseCameraMovementContext,
  UseFoodContext,
  UseHumansContext,
} from '../context/UseContexts';
import { useFrame } from '@react-three/fiber';
import TextureAssetsLoader from '../helpers/TextureAssetsLoader';

type GLTFResult = GLTF & {
  nodes: {
    waitress_eyebrows: THREE.SkinnedMesh;
    waitress_lowerbody: THREE.SkinnedMesh;
    waitress_upperbody: THREE.SkinnedMesh;
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
  ) as unknown as GLTFResult;
  const { actions, mixer } = useAnimations(animations, group);

  const [waitress_lowerbody, waitress_upperbody, waitress_eyebrows] = [
    TextureAssetsLoader('/textures/bodies/waitress_lowerbody.webp'),
    TextureAssetsLoader('/textures/bodies/waitress_upperbody.webp'),
    TextureAssetsLoader('/textures/bodies/eyebrow_eyelash.webp'),
  ];
  const counterActive = React.useRef(false);

  const { roomNameState } = UseCameraMovementContext();
  const {
    waitressShowTable,
    waitressTalkTable,
    setFinishedWaitressAnim,
    waitressReset,
    setWaitressDialogueCurrent,
  } = UseHumansContext();
  const { foodOrdered } = UseFoodContext();

  const walkAnimEnabled = React.useRef(false);
  const reverseIntroductionAnim = React.useRef(false);
  const dialogueIntroduction = React.useRef(false);
  const dialogueFakeWalk = React.useRef(false);
  const dialogueTalkTable = React.useRef(false);
  const dialogueTalkTableServe = React.useRef(false);
  const [
    pos_anim,
    fake_walk_anim,
    introduction_anim,
    introduction_backwards_anim,
    talk_table_anim,
    main_walk_anim,
  ] = [
    actions['waitress_pos_anim'],
    actions['waitress_fake_walk_anim'],
    actions['waitress_introduction_anim'],
    actions['waitress_introduction_backwards_anim'],
    actions['waitress_talk_on_table_anim'],
    actions['waitress_main_walk_anim'],
  ];

  useFrame(() => {
    if (main_walk_anim && main_walk_anim.time > 18 && walkAnimEnabled.current) {
      setFinishedWaitressAnim(true);
      walkAnimEnabled.current = false;
    }

    if (
      introduction_anim &&
      introduction_anim.time > 5 &&
      dialogueIntroduction.current
    ) {
      setWaitressDialogueCurrent('introduction_talk');
      dialogueIntroduction.current = false;
    }

    if (fake_walk_anim && fake_walk_anim.time > 1 && dialogueFakeWalk.current) {
      setWaitressDialogueCurrent('fake_walk_talk');

      dialogueFakeWalk.current = false;

      setTimeout(() => {
        setWaitressDialogueCurrent('');
      }, 2500);
    }

    if (
      talk_table_anim &&
      talk_table_anim.time > 1 &&
      dialogueTalkTable.current
    ) {
      setWaitressDialogueCurrent('table_talk');
      dialogueTalkTable.current = false;
    }

    if (
      main_walk_anim &&
      main_walk_anim.time > 13 &&
      dialogueTalkTableServe.current
    ) {
      setWaitressDialogueCurrent('table_talk_serve');
      dialogueTalkTableServe.current = false;
    }
  });

  React.useEffect(() => {
    actions['blink_eyes']?.play();
  }, [actions]);

  React.useEffect(() => {
    mixer.addEventListener('finished', ({ action }) => {
      if (action === talk_table_anim || action === main_walk_anim) {
        setWaitressDialogueCurrent('');
      }
    });
  }, [mixer, talk_table_anim, setWaitressDialogueCurrent, main_walk_anim]);

  React.useEffect(() => {
    mixer.addEventListener(
      'finished',
      ({ action }: { action: THREE.AnimationAction }) => {
        if (
          action === introduction_backwards_anim &&
          pos_anim &&
          introduction_backwards_anim
        ) {
          introduction_backwards_anim.crossFadeTo(pos_anim, 0.5, true);
          pos_anim.reset();
          pos_anim.timeScale = 1;
          pos_anim.play();
        }
      }
    );
  }, [mixer, pos_anim, introduction_backwards_anim]);

  React.useEffect(() => {
    if (
      roomNameState !== 'dining_room_enter' &&
      roomNameState !== 'check_counter'
    ) {
      reverseIntroductionAnim.current = false;
    }
  }, [roomNameState]);

  React.useEffect(() => {
    if (
      roomNameState === 'dining_room_enter' &&
      reverseIntroductionAnim.current
    ) {
      if (introduction_anim && introduction_backwards_anim) {
        introduction_anim.crossFadeTo(introduction_backwards_anim, 0.5, true);
        introduction_backwards_anim.reset();
        introduction_backwards_anim.timeScale = 1;
        introduction_backwards_anim.repetitions = 1;
        introduction_backwards_anim.clampWhenFinished = true;
        introduction_backwards_anim.play();
      }
    }
  }, [roomNameState, introduction_anim, introduction_backwards_anim]);

  React.useEffect(() => {
    if (waitressReset && pos_anim && main_walk_anim) {
      main_walk_anim.reset();
      main_walk_anim.stop();
      pos_anim.reset();
      pos_anim.timeScale = 1;
      pos_anim.play();
    }
  }, [pos_anim, waitressReset, main_walk_anim]);

  React.useEffect(() => {
    if (foodOrdered) {
      walkAnimEnabled.current = true;
      dialogueTalkTableServe.current = true;
      if (pos_anim && main_walk_anim) {
        pos_anim.reset();
        pos_anim.stop();
        pos_anim?.crossFadeTo(main_walk_anim, 0, true);
        main_walk_anim.reset();
        main_walk_anim.timeScale = 1;
        main_walk_anim.repetitions = 1;
        main_walk_anim.clampWhenFinished = true;
        main_walk_anim.play();
      }
    }
  }, [foodOrdered, pos_anim, main_walk_anim]);

  React.useEffect(() => {
    if (waitressTalkTable) {
      dialogueTalkTable.current = true;
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
      dialogueFakeWalk.current = true;
      setWaitressDialogueCurrent('');
      if (introduction_anim && fake_walk_anim) {
        introduction_anim?.crossFadeTo(fake_walk_anim, 0.5, true);
        fake_walk_anim.reset();
        fake_walk_anim.timeScale = 1;
        fake_walk_anim.repetitions = 1;
        fake_walk_anim.clampWhenFinished = true;
        fake_walk_anim.play();
      }
    }
  }, [
    fake_walk_anim,
    waitressShowTable,
    introduction_anim,
    talk_table_anim,
    setWaitressDialogueCurrent,
  ]);

  React.useEffect(() => {
    if (roomNameState === 'check_counter') {
      reverseIntroductionAnim.current = true;
      dialogueIntroduction.current = true;
      if (pos_anim && introduction_anim) {
        pos_anim?.crossFadeTo(introduction_anim, 1, true);
        counterActive.current = true;
        introduction_anim.reset();
        introduction_anim.timeScale = 1;
        introduction_anim.repetitions = 1;
        introduction_anim.clampWhenFinished = true;
        introduction_anim.play();
      }
    }
  }, [introduction_anim, pos_anim, roomNameState]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='rig_waitress' position={[-4.53, 0, 0]}>
          <skinnedMesh
            frustumCulled={false}
            name='waitress_eyebrows'
            geometry={nodes.waitress_eyebrows.geometry}
            material={nodes.waitress_eyebrows.material}
            skeleton={nodes.waitress_eyebrows.skeleton}
            morphTargetDictionary={
              nodes.waitress_eyebrows.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.waitress_eyebrows.morphTargetInfluences
            }
          >
            <meshStandardMaterial
              alphaMap={waitress_eyebrows}
              transparent
              color={'#534316'}
            />
          </skinnedMesh>
          <skinnedMesh
            frustumCulled={false}
            name='waitress_lowerbody'
            geometry={nodes.waitress_lowerbody.geometry}
            material={nodes.waitress_lowerbody.material}
            skeleton={nodes.waitress_lowerbody.skeleton}
            morphTargetDictionary={
              nodes.waitress_lowerbody.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.waitress_lowerbody.morphTargetInfluences
            }
          >
            <meshStandardMaterial
              map={waitress_lowerbody}
              lightMap={waitress_lowerbody}
              lightMapIntensity={1}
            />
          </skinnedMesh>
          <skinnedMesh
            frustumCulled={false}
            name='waitress_upperbody'
            geometry={nodes.waitress_upperbody.geometry}
            material={nodes.waitress_upperbody.material}
            skeleton={nodes.waitress_upperbody.skeleton}
          >
            <meshStandardMaterial
              map={waitress_upperbody}
              lightMap={waitress_upperbody}
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
      </group>
    </group>
  );
}

useGLTF.preload('/restaurant_waitress.glb');
