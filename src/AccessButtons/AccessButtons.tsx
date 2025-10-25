import React from 'react';
import { JSX } from 'react';

import gsap from 'gsap';
import './AccessButtons.css';
import {
  UseButtonsContext,
  UseCameraMovementContext,
  UseFeaturesToggleContext,
  UseFoodContext,
  UseHumansContext,
} from '../context/UseContexts';
import { Html } from '@react-three/drei';
import { roomName } from '../helpers/buttonsReducer';
import ButtonReusable from './ButtonReusable';

interface handleTableButtonProps {
  tableRef: HTMLDivElement | null;
  stateName:
    | 'check_table_1'
    | 'check_table_2'
    | 'check_table_3'
    | 'check_table_4'
    | 'check_table_5'
    | 'check_counter';

  customers?: (HTMLDivElement | null)[] | null;
}

export function AccessButtons(props: JSX.IntrinsicElements['group']) {
  const { state, dispatch, menuActive, setMenuActive } = UseButtonsContext();
  const { activeAnimations } = UseFeaturesToggleContext();

  const buttonRestaurant = React.useRef<null | HTMLDivElement>(null);
  const buttonDinner = React.useRef<HTMLDivElement | null>(null);
  const buttonTable1 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable2 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable3 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable4 = React.useRef<HTMLDivElement | null>(null);
  const buttonTable5 = React.useRef<HTMLDivElement | null>(null);
  const buttonCounter = React.useRef<HTMLDivElement | null>(null);
  const buttonMenu = React.useRef<HTMLDivElement | null>(null);

  const buttonWaitress = React.useRef<HTMLDivElement | null>(null);

  const manTable1 = React.useRef<HTMLDivElement | null>(null);
  const womanTable1 = React.useRef<HTMLDivElement | null>(null);
  const manTable2 = React.useRef<HTMLDivElement | null>(null);
  const womanTable2 = React.useRef<HTMLDivElement | null>(null);
  const boyTable2 = React.useRef<HTMLDivElement | null>(null);
  const manTable3 = React.useRef<HTMLDivElement | null>(null);
  const womanTable3 = React.useRef<HTMLDivElement | null>(null);
  const girlTable3 = React.useRef<HTMLDivElement | null>(null);
  const womanTable5 = React.useRef<HTMLDivElement | null>(null);
  const manTable5 = React.useRef<HTMLDivElement | null>(null);
  const buttonEat = React.useRef<HTMLDivElement | null>(null);

  const { roomNameState, setRoomNameState } = UseCameraMovementContext();
  const { setCustomerReview, setWaitressShowTable, waitressShowTable } =
    UseHumansContext();
  const { showEatButton } = UseButtonsContext();
  const { foodOrdered, setEatFood } = UseFoodContext();

  const [tableActive, setTableActive] = React.useState(false);

  const tableRefCollection = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const reviewCollection = [
      {
        table: 'check_table_1',
        reviewsButton: [manTable1.current, womanTable1.current],
      },
      {
        table: 'check_table_2',
        reviewsButton: [
          manTable2.current,
          womanTable2.current,
          boyTable2.current,
        ],
      },
      {
        table: 'check_table_3',
        reviewsButton: [
          manTable3.current,
          womanTable3.current,
          girlTable3.current,
        ],
      },
    ];

    reviewCollection.forEach(({ table, reviewsButton }) => {
      if (roomNameState && table === roomNameState) {
        const validButtons = reviewsButton.filter(Boolean);

        if (validButtons.length > 0) {
          if (activeAnimations) {
            gsap.to(validButtons, {
              opacity: 1,
              pointerEvents: 'all',
              duration: 0,
              overwrite: true,
            });
          } else {
            gsap.to(validButtons, {
              opacity: 0,
              pointerEvents: 'none',
              duration: 0,
              overwrite: true,
            });
          }
        }
      }
    });
  }, [activeAnimations, roomNameState]);

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

  React.useEffect(() => {
    if (
      buttonCounter.current &&
      buttonWaitress.current &&
      buttonTable4.current &&
      buttonMenu.current
    ) {
      const tl = gsap.timeline();
      if (waitressShowTable) {
        gsap.to([buttonCounter.current, buttonWaitress.current], {
          opacity: 0,
          duration: 0.7,
          pointerEvents: 'none',
        });
      } else {
        tl.to([buttonTable4.current, buttonMenu.current], {
          opacity: 0,
          duration: 0,
          pointerEvents: 'none',
        }).to([buttonTable4.current, buttonMenu.current], {
          opacity: 1,
          duration: 0.7,
          pointerEvents: 'all',
          delay: 5,
        });
      }
    }
  }, [waitressShowTable]);

  React.useEffect(() => {
    if (buttonWaitress.current) {
      if (roomNameState === 'check_counter') {
        gsap.to(buttonWaitress.current, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.7,
          delay: 4,
        });
      } else {
        gsap.to(buttonWaitress.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.7,
        });
      }
    }
  }, [roomNameState]);

  React.useEffect(() => {
    if (buttonEat.current) {
      if (showEatButton) {
        gsap.to(buttonEat.current, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.7,
        });
      } else {
        gsap.to(buttonEat.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.7,
        });
      }
    }
  }, [showEatButton]);

  const hideTable4Buttons = React.useCallback(() => {
    if (buttonTable4.current && buttonMenu.current) {
      if (showEatButton || foodOrdered) {
        gsap.to([buttonTable4.current, buttonMenu.current], {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.7,
        });
      } else {
        gsap.to([buttonTable4.current, buttonMenu.current], {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.7,
        });
      }
    }
  }, [showEatButton, foodOrdered]);

  const handleMenuButtonClick = React.useCallback(() => {
    if (buttonMenu.current) {
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
    }
  }, [roomNameState]);

  const handleMenuActive = React.useCallback(() => {
    if (roomNameState === 'check_table_4' && buttonTable4.current) {
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
    handleMenuActive();
    handleMenuButtonClick();
  }, [handleMenuActive, handleMenuButtonClick]);

  React.useEffect(() => {
    hideTable4Buttons();
  }, [foodOrdered, hideTable4Buttons]);

  const handleTablesButtonClick = ({
    tableRef,
    stateName,
    customers,
  }: handleTableButtonProps) => {
    const updatedTableRefCollection = tableRefCollection.current.filter(
      (item) => item !== tableRef
    );

    setCustomerReview('');

    if (roomNameState === 'dining_room_enter') {
      setTableActive(true);

      setRoomNameState(stateName);
      gsap.to([updatedTableRefCollection, buttonDinner.current], {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
      });

      if (customers) {
        gsap.to(customers, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.7,
        });
      }
    } else {
      gsap.to([updatedTableRefCollection, buttonDinner.current], {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.7,
      });
      setTableActive(false);
      setRoomNameState('dining_room_enter');

      if (customers) {
        gsap.to(customers, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.7,
        });
      }
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
      <mesh position={[8.09, 1.666, 0.416]} rotation={[0, 0, -Math.PI / 2]}>
        <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
          <ButtonReusable
            hideButton
            color='black'
            id='restaurant_button'
            ref={buttonRestaurant}
            onClick={handleRestaurantButtonClick}
            goText='Enter Restaurant'
            outText='Leave Restaurant'
            enterEnvironment={state.restaurantEnter}
            textSize='large'
          />
        </Html>
        <meshStandardMaterial visible={false} />
      </mesh>

      <mesh position={[2.567, 1.268, -2.575]} rotation={[0, 0, -Math.PI / 2]}>
        <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
          <ButtonReusable
            hideButton
            color='black'
            id='dinner_button'
            ref={buttonDinner}
            enterEnvironment={state.diningAreaEnter}
            onClick={handleDiningButtonClick}
            goText='Enter Dining Area'
            outText='Leave Dining Area'
            textSize='large'
          />
        </Html>
        <meshStandardMaterial visible={false} />
      </mesh>

      <group name='table_1_customers'>
        <mesh position={[2.425, 1.492, -8.084]} scale={0.057}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              hideButton
              color='black'
              id='table_1_button'
              ref={buttonTable1}
              onClick={() => {
                handleTablesButtonClick({
                  tableRef: buttonTable1.current,
                  stateName: 'check_table_1',
                  customers: [manTable1.current, womanTable1.current],
                });
              }}
              goText='Check Table'
              outText='Leave Table'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>

        <mesh
          position={[2.425, 1.092, -8.304]}
          scale={0.057}
          name='man_table_1'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              id='table_1_man'
              ref={manTable1}
              orangeButtonClass='orange_button'
              onClick={() => {
                setCustomerReview('man_table_1');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>

        <mesh
          position={[2.425, 1.092, -7.804]}
          scale={0.057}
          name='woman_table_1'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_1_woman'
              ref={womanTable1}
              onClick={() => {
                setCustomerReview('woman_table_1');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>
      </group>

      <group name='table_2_customers'>
        <mesh position={[3.826, 1.492, -5.295]} scale={0.057}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              hideButton
              id='table_2_button'
              ref={buttonTable2}
              color='black'
              onClick={() => {
                handleTablesButtonClick({
                  tableRef: buttonTable2.current,
                  stateName: 'check_table_2',
                  customers: [
                    manTable2.current,
                    womanTable2.current,
                    boyTable2.current,
                  ],
                });
              }}
              goText='Check Table'
              outText='Leave Table'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>

        <mesh
          position={[4.257, 1.033, -5.302]}
          scale={0.057}
          name='man_table_2'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_2_man'
              ref={manTable2}
              onClick={() => {
                setCustomerReview('man_table_2');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>

        <mesh
          position={[3.457, 1.033, -5.252]}
          scale={0.057}
          name='woman_table_2'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_2_woman'
              ref={womanTable2}
              onClick={() => {
                setCustomerReview('woman_table_2');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>

        <mesh
          position={[3.807, 1.033, -4.902]}
          scale={0.057}
          name='boy_table_2'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_2_boy'
              ref={boyTable2}
              onClick={() => {
                setCustomerReview('boy_table_2');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>
      </group>

      <group name='table_3_customers'>
        <mesh position={[4.616, 1.492, -8.554]} scale={0.057}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              hideButton
              color='black'
              id='table_3_button'
              ref={buttonTable3}
              onClick={() => {
                handleTablesButtonClick({
                  tableRef: buttonTable3.current,
                  stateName: 'check_table_3',
                  customers: [
                    manTable3.current,
                    womanTable3.current,
                    girlTable3.current,
                  ],
                });
              }}
              goText='Check Table'
              outText='Leave Table'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>

        <mesh position={[5.016, 1.1, -8.51]} scale={0.057} name='man_table_3'>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_3_man'
              ref={manTable3}
              onClick={() => {
                setCustomerReview('man_table_3');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>

        <mesh
          position={[4.56, 1.092, -8.854]}
          scale={0.057}
          name='woman_table_3'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_3_woman'
              ref={womanTable3}
              onClick={() => {
                setCustomerReview('woman_table_3');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>
        <mesh position={[4.616, 1.1, -8.1]} scale={0.057} name='girl_table_3'>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_3_girl'
              ref={girlTable3}
              onClick={() => {
                setCustomerReview('girl_table_3');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>
      </group>

      <group name='table_4_customers'>
        <mesh position={[6.341, 1.492, -4.968]} scale={0.057}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              hideButton
              color='black'
              id='table_4_button'
              ref={buttonTable4}
              onClick={() => {
                handleTablesButtonClick({
                  tableRef: buttonTable4.current,
                  stateName: 'check_table_4',
                  customers: null,
                });
              }}
              goText='Sit at Table'
              outText='Leave Table'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>

        <mesh position={[6.541, 1.142, -4.968]} scale={0.057}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              color='black'
              id='eat_button'
              ref={buttonEat}
              onClick={() => {
                setEatFood(true);
              }}
              goText='Eat Food'
              outText='Eat Food'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>
      </group>

      <group name='table_5_customers'>
        <mesh position={[6.781, 1.492, -7.75]} scale={0.057}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              hideButton
              color='black'
              id='table_5_button'
              ref={buttonTable5}
              onClick={() => {
                handleTablesButtonClick({
                  tableRef: buttonTable5.current,
                  stateName: 'check_table_5',
                  customers: [manTable5.current, womanTable5.current],
                });
              }}
              goText='Check Table'
              outText='Leave Table'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>

        <mesh position={[6.781, 1.092, -7.5]} scale={0.057} name='man_table_5'>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_5_man'
              ref={manTable5}
              onClick={() => {
                setCustomerReview('man_table_5');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>

        <mesh
          position={[6.781, 1.092, -8]}
          scale={0.057}
          name='woman_table_5'
        >
          <Html style={{ pointerEvents: 'none' }} position={[0, 0.1, 0]}>
            <ButtonReusable
              color='orange'
              orangeButtonClass='orange_button'
              id='table_5_woman'
              ref={womanTable5}
              onClick={() => {
                setCustomerReview('woman_table_5');
              }}
              goText='Customer review'
              outText='Leave Table'
              enterEnvironment={false}
              textSize='large'
            />
          </Html>
        </mesh>
      </group>

      <group>
        <mesh position={[-1.433, 1.668, -7.028]} scale={0.074}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              hideButton
              color='black'
              id='counter_button'
              ref={buttonCounter}
              onClick={() => {
                handleTablesButtonClick({
                  tableRef: buttonCounter.current,
                  stateName: 'check_counter',
                  customers: null,
                });
              }}
              goText='Sit at Counter'
              outText='Leave Counter'
              enterEnvironment={tableActive}
              textSize='small'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>

        <mesh position={[-1.433, 1.368, -5.628]} scale={0.074}>
          <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
            <ButtonReusable
              color='orange'
              id='waitress_button'
              ref={buttonWaitress}
              onClick={() => {
                setWaitressShowTable(true);
              }}
              goText='Go to reserved table'
              outText='Go to reserved table'
              enterEnvironment={tableActive}
              textSize='large'
            />
          </Html>
          <meshStandardMaterial visible={false} />
        </mesh>
      </group>

      <mesh position={[6.388, 1.121, -4.595]} scale={0.057}>
        <Html style={{ pointerEvents: 'none' }} position={[0, 0, 0]}>
          <ButtonReusable
            color='orange'
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
        <meshStandardMaterial visible={false} />
      </mesh>
    </group>
  );
}
