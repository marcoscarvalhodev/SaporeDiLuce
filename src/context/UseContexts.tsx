import { useContext } from 'react';
import { CreateContextAnimations } from './CreateContexts';
import { CreateContextOrbit } from './CreateContexts';

export const UseOrbitContext = () => {
  const useOrbitContext = useContext(CreateContextOrbit);
  if (!useOrbitContext) {
    throw new Error('there is no orbit context');
  }

  return useOrbitContext;
};

export const UseAnimationsContext = () => {
  const useAnimationsContext = useContext(CreateContextAnimations);

  if (!useAnimationsContext) {
    throw new Error('there is no animations context');
  }

  return useAnimationsContext;
};
