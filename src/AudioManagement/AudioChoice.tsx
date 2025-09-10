import React from 'react';
import { UseAnimationsContext, UseAudioChoiceContext } from '../context/UseContexts';
import gsap from 'gsap';

const AudioChoice = () => {
  const { setAudioPlay } = UseAudioChoiceContext();
  const {clickedAudio, setClickedAudio} = UseAnimationsContext()
  
  const audioChoiceWrapperRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    if (clickedAudio) {
      gsap.to(audioChoiceWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
      });
    }
  });

  return (
    <div
      ref={audioChoiceWrapperRef}
      className='fixed z-[9999] bg-[#e4e3e6] top-0 left-0 right-0 bottom-0'
    >
      <div className='absolute left-[50%] top-[50%] translate-[-50%] flex flex-col gap-[3.2rem]'>
        <h1 className='text-[2.4rem]'>
          Do you want your experience to be with or without sound?
        </h1>

        <div className='flex self-center gap-[1.8rem]'>
          <p
            className='text-[1.8rem] button_call'
            onClick={() => {
              setClickedAudio(true);
              setAudioPlay(true);
            }}
          >
            With sound
          </p>
          <p
            className='text-[1.8rem] button_call'
            onClick={() => {
              setClickedAudio(true);
              setAudioPlay(false);
            }}
          >
            Without sound
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioChoice;
