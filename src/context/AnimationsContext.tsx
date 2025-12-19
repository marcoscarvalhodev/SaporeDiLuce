import React from 'react';
import { CreateContextAnimations } from './CreateContexts';
import { DoorStateTypes } from './CreateContexts';

export const ContextAnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [doorState, setDoorState] = React.useState<DoorStateTypes>('closed');
  const [cameraMoving, setCameraMoving] = React.useState(false);
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
        doorState,
        setDoorState,
        doorOpen,
        setDoorOpen,
        customersAnimationsReady,
        clickedAudio,
        setClickedAudio,
        cameraMoving,
        setCameraMoving,
      }}
    >
      {children}
    </CreateContextAnimations.Provider>
  );
};
