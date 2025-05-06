import React from 'react';
import { UseOverlaysContext } from '../context/UseContexts';
import gsap from 'gsap';

const MenuOverlay = () => {
  const onlyRenderRef = React.useRef(false);

  const menuOverlayRef = React.useRef<HTMLDivElement | null>(null);

  const { menuOverlay } = UseOverlaysContext();

  React.useEffect(() => {
    gsap.set(menuOverlayRef.current, { opacity: 0 });

    if (!onlyRenderRef.current) {
      if (menuOverlay) {
        const tl = gsap.timeline();

        tl.to(
          menuOverlayRef.current,
          {
            opacity: 1,
            duration: 1,
          },
          0
        );

        tl.to(
          menuOverlayRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          3
        );

        onlyRenderRef.current = true;
      }
    }
  }, [menuOverlay]);

  return (
    <div
      className='fixed pointer-events-none z-[999] top-0 left-0 right-0 bottom-0'
      ref={menuOverlayRef}
    >
      <h1 className='absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] text-[4.8rem] text-[white]'>
        Pick a meal from our menu
      </h1>
    </div>
  );
};

export default MenuOverlay;
