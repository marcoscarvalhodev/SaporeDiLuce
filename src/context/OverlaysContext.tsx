import React from 'react';
import { CreateOverlaysContext } from './CreateContexts';

export const ContextOverlaysProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuOverlay, setMenuOverlay] = React.useState(false);

  return (
    <CreateOverlaysContext.Provider value={{ menuOverlay, setMenuOverlay }}>
      {children}
    </CreateOverlaysContext.Provider>
  );
};
