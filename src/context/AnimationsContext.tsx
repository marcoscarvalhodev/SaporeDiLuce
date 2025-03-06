import React from 'react';
import { CreateContextAnimations } from './CreateContexts';

export const ContextAnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [doorClose, setDoorClose] = React.useState(false);

  return (
    <CreateContextAnimations.Provider value={{ doorClose, setDoorClose }}>
      {children}
    </CreateContextAnimations.Provider>
  );
};
