import React from 'react';
import gsap from 'gsap';
import { UseAnimationsContext } from '../context/UseContexts';

const FoodReadyOverlay = () => {
  const foodReadOverlayRef = React.useRef<null | HTMLDivElement>(null);
  const { finishedWaiterAnim } = UseAnimationsContext();

  React.useEffect(() => {
    gsap.set(foodReadOverlayRef.current, { opacity: 0 });

    if (finishedWaiterAnim) {
      const tl = gsap.timeline();

      tl.to(foodReadOverlayRef.current, {
        duration: 1,
        opacity: 1,
        pointerEvents: 'all',
      });

      tl.to(
        foodReadOverlayRef.current,
        {
          opacity: 0,
          pointerEvents: 'none',
          duration: 1,
        },
        3
      );
    }
  });

  return (
    <div
      className='fixed pointer-events-none z-[999] top-0 left-0 right-0 bottom-0 bg-[#e4e3e6]'
      ref={foodReadOverlayRef}
    >
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className=' text-[4.8rem]'>
          Your meal will be ready in 15 minutes.
        </h1>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default FoodReadyOverlay;
