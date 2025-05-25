import { Html } from '@react-three/drei';
import React from 'react';
import TypewriterText from '../ReviewsCustomers/TypewriterText';
import {
  UseButtonsContext,
  UseCameraMovementContext,
  UseHumansContext,
} from '../context/UseContexts';
import { waiterDialogueProps } from '../context/CreateContexts';

type optionsDialogueProps = {
  message: string;
  id: waiterDialogueProps;
  foodOptions?: { dish: string; foodName: string }[];
  position: [x: number, y: number, z: number];
}[];

const optionsDialogueWaitress: optionsDialogueProps = [
  {
    position: [-1, 1.968, -4.628],
    message:
      'Welcome to Sapore di Luce, would you like to go to your table? (click on the yellow circle)',
    id: 'introduction_talk',
  },
  {
    position: [-1, 1.968, -4.628],
    message: 'So please follow me through this way.',
    id: 'fake_walk_talk',
  },
  {
    position: [6.341, 1.692, -4.968],
    message:
      'If you need anything else you can just call me at the counter, and I will be happy to serve you.',
    id: 'table_talk',
  },
  {
    position: [6.341, 1.692, -4.968],
    message: `So you want a replace, it is an excellent choice.`,
    id: 'table_talk_serve',
    foodOptions: [
      { dish: 'dish_1', foodName: 'pasta allo scarpariello' },
      { dish: 'dish_2', foodName: 'paccheri freddi tonno e zucchine' },
      { dish: 'dish_3', foodName: 'pasta alla gricia' },
      { dish: 'dish_4', foodName: 'gnocchi alla crema di scampi' },
      { dish: 'dish_5', foodName: 'pollo alla zuca' },
    ],
  },
];

const WaitressDialogue = () => {
  const { waitressDialogueCurrent, setWaitressDialogueCurrent } =
    UseHumansContext();
  const { menuOptionsClick } = UseButtonsContext();

  const { roomNameState } = UseCameraMovementContext();
  React.useEffect(() => {
    if (roomNameState === 'dining_room_enter') {
      setWaitressDialogueCurrent('');
    }
  }, [roomNameState, setWaitressDialogueCurrent]);

  return optionsDialogueWaitress.map(
    ({ position, message, id, foodOptions }) => {
      return id === waitressDialogueCurrent ? (
        <mesh position={position} key={id}>
          <Html>
            <div className='dialogue_wrapper'>
              <TypewriterText
                fullMessage={message.replace(
                  'replace',
                  foodOptions?.find((item) => item.dish === menuOptionsClick)
                    ?.foodName || ''
                )}
              />
            </div>
          </Html>
        </mesh>
      ) : (
        <mesh key={id}></mesh>
      );
    }
  );
};

export default WaitressDialogue;
