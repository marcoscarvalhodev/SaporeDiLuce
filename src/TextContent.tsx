import React from 'react';
import { UseAudioChoiceContext } from './context/UseContexts';

const TextContent = () => {
  const ambientMusicRef = React.useRef<null | HTMLAudioElement>(null);

  const { audioPlay } = UseAudioChoiceContext();

  React.useEffect(() => {
    if (audioPlay && ambientMusicRef.current) {
      ambientMusicRef.current.play();
      ambientMusicRef.current.loop = true;
      ambientMusicRef.current.volume = 0.5;
    }
  }, [audioPlay]);

  return (
    <section className='fixed z-[999]'>
      <div>
        <audio ref={ambientMusicRef} src='/audio/violin_ambient.mp3' autoPlay />
      </div>
    </section>
  );
};

export default TextContent;
