import React from 'react';
import { CreateCameraMovementContext } from './CreateContexts';

export type roomNameProps =
  | 'restaurant_enter'
  | 'dining_room_enter'
  | 'restaurant_leave'
  | 'dining_room_leave'
  | 'check_table_1'
  | 'check_table_2'
  | 'check_table_3'
  | 'check_table_4'
  | 'check_table_5'
  | "check_counter"
  | 'table_counter_leave';

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
