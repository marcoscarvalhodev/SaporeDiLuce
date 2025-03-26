import React from 'react';
import { buttonsReducerState, actionRoom } from '../helpers/buttonsReducer';
import { roomNameProps } from './CameraMovementContext';

interface CameraMovementProps {
  roomNameState: roomNameProps | null;
  setRoomNameState: React.Dispatch<React.SetStateAction<roomNameProps | null>>;
  refCanvasUpdated: React.RefObject<HTMLCanvasElement | null>;
}

interface AnimationsProps {
  doorClose: boolean;
  setDoorClose: React.Dispatch<React.SetStateAction<boolean>>;
  doorOpen: boolean;
  setDoorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  movementAudioState: boolean;
  setMovementAudioState: React.Dispatch<React.SetStateAction<boolean>>;
  finishedWaiterAnim: boolean;
  setFinishedWaiterAnim: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AudioChoiceProps {
  audioPlay: boolean;
  setAudioPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OverlaysProps {
  menuOverlay: boolean;
  setMenuOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export type menuOptionsProps =
  | ''
  | 'dish_1'
  | 'dish_2'
  | 'dish_3'
  | 'dish_4'
  | 'dish_5';

interface ButtonsProps {
  state: buttonsReducerState;
  dispatch: React.ActionDispatch<[action: actionRoom]>;
  menuActive: boolean;
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  foodOrdered: boolean;
  setFoodOrdered: React.Dispatch<React.SetStateAction<boolean>>;
  menuOptionsClick: menuOptionsProps;
  setMenuOptionsClick: React.Dispatch<React.SetStateAction<menuOptionsProps>>;
}

export const CreateOverlaysContext = React.createContext<null | OverlaysProps>(
  null
);

export const CreateCameraMovementContext =
  React.createContext<null | CameraMovementProps>(null);

export const CreateContextAnimations =
  React.createContext<null | AnimationsProps>(null);

export const CreateContextAudioChoice =
  React.createContext<null | AudioChoiceProps>(null);

export const CreateContextButtons = React.createContext<null | ButtonsProps>(
  null
);
