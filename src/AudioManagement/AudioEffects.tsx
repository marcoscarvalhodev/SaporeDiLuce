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

  const OrderedFoodAudio = React.useCallback(() => {
    const orderedFoodAudio = new Audio('/audio/ordered_food.mp3');

    orderedFoodAudio.play();
  }, []);

  const EatingAudio = React.useCallback(() => {
    const eatingAudio = new Audio('/audio/eating_sound.mp3');
    eatingAudio.play();
  }, []);

  return {
    MovementAudio,
    DoorAudio,
    EatingAudio,
    OrderedFoodAudio,
  };
};
