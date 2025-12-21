import React from 'react';
import { UseAudioChoiceContext } from '../context/UseContexts';

export const AudioEffects = () => {
  const { audioPlay, volumeControl } = UseAudioChoiceContext();
  const songAudioRef = React.useRef<null | HTMLAudioElement>(null);

  const MovementAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const moveAudio = new Audio('/audio/movement_audio.wav');
    moveAudio.volume = volumeControl / 100;

    moveAudio.play();
  }, [audioPlay, volumeControl]);

  const DoorClosingAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const doorAudio = new Audio('/audio/door_closing.mp3');
doorAudio.volume = volumeControl / 100;
    doorAudio.play();
  }, [audioPlay, volumeControl]);

  const DoorOpeningAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const doorAudio = new Audio('/audio/door_opening.mp3');
    doorAudio.volume = volumeControl / 100;

    doorAudio.play();
  }, [audioPlay, volumeControl]);

  const OrderedFoodAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const orderedFoodAudio = new Audio('/audio/ordered_food.mp3');
orderedFoodAudio.volume = volumeControl / 100;
    orderedFoodAudio.play();
  }, [audioPlay, volumeControl]);

  const EatingAudio = React.useCallback(() => {
    if (!audioPlay) return;
    const eatingAudio = new Audio('/audio/eating_sound.mp3');
    eatingAudio.volume = volumeControl / 100;
    eatingAudio.play();
  }, [audioPlay, volumeControl]);

  const SongAudio = React.useCallback(() => {
    if (!songAudioRef.current) {
      songAudioRef.current = new Audio('/audio/violin_ambient.mp3');
      songAudioRef.current.loop = true;
    }

    if (audioPlay) {
      songAudioRef.current.volume = volumeControl / 100;
      songAudioRef.current.play();
    } else {
      songAudioRef.current.pause();
    }
  }, [audioPlay, volumeControl]);

  return {
    MovementAudio,
    DoorClosingAudio,
    DoorOpeningAudio,
    EatingAudio,
    OrderedFoodAudio,
    SongAudio,
  };
};
