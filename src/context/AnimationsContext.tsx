import React from 'react';
import { CreateContextAnimations } from './CreateContexts';

export const ContextAnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [doorClose, setDoorClose] = React.useState(false);
  const [movementAudioState, setMovementAudioState] = React.useState(false);
  const [doorOpen, setDoorOpen] = React.useState(false);
  const [finishedWaiterAnim, setFinishedWaiterAnim] = React.useState(false);

  return (
    <CreateContextAnimations.Provider
      value={{
        doorClose,
        setDoorClose,
        doorOpen,
        setDoorOpen,
        movementAudioState,
        setMovementAudioState,
        finishedWaiterAnim,
        setFinishedWaiterAnim,
      }}
    >
      {children}
    </CreateContextAnimations.Provider>
  );
};
