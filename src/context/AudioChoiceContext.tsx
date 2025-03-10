import React from 'react';
import { CreateContextAudioChoice } from './CreateContexts';

export const ContextAudioChoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audioPlay, setAudioPlay] = React.useState(false);

  return (
    <CreateContextAudioChoice.Provider value={{ audioPlay, setAudioPlay }}>
      {children}
    </CreateContextAudioChoice.Provider>
  );
};
