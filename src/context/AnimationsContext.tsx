import React from 'react';
import { CreateContextAnimations } from './CreateContexts';
import { Mesh } from 'three';

export const ContextAnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [doorClose, setDoorClose] = React.useState(false);
  const [movementAudioState, setMovementAudioState] = React.useState(false);
  const [doorOpen, setDoorOpen] = React.useState(false);
  const arrowRefUpdated = React.useRef<null | Mesh>(null);

  return (
    <CreateContextAnimations.Provider
      value={{
        doorClose,
        setDoorClose,
        doorOpen,
        setDoorOpen,
        movementAudioState,
        setMovementAudioState,
        arrowRefUpdated
      }}
    >
      {children}
    </CreateContextAnimations.Provider>
  );
};
