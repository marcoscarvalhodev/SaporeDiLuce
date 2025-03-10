import { useContext } from 'react';
import {
  CreateContextAnimations,
  CreateContextAudioChoice,
  CreateContextButtonsRoom,
  CreateCameraMovementContext,
} from './CreateContexts';

export const UseCameraMovementContext = () => {
  const useCameraMovementContext = useContext(CreateCameraMovementContext);
  if (!useCameraMovementContext) {
    throw new Error('there is no camera movement context');
  }

  return useCameraMovementContext;
};

export const UseAudioChoiceContext = () => {
  const useAudioChoiceContext = useContext(CreateContextAudioChoice);
  if (!useAudioChoiceContext) {
    throw new Error('there is no audio choice context');
  }

  return useAudioChoiceContext;
};

export const UseAnimationsContext = () => {
  const useAnimationsContext = useContext(CreateContextAnimations);

  if (!useAnimationsContext) {
    throw new Error('there is no animations context');
  }

  return useAnimationsContext;
};

export const UseButtonsRoomContext = () => {
  const useButtonsRoomContext = useContext(CreateContextButtonsRoom);

  if (!useButtonsRoomContext) {
    throw new Error('there is no buttons room context');
  }

  return useButtonsRoomContext;
};
