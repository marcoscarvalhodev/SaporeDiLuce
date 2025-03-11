import React from 'react';

export const AudioEffects = () => {
  const MovementAudio = React.useCallback(() => {
    const moveAudio = new Audio('/audio/movement_audio.wav');

    moveAudio.play();
  }, []);

  const DoorAudio = React.useCallback(() => {
    const doorAudio = new Audio('/audio/door_closing.wav');

    doorAudio.play();
  }, []);

  return {
    MovementAudio,
    DoorAudio,
  };
};
