import React, { forwardRef } from 'react';
import gsap from 'gsap';

interface ButtonReusableProps {
  hideButton?: boolean;
  textSize: 'small' | 'large';
  orangeButtonClass?: string;
  goText: string;
  outText: string;
  enterEnvironment: boolean;
  onClick: () => void;
  delayButton?: number;
  color: 'black' | 'orange';
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
    | 'table_1_woman'
    | 'table_2_man'
    | 'table_2_woman'
    | 'table_2_boy'
    | 'table_3_man'
    | 'table_3_woman'
    | 'table_3_girl'
    | 'table_5_man'
    | 'table_5_woman'
    | 'eat_button'
    | 'waitress_button';
}

const ButtonReusable = forwardRef<HTMLDivElement, ButtonReusableProps>(
  (
    {
      onClick,
      enterEnvironment,
      outText,
      goText,
      id,
      textSize,
      color,
      hideButton,
      delayButton = 2,
    },
    ref
  ) => {
    const [buttonMessage, setButtonMessage] = React.useState(false);

    React.useEffect(() => {
      setTimeout(() => setButtonMessage(enterEnvironment), 1000);
    }, [setButtonMessage, enterEnvironment]);

    React.useLayoutEffect(() => {
      if (id !== 'restaurant_button') {
        gsap.to(`.${id}`, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0,
        });
      }
    }, [id]);

    const buttonDisappear = React.useCallback(() => {
      if (!hideButton) return;

      const tl = gsap.timeline();

      tl.to([`.${id}`], {
        opacity: 0,
        pointerEvents: 'none',
        duration: 1,
      }).to(`.${id}`, {
        opacity: 1,
        duration: 1,
        pointerEvents: 'all',
        delay: delayButton,
      });
    }, [hideButton, id, delayButton]);

    return (
      <div
        className={` ${
          textSize === 'small'
            ? 'w-[20rem] left-[-10rem]'
            : 'w-[40rem] left-[-20rem]'
        } relative top-[-2rem]`}
        onClick={() => {
          buttonDisappear();
        }}
      >
        <div
          className={`${id} ${
            color === 'black' ? 'bg-[#f0f8fac7]' : 'bg-[#f0af0cb2]'
          } accessButtons ${
            textSize === 'small' ? 'text_small' : 'text_large'
          } pointer-events-auto cursor-pointer`}
          onClick={onClick}
          ref={ref}
        >
          <h1
            className={`accessButtonsText text-[2.8rem] ${
              color === 'black' ? 'text-[#333332]' : 'text-[#333332]'
            }`}
          >
            {buttonMessage ? outText : goText}
          </h1>
        </div>
      </div>
    );
  }
);
export default ButtonReusable;
