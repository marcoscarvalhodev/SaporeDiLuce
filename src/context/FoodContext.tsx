import React from 'react';
import { CreateContextFood, knifeForkTable4Props } from './CreateContexts';

export const ContextFoodProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [foodOrdered, setFoodOrdered] = React.useState(false);
  const [foodOnTable, setFoodOnTable] = React.useState(false);
  const [eatFood, setEatFood] = React.useState(false);
  const [emptyDish, setEmptyDish] = React.useState(false);
  const [knifeForkTable4, setKnifeForkTable4] =
    React.useState<knifeForkTable4Props>('still');

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
        setEmptyDish,
        knifeForkTable4,
        setKnifeForkTable4,
      }}
    >
      {children}
    </CreateContextFood.Provider>
  );
};
