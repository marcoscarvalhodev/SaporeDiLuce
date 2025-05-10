import React from 'react';
import gsap from 'gsap';
import { UseButtonsContext } from '../context/UseContexts';
const EatingOverlay = () => {
  const refEatingOverlay = React.useRef<null | HTMLDivElement>(null);
  const { eatFood, setShowEatButton, setEatFood } = UseButtonsContext();

  React.useEffect(() => {
    const tl = gsap.timeline();
    if (eatFood) {
      tl.to(refEatingOverlay.current, {
        opacity: 1,
        duration: 2,
        pointerEvents: 'all',
        onComplete: () => {
          setShowEatButton(false);
          setEatFood(false);
        },
      });

      tl.to(refEatingOverlay.current, {
        delay: 1,
        opacity: 0,
        duration: 2,
        pointerEvents: 'none',
      });
    }
  }, [eatFood, setEatFood, setShowEatButton]);

  return (
    <div
      ref={refEatingOverlay}
      className='eating_overlay opacity-[0] pointer-events-none bg-[#333332] fixed top-0 left-0 bottom-0 right-0 z-[9999]'
    ></div>
  );
};

export default EatingOverlay;
