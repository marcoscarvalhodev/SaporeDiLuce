import React from 'react';
import { CreateContextButtons, menuOptionsProps } from './CreateContexts';
import { buttonsReducer } from '../helpers/buttonsReducer';

export const ContextButtonsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(buttonsReducer, {
    restaurantEnter: false,
    diningAreaEnter: false,
  });

  const [menuActive, setMenuActive] = React.useState(false);
  const [menuOptionsClick, setMenuOptionsClick] =
    React.useState<menuOptionsProps>('');
    

  return (
    <CreateContextButtons.Provider
      value={{
        state,
        dispatch,
        menuActive,
        setMenuActive,
        menuOptionsClick,
        setMenuOptionsClick,
      }}
    >
      {children}
    </CreateContextButtons.Provider>
  );
};
