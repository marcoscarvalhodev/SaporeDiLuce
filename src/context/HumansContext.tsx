import React from 'react';
import { CreateContextHumans } from './CreateContexts';
import { customerReviewProps } from './CreateContexts';

export const ContextHumansProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [finishedWaitressAnim, setFinishedWaitressAnim] = React.useState(false);
  const [customerReview, setCustomerReview] =
    React.useState<customerReviewProps>('');
  const [waitressShowTable, setWaitressShowTable] = React.useState(false);
  const [waitressTalkTable, setWaitressTalkTable] = React.useState(false);
  const [waitressReset, setWaitressReset] = React.useState(false);

  return (
    <CreateContextHumans.Provider
      value={{
        finishedWaitressAnim,
        setFinishedWaitressAnim,
        customerReview,
        setCustomerReview,
        waitressShowTable,
        setWaitressShowTable,
        waitressTalkTable,
        setWaitressTalkTable,
        waitressReset,
        setWaitressReset,
      }}
    >
      {children}
    </CreateContextHumans.Provider>
  );
};
