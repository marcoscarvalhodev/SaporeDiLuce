import React from 'react';
import { CreateContextLoading } from './CreateContexts';
import { useProgress } from '@react-three/drei';

export const ContextLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { progress, active } = useProgress();

  React.useLayoutEffect(() => {
    if (!active && progress === 100) {
      setIsLoading(false);
    }
  }, [active, progress]);

  return (
    <CreateContextLoading.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </CreateContextLoading.Provider>
  );
};
