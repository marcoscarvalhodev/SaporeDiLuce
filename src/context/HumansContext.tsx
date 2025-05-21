import React from 'react';
import { CreateContextHumans } from './CreateContexts';
import { customerReviewProps } from './CreateContexts';

export const ContextHumansProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [finishedWaiterAnim, setFinishedWaiterAnim] = React.useState(false);
  const [customerReview, setCustomerReview] =
    React.useState<customerReviewProps>('');
  const [waitressShowTable, setWaitressShowTable] = React.useState(false);
  const [waitressTalkTable, setWaitressTalkTable] = React.useState(false);

  return (
    <CreateContextHumans.Provider
      value={{
        finishedWaiterAnim,
        setFinishedWaiterAnim,
        customerReview,
        setCustomerReview,
        waitressShowTable,
        setWaitressShowTable,
        waitressTalkTable,
        setWaitressTalkTable,
      }}
    >
      {children}
    </CreateContextHumans.Provider>
  );
};
