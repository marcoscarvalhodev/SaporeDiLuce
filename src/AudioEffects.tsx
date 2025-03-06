export const AudioEffects = () => {
  const IntroductionAudio = () => {
    const intAudio = new Audio('/audio/introduction_audio.mp3');

    intAudio.play();
  };

  const DoorAudio = () => {
    const doorAudio = new Audio('/audio/door_closing.wav');

    doorAudio.play();
  };

  return {
    IntroductionAudio,
    DoorAudio
  };
};
