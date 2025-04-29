import React from 'react';
import { CreateContextAnimations, customerReviewProps } from './CreateContexts';

export const ContextAnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [doorClose, setDoorClose] = React.useState(false);
  const [movementAudioState, setMovementAudioState] = React.useState(false);
  const [doorOpen, setDoorOpen] = React.useState(false);
  const [finishedWaiterAnim, setFinishedWaiterAnim] = React.useState(false);
  const [customerReview, setCustomerReview] = React.useState<customerReviewProps>("");

  return (
    <CreateContextAnimations.Provider
      value={{
        doorClose,
        setDoorClose,
        doorOpen,
        setDoorOpen,
        movementAudioState,
        setMovementAudioState,
        finishedWaiterAnim,
        setFinishedWaiterAnim,
        customerReview,
        setCustomerReview
      }}
    >
      {children}
    </CreateContextAnimations.Provider>
  );
};
