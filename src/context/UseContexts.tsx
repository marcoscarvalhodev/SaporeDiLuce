import { useContext } from 'react';
import { CreateContextOrbit } from './ContextOrbit';

export const UseOrbitContext = () => {
  const useOrbitContext = useContext(CreateContextOrbit);
  if (!useOrbitContext) {
    throw new Error('there is no orbit context');
  }

  return useOrbitContext;
};
