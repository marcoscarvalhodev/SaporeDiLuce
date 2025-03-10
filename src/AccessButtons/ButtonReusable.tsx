
import React, { Ref } from 'react';
import gsap from 'gsap';

interface ButtonReusableProps {
  goText: string;
  outText: string;
  enterEnvironment: boolean;
  onClick: () => void;
  ref: Ref<HTMLDivElement> | undefined;
  id: 'dinner_button' | 'restaurant_button';
}

const ButtonReusable = ({
  onClick,
  enterEnvironment,
  outText,
  goText,
  ref,
  id,
}: ButtonReusableProps) => {
  React.useEffect(() => {
    if (id !== 'restaurant_button') {
      gsap.to(`.${id}`, {
        opacity: 0,
        pointerEvents: 'none',
      });
    }
  }, [id]);

  return (
    <div className=' relative w-[40rem] left-[-20rem] top-[-2rem]'>
      <div className={`${id} accessButtons`} onClick={onClick} ref={ref}>
        <h1 className='accessButtonsText text-[2.8rem]'>
          {enterEnvironment ? outText : goText}
        </h1>
      </div>
    </div>
  );
};
export default ButtonReusable;
