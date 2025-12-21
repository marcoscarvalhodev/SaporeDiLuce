import React from 'react';
import { CreateContextAudioChoice } from './CreateContexts';

export const ContextAudioChoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [audioPlay, setAudioPlay] = React.useState(false);
  const [volumeControl, setVolumeControl] = React.useState(75);

  return (
    <CreateContextAudioChoice.Provider value={{ audioPlay, setAudioPlay, volumeControl, setVolumeControl }}>
      {children}
    </CreateContextAudioChoice.Provider>
  );
};
