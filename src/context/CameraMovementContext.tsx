import React from 'react';
import { CreateCameraMovementContext } from './CreateContexts';

export type roomNameProps =
  | 'restaurant_enter'
  | 'dining_room_enter'
  | 'restaurant_leave'
  | 'dining_room_leave';

export const ContextCameraMovementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [roomNameState, setRoomNameState] =
    React.useState<null | roomNameProps>(null);
  return (
    <CreateCameraMovementContext.Provider
      value={{ roomNameState, setRoomNameState }}
    >
      {children}
    </CreateCameraMovementContext.Provider>
  );
};
