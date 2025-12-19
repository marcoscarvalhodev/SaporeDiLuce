import React from 'react';
import gsap from 'gsap';
import {
  UseButtonsContext,
  UseFoodContext,
  UseHumansContext,
} from '../context/UseContexts';
const EatingOverlay = () => {
  const refEatingOverlay = React.useRef<null | HTMLDivElement>(null);
  const { setShowEatButton } = UseButtonsContext();
  const {
    eatFood,
    setEatFood,
    setFoodOrdered,
    setEmptyDish,
    setKnifeForkTable4,
  } = UseFoodContext();
  const { setWaitressShowTable } = UseHumansContext();

  React.useEffect(() => {
    const tl = gsap.timeline();
    if (eatFood) {
      tl.to(refEatingOverlay.current, {
        opacity: 1,
        duration: 1,
        pointerEvents: 'all',
        onComplete: () => {
          setKnifeForkTable4('over_dish');
          setEmptyDish(true);
          setShowEatButton(false);
          setEatFood(false);
        },
      });

      tl.to(refEatingOverlay.current, {
        delay: 4,
        opacity: 0,
        duration: 1,
        pointerEvents: 'none',
      });
    }
  }, [
    eatFood,
    setEatFood,
    setShowEatButton,
    setWaitressShowTable,
    setFoodOrdered,
    setEmptyDish,
    setKnifeForkTable4,
  ]);

  return (
    <div
      ref={refEatingOverlay}
      className='eating_overlay opacity-[0] pointer-events-none bg-[#333332] fixed top-0 left-0 bottom-0 right-0 z-[9999]'
    ></div>
  );
};

export default EatingOverlay;
