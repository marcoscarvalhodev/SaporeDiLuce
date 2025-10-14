import { useContext } from 'react';
import {
  CreateContextAnimations,
  CreateContextAudioChoice,
  CreateContextButtons,
  CreateCameraMovementContext,
  CreateOverlaysContext,
  CreateContextHumans,
  CreateContextFood,
  CreateContextFeaturesToggle,
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

export const UseButtonsContext = () => {
  const useButtonsContext = useContext(CreateContextButtons);

  if (!useButtonsContext) {
    throw new Error('there is no buttons room context');
  }

  return useButtonsContext;
};



export const UseOverlaysContext = () => {
  const useOverlaysContext = useContext(CreateOverlaysContext);

  if (!useOverlaysContext) {
    throw new Error('there is no overlays context');
  }

  return useOverlaysContext;
};


export const UseHumansContext = () => {
  const useHumansContext = useContext(CreateContextHumans);

  if (!useHumansContext) {
    throw new Error('there is no humans context');
  }

  return useHumansContext;
};


export const UseFoodContext = () => {
  const useFoodContext = useContext(CreateContextFood);

  if (!useFoodContext) {
    throw new Error('there is no food context');
  }

  return useFoodContext;
};

export const UseFeaturesToggleContext = () => {
  const useFeaturesToggleContext = useContext(CreateContextFeaturesToggle);

  if(!useFeaturesToggleContext) {
    throw new Error("there is no features toggle context")
  }

  return useFeaturesToggleContext;
}
