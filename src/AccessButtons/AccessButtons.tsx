import * as THREE from 'three';
import React from 'react';
import { JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import gsap from 'gsap';
import './AccessButtons.css';
import {
  UseButtonsRoomContext,
  UseCameraMovementContext,
} from '../context/UseContexts';
import { Html } from '@react-three/drei';
import { roomName } from '../helpers/buttonsReducer';
import ButtonReusable from './ButtonReusable';


type GLTFResult = GLTF & {
  nodes: {
    entrance_button: THREE.Mesh;
    dining_button: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

export function AccessButtons(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/access_buttons.glb') as GLTFResult;
  const { state, dispatch } = UseButtonsRoomContext();

  const buttonRestaurant = React.useRef<null | HTMLDivElement>(null);
  const buttonDinner = React.useRef<HTMLDivElement | null>(null);

  const { roomNameState, setRoomNameState } = UseCameraMovementContext();

  const handleRestaurantButtonClick = () => {
    if (
      roomNameState === 'restaurant_enter' ||
      roomNameState === 'dining_room_leave'
    ) {
      setRoomNameState('restaurant_leave');
      dispatch({ type: roomName.RESTAURANT_ENTER, payload: false });

      gsap.to(buttonDinner.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });
    } else {
      setRoomNameState('restaurant_enter');
      dispatch({ type: roomName.RESTAURANT_ENTER, payload: true });

      gsap.to(buttonDinner.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.7,
        delay: 2.3,
      });
    }
  };

  const handleDiningButtonClick = () => {
    if (roomNameState === 'dining_room_enter') {
      setRoomNameState('dining_room_leave');
      dispatch({ type: roomName.DINING_AREA_ENTER, payload: false });
      gsap.to(buttonRestaurant.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.7,
        delay: 2.3,
      });
    } else {
      setRoomNameState('dining_room_enter');
      dispatch({ type: roomName.DINING_AREA_ENTER, payload: true });

      gsap.to(buttonRestaurant.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });
    }
  };

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.entrance_button.geometry}
          material={nodes.entrance_button.material}
          position={[8.09, 1.666, 0.416]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <Html>
            <ButtonReusable
              id='restaurant_button'
              ref={buttonRestaurant}
              onClick={handleRestaurantButtonClick}
              goText='Enter Restaurant'
              outText='Leave Restaurant'
              enterEnvironment={state.restaurantEnter}
            />
          </Html>
          <meshStandardMaterial opacity={0} transparent />
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.dining_button.geometry}
          material={nodes.dining_button.material}
          position={[2.567, 1.668, -2.375]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <Html>
            <ButtonReusable
              id='dinner_button'
              ref={buttonDinner}
              enterEnvironment={state.diningAreaEnter}
              onClick={handleDiningButtonClick}
              goText='Enter Dining Area'
              outText='Leave Dining Area'
            />
          </Html>
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
      </group>

      
    </>
  );
}

useGLTF.preload('/access_buttons.glb');
