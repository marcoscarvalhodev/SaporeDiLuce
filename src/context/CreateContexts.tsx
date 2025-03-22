import React from 'react';
import { buttonsReducerState, actionRoom } from '../helpers/buttonsReducer';
import { roomNameProps } from './CameraMovementContext';
import {
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
} from 'three';

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
  arrowRefUpdated: React.RefObject<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>;
}

interface AudioChoiceProps {
  audioPlay: boolean;
  setAudioPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonsRoomProps {
  state: buttonsReducerState;
  dispatch: React.ActionDispatch<[action: actionRoom]>;
  menuActive: boolean;
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateCameraMovementContext =
  React.createContext<null | CameraMovementProps>(null);

export const CreateContextAnimations =
  React.createContext<null | AnimationsProps>(null);

export const CreateContextAudioChoice =
  React.createContext<null | AudioChoiceProps>(null);

export const CreateContextButtonsRoom =
  React.createContext<null | ButtonsRoomProps>(null);
