import React from 'react';
import { UseAudioChoiceContext } from '../context/UseContexts';

export const AudioEffects = () => {
  const { audioPlay } = UseAudioChoiceContext();

  const MovementAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const moveAudio = new Audio('/audio/movement_audio.wav');

    moveAudio.play();
  }, [audioPlay]);

  const DoorClosingAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const doorAudio = new Audio('/audio/door_closing.mp3');

    doorAudio.play();
  }, [audioPlay]);

  const DoorOpeningAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const doorAudio = new Audio('/audio/door_opening.mp3');

    doorAudio.play();
  }, [audioPlay]);

  const OrderedFoodAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const orderedFoodAudio = new Audio('/audio/ordered_food.mp3');

    orderedFoodAudio.play();
  }, [audioPlay]);

  const EatingAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const eatingAudio = new Audio('/audio/eating_sound.mp3');
    eatingAudio.play();
  }, [audioPlay]);

  return {
    MovementAudio,
    DoorClosingAudio,
    DoorOpeningAudio,
    EatingAudio,
    OrderedFoodAudio,
  };
};
