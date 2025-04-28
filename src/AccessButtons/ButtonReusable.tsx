import React, { forwardRef } from 'react';
import gsap from 'gsap';

interface ButtonReusableProps {
  textSize: 'small' | 'large';
  goText: string;
  outText: string;
  enterEnvironment: boolean;
  onClick: () => void;
  id:
    | 'dinner_button'
    | 'restaurant_button'
    | 'table_1_button'
    | 'table_2_button'
    | 'table_3_button'
    | 'table_4_button'
    | 'table_5_button'
    | 'counter_button'
    | 'menu_button'
    | 'table_1_man'
    | 'table_1_woman';
}

const ButtonReusable = forwardRef<HTMLDivElement, ButtonReusableProps>(
  ({ onClick, enterEnvironment, outText, goText, id, textSize }, ref) => {

    React.useEffect(() => {
      if (id !== 'restaurant_button') {
        gsap.to(`.${id}`, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0,
        });
      }
    }, [id]);

    return (
      <div
        className={`${
          textSize === 'small'
            ? 'w-[20rem] left-[-10rem]'
            : 'w-[40rem] left-[-20rem]'
        } relative top-[-2rem]`}
      >
        <div
          className={`${id} accessButtons ${
            textSize === 'small' ? 'text_small' : 'text_large'
          } pointer-events-auto cursor-pointer`}
          onClick={onClick}
          ref={ref}
        >
          <h1
            className={`accessButtonsText text-[2.8rem]`}
          >
            {enterEnvironment ? outText : goText}
          </h1>
        </div>
      </div>
    );
  }
);
export default ButtonReusable;
