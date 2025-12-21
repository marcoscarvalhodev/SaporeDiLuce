import React from 'react';
import { AudioEffects } from './AudioEffects';
import {
  UseAnimationsContext,
  UseAudioChoiceContext,
  UseFoodContext,
} from '../context/UseContexts';

const AudioController = () => {
  const {
    MovementAudio,
    DoorOpeningAudio,
    DoorClosingAudio,
    OrderedFoodAudio,
    EatingAudio,
    SongAudio,
  } = AudioEffects();
  const { doorState, cameraMoving } = UseAnimationsContext();
  const { audioPlay } = UseAudioChoiceContext();
  const { foodOrdered, eatFood } = UseFoodContext();

  React.useEffect(() => {
    if (audioPlay) {
      if (doorState === 'opening') {
        DoorOpeningAudio();
      } else if (doorState === 'closing') {
        DoorClosingAudio();
      }
    }
  }, [doorState, DoorOpeningAudio, DoorClosingAudio, audioPlay]);

  React.useEffect(() => {
    if (audioPlay && cameraMoving) {
      MovementAudio();
    }
  }, [audioPlay, cameraMoving, MovementAudio]);

  React.useEffect(() => {
    if (audioPlay && foodOrdered) {
      OrderedFoodAudio();
    }
  }, [foodOrdered, OrderedFoodAudio, audioPlay]);

  React.useEffect(() => {
    if (eatFood && audioPlay) {
      setTimeout(() => {
        EatingAudio();
      }, 1200);
    }
  }, [eatFood, EatingAudio, audioPlay]);

  React.useEffect(() => {
    SongAudio();
  }, [SongAudio]);

  

  return <></>;
};

export default AudioController;
