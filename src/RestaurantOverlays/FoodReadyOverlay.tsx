import React from 'react';
import gsap from 'gsap';
import {
  UseAnimationsContext,
  UseButtonsContext,
} from '../context/UseContexts';

const FoodReadyOverlay = () => {
  const foodReadOverlayRef = React.useRef<null | HTMLDivElement>(null);
  const { finishedWaiterAnim, setFinishedWaiterAnim } = UseAnimationsContext();
  const { setFoodOnTable } = UseButtonsContext();
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(foodReadOverlayRef.current, { opacity: 0 });

      if (finishedWaiterAnim) {
        const tl = gsap.timeline();

        tl.to(foodReadOverlayRef.current, {
          duration: 1,
          opacity: 1,
          pointerEvents: 'all',
          onComplete: () => {
            setFoodOnTable(true);
          },
        });

        tl.to(
          foodReadOverlayRef.current,
          {
            opacity: 0,
            pointerEvents: 'none',
            duration: 1,
            onComplete: () => {
              setFinishedWaiterAnim(false);
            },
          },
          3
        );
      }
    });

    return () => ctx.revert();
  }, [finishedWaiterAnim, setFinishedWaiterAnim, setFoodOnTable]);

  return (
    <div
      className='fixed pointer-events-none z-[999] top-0 left-0 right-0 bottom-0 bg-[#e4e3e6]'
      ref={foodReadOverlayRef}
    >
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className=' text-[4.8rem]'>
          Your meal will be ready in 15 minutes.
        </h1>
      </div>
    </div>
  );
};

export default FoodReadyOverlay;
