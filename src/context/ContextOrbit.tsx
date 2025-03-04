import React from 'react';

interface OrbitProps {
  orbitExists: boolean;
  setOrbitExists: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateContextOrbit = React.createContext<null | OrbitProps>(null);

export const ContextOrbitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orbitExists, setOrbitExists] = React.useState(false);

  return (
    <CreateContextOrbit.Provider value={{ orbitExists, setOrbitExists }}>
      {children}
    </CreateContextOrbit.Provider>
  );
};
