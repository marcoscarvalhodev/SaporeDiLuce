import React from 'react';
import gsap from 'gsap';
import {
  UseCameraMovementContext,
  UseFoodContext,
  UseHumansContext,
} from '../context/UseContexts';

const WaitressActionsOverlay = () => {
  const refWaitressTransition = React.useRef<HTMLDivElement | null>(null);
  const {
    waitressShowTable,
    setWaitressShowTable,
    setWaitressTalkTable,
    waitressTalkTable,
  } = UseHumansContext();
  const { setRoomNameState } = UseCameraMovementContext();
  const { foodOrdered } = UseFoodContext();

  React.useEffect(() => {
    const tl = gsap.timeline();
    if (waitressShowTable || waitressTalkTable) {
      tl.to(refWaitressTransition.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.7,
        delay: 4.5,
        onComplete: () => {
          if (waitressShowTable) {
            setRoomNameState('check_table_4');
          }

          if (waitressTalkTable) {
            setWaitressTalkTable(false);
          }
        },
      }).to(refWaitressTransition.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
        delay: 3,
        onStart: () => {
          if (waitressShowTable) {
            setWaitressTalkTable(true);
            setWaitressShowTable(false);
          }
        },
      });
    }
  }, [
    waitressShowTable,
    setRoomNameState,
    setWaitressShowTable,
    setWaitressTalkTable,
    waitressTalkTable,
    foodOrdered,
  ]);
  return (
    <div
      ref={refWaitressTransition}
      className='eating_overlay opacity-[0] pointer-events-none bg-[#333332] fixed top-0 left-0 bottom-0 right-0 z-[9999]'
    ></div>
  );
};

export default WaitressActionsOverlay;
