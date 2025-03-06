import React from 'react';
import { UseOrbitContext } from './context/UseContexts';
import gsap from 'gsap';

const TextContent = () => {
  const { startButtonRef } = UseOrbitContext();

  return (
    <>
      <button
        onClick={() => {
          gsap.to(startButtonRef.current, {
            duration: 0.3,
            opacity: 0,
            pointerEvents: 'none',
          });
        }}
        id='main-button'
        ref={startButtonRef}
        className='px-[2.4rem] py-[1.2rem] fixed z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-amber-50 text-[1.8rem] cursor-pointer rounded-[2rem] hover:bg-[#2e2c2c] hover:text-amber-50 transition-all duration-[0.5s]'
      >
        Enter Experience
      </button>
    </>
  );
};

export default TextContent;
