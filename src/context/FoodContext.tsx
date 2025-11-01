import React from 'react';
import { CreateContextFood } from './CreateContexts';

export const ContextFoodProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [foodOrdered, setFoodOrdered] = React.useState(false);
  const [foodOnTable, setFoodOnTable] = React.useState(false);
  const [eatFood, setEatFood] = React.useState(false);
  const [emptyDish, setEmptyDish] = React.useState(false);

  return (
    <CreateContextFood.Provider
      value={{
        foodOrdered,
        setFoodOrdered,
        foodOnTable,
        setFoodOnTable,
        eatFood,
        setEatFood,
        emptyDish,
        setEmptyDish
      }}
    >
      {children}
    </CreateContextFood.Provider>
  );
};
