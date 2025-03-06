import React from 'react';

interface OrbitProps {
  orbitExists: boolean;
  setOrbitExists: React.Dispatch<React.SetStateAction<boolean>>;
  startButtonRef: React.RefObject<HTMLButtonElement | null>;
}

interface AnimationsProps {
  doorClose: boolean;
  setDoorClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateContextOrbit = React.createContext<null | OrbitProps>(null);

export const CreateContextAnimations =
  React.createContext<null | AnimationsProps>(null);
