import React from 'react';
import { CreateContextOrbit } from './CreateContexts';

export const ContextOrbitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orbitExists, setOrbitExists] = React.useState(false);
  const startButtonRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <CreateContextOrbit.Provider
      value={{ orbitExists, setOrbitExists, startButtonRef }}
    >
      {children}
    </CreateContextOrbit.Provider>
  );
};
