import React from 'react';
import gsap from 'gsap';
import {
  UseButtonsContext,
  UseFoodContext,
  UseHumansContext,
} from '../context/UseContexts';

const FoodReadyOverlay = () => {
  const foodReadOverlayRef = React.useRef<null | HTMLDivElement>(null);
  const { finishedWaitressAnim, setWaitressReset, setFinishedWaitressAnim } =
    UseHumansContext();
  const { setShowEatButton } = UseButtonsContext();
  const { setFoodOnTable, setFoodOrdered } = UseFoodContext();
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(foodReadOverlayRef.current, { opacity: 0 });

      if (finishedWaitressAnim) {
        const tl = gsap.timeline();

        tl.to(foodReadOverlayRef.current, {
          duration: 1,
          opacity: 1,
          pointerEvents: 'all',
          onComplete: () => {
            setFoodOnTable(true);
            setShowEatButton(true);
          },
        }).to(foodReadOverlayRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 1,
          delay: 3,
          onStart: () => {
            setWaitressReset(true);
            setFoodOrdered(false);
          },
          onComplete: () => {
            setWaitressReset(false);
            setFinishedWaitressAnim(false);
          },
        });
      }
    });

    return () => ctx.revert();
  }, [
    finishedWaitressAnim,
    setFoodOnTable,
    setShowEatButton,
    setWaitressReset,
    setFinishedWaitressAnim,
    setFoodOrdered,
  ]);

  return (
    <div
      className='fixed pointer-events-none z-[999] top-0 left-0 right-0 bottom-0 bg-[#e4e3e6]'
      ref={foodReadOverlayRef}
    >
      <div className='w-full h-full flex flex-col justify-center items-center select-none'>
        <h1 className=' text-[4.8rem]'>
          Your meal will be ready in 15 minutes.
        </h1>
      </div>
    </div>
  );
};

export default FoodReadyOverlay;
