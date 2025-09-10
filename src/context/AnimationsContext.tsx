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
  const [clickedAudio, setClickedAudio] = React.useState(false);
  const [customersAnimationsReady, setCustomersAnimationsReady] =
    React.useState(false);

  React.useEffect(() => {
    if (clickedAudio) setCustomersAnimationsReady(true);
  }, [clickedAudio]);

  return (
    <CreateContextAnimations.Provider
      value={{
        doorClose,
        setDoorClose,
        doorOpen,
        setDoorOpen,
        movementAudioState,
        setMovementAudioState,
        customersAnimationsReady,
        clickedAudio,
        setClickedAudio,
      }}
    >
      {children}
    </CreateContextAnimations.Provider>
  );
};
