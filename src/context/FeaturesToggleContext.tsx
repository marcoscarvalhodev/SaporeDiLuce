import React from 'react';
import { CreateContextFeaturesToggle } from './CreateContexts';

export const ContextFeaturesToggleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeBloom, setActiveBloom] = React.useState(true);
  const [activeReflections, setActiveReflections] = React.useState(false);
  return (
    <CreateContextFeaturesToggle.Provider
      value={{
        activeBloom,
        setActiveBloom,
        activeReflections,
        setActiveReflections,
      }}
    >
      {children}
    </CreateContextFeaturesToggle.Provider>
  );
};
