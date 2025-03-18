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
    table_2_button: THREE.Mesh;
    table_1_button: THREE.Mesh;
    table_3_button: THREE.Mesh;
    table_5_button: THREE.Mesh;
    table_4_button: THREE.Mesh;
    counter_button: THREE.Mesh;
    menu_button: THREE.Mesh;
  };
  materials: { '': THREE.MeshStandardMaterial };
};

interface handleTableButtonProps {
  tableRef: HTMLDivElement | null;
  stateName:
    | 'check_table_1'
    | 'check_table_2'
    | 'check_table_3'
    | 'check_table_4'
    | 'check_table_5'
    | 'check_counter';
}

export function AccessButtons(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/access_buttons.glb') as GLTFResult;

  const { state, dispatch, menuActive, setMenuActive } =
    UseButtonsRoomContext();

  const buttonRestaurant = React.useRef<null | HTMLDivElement>(null);
  const buttonDinner = React.useRef<HTMLDivElement | null>(null);
  const buttonTable1 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable2 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable3 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable4 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable5 = React.useRef<HTMLDivElement | null>(null);
  const buttonCounter = React.useRef<HTMLDivElement | null>(null);
  const buttonMenu = React.useRef<HTMLDivElement | null>(null);

  const { roomNameState, setRoomNameState } = UseCameraMovementContext();

  const [tableActive, setTableActive] = React.useState(false);

  const tableRefCollection = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    tableRefCollection.current = [
      buttonTable1.current,
      buttonTable2.current,
      buttonTable3.current,
      buttonTable4.current,
      buttonTable5.current,
      buttonCounter.current,
    ];
  });

  const handleMenuButtonClick = React.useCallback(() => {
    if (roomNameState === 'check_table_4') {
      gsap.to(buttonMenu.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.7,
      });
    } else {
      gsap.to(buttonMenu.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });
    }
  }, [roomNameState]);

  const handleMenuActive = React.useCallback(() => {
    if (roomNameState === 'check_table_4') {
      if (menuActive) {
        gsap.to(buttonTable4.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.7,
        });
      } else {
        gsap.to(buttonTable4.current, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.7,
        });
      }
    }
  }, [menuActive, roomNameState]);

  React.useEffect(() => {
    handleMenuButtonClick();
    handleMenuActive();
  }, [handleMenuButtonClick, handleMenuActive]);

  const handleTablesButtonClick = ({
    tableRef,
    stateName,
  }: handleTableButtonProps) => {
    const updatedTableRefCollection = tableRefCollection.current.filter(
      (item) => item !== tableRef
    );

    if (roomNameState === 'dining_room_enter') {
      setTableActive(true);

      setRoomNameState(stateName);

      gsap.to([updatedTableRefCollection, buttonDinner.current], {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });
    } else {
      gsap.to([updatedTableRefCollection, buttonDinner.current], {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.7,
      });
      setTableActive(false);
      setRoomNameState('dining_room_enter');
    }
  };

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

      gsap.to(tableRefCollection.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });
    } else {
      setRoomNameState('dining_room_enter');
      dispatch({ type: roomName.DINING_AREA_ENTER, payload: true });

      gsap.to(
        [
          buttonTable1.current,
          buttonTable2.current,
          buttonTable3.current,
          buttonTable4.current,
          buttonTable5.current,
          buttonCounter.current,
        ],
        {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.7,
          delay: 2.3,
        }
      );

      gsap.to(buttonRestaurant.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });
    }
  };

  return (
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
            textSize='large'
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
            textSize='large'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_2_button.geometry}
        material={nodes.table_2_button.material}
        position={[3.826, 1.492, -5.295]}
        scale={0.057}
      >
        <Html>
          <ButtonReusable
            id='table_2_button'
            ref={buttonTable2}
            onClick={() => {
              handleTablesButtonClick({
                tableRef: buttonTable2.current,
                stateName: 'check_table_2',
              });
            }}
            goText='Check Table'
            outText='Leave Table'
            enterEnvironment={tableActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_1_button.geometry}
        material={nodes.table_1_button.material}
        position={[2.425, 1.492, -8.084]}
        scale={0.057}
      >
        <Html>
          <ButtonReusable
            id='table_1_button'
            ref={buttonTable1}
            onClick={() => {
              handleTablesButtonClick({
                tableRef: buttonTable1.current,
                stateName: 'check_table_1',
              });
            }}
            goText='Check Table'
            outText='Leave Table'
            enterEnvironment={tableActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_3_button.geometry}
        material={nodes.table_3_button.material}
        position={[4.616, 1.492, -8.554]}
        scale={0.057}
      >
        <Html>
          <ButtonReusable
            id='table_3_button'
            ref={buttonTable3}
            onClick={() => {
              handleTablesButtonClick({
                tableRef: buttonTable3.current,
                stateName: 'check_table_3',
              });
            }}
            goText='Check Table'
            outText='Leave Table'
            enterEnvironment={tableActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_5_button.geometry}
        material={nodes.table_5_button.material}
        position={[6.781, 1.492, -7.75]}
        scale={0.057}
      >
        <Html>
          <ButtonReusable
            id='table_5_button'
            ref={buttonTable5}
            onClick={() => {
              handleTablesButtonClick({
                tableRef: buttonTable5.current,
                stateName: 'check_table_5',
              });
            }}
            goText='Check Table'
            outText='Leave Table'
            enterEnvironment={tableActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_4_button.geometry}
        material={nodes.table_4_button.material}
        position={[6.341, 1.492, -4.968]}
        scale={0.057}
      >
        <Html>
          <ButtonReusable
            id='table_4_button'
            ref={buttonTable4}
            onClick={() => {
              handleTablesButtonClick({
                tableRef: buttonTable4.current,
                stateName: 'check_table_4',
              });
            }}
            goText='Sit at Table'
            outText='Leave Table'
            enterEnvironment={tableActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.counter_button.geometry}
        material={nodes.counter_button.material}
        position={[-1.433, 2.668, -7.028]}
        scale={0.074}
      >
        <Html>
          <ButtonReusable
            id='counter_button'
            ref={buttonCounter}
            onClick={() => {
              handleTablesButtonClick({
                tableRef: buttonCounter.current,
                stateName: 'check_counter',
              });
            }}
            goText='Sit at Counter'
            outText='Leave Counter'
            enterEnvironment={tableActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.menu_button.geometry}
        material={nodes.menu_button.material}
        position={[6.388, 1.121, -4.595]}
        scale={0.057}
      >
        <Html>
          <ButtonReusable
            id='menu_button'
            ref={buttonMenu}
            onClick={() => {
              setMenuActive(!menuActive);
            }}
            goText='See Menu'
            outText='Drop Menu'
            enterEnvironment={menuActive}
            textSize='small'
          />
        </Html>
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
    </group>
  );
}

useGLTF.preload('/access_buttons.glb');
