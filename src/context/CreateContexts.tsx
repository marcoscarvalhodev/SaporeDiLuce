import React from 'react';
import { buttonsReducerState, actionRoom } from '../helpers/buttonsReducer';
import { roomNameProps } from './CameraMovementContext';
interface CameraMovementProps {
  roomNameState: roomNameProps | null;
  setRoomNameState: React.Dispatch<React.SetStateAction<roomNameProps | null>>;
}

interface AnimationsProps {
  doorClose: boolean;
  setDoorClose: React.Dispatch<React.SetStateAction<boolean>>;
  doorOpen: boolean;
  setDoorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  movementAudioState: boolean;
  setMovementAudioState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AudioChoiceProps {
  audioPlay: boolean;
  setAudioPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonsRoomProps {
  state: buttonsReducerState;
  dispatch: React.ActionDispatch<[action: actionRoom]>;
}

export const CreateCameraMovementContext =
  React.createContext<null | CameraMovementProps>(null);

export const CreateContextAnimations =
  React.createContext<null | AnimationsProps>(null);

export const CreateContextAudioChoice =
  React.createContext<null | AudioChoiceProps>(null);

export const CreateContextButtonsRoom =
  React.createContext<null | ButtonsRoomProps>(null);
