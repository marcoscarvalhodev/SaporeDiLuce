import React from 'react';
import { CreateContextButtonsRoom } from './CreateContexts';
import { buttonsReducer } from '../helpers/buttonsReducer';

export const ContextButtonsRoomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(buttonsReducer, {
    restaurantEnter: false,
    diningAreaEnter: false,
  });

  return (
    <CreateContextButtonsRoom.Provider value={{ state, dispatch }}>
      {children}
    </CreateContextButtonsRoom.Provider>
  );
};
