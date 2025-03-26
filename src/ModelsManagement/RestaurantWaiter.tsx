import React from 'react';
import {
  UseAnimationsContext,
  UseButtonsContext,
} from '../context/UseContexts';

const RestaurantWaiter = () => {
  const { setFinishedWaiterAnim } = UseAnimationsContext();

  const { foodOrdered } = UseButtonsContext();

  React.useEffect(() => {
    if (foodOrdered) {
      setTimeout(() => {
        
        setFinishedWaiterAnim(true);
      }, 5000);
    }
  });

  return <></>;
};

export default RestaurantWaiter;
