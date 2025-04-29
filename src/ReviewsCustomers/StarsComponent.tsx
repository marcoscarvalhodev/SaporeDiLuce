import React from 'react';
import gsap from 'gsap';
const StarsComponent = ({ stars }: { stars: number }) => {
  const rectRef = React.useRef(null);
  const [rectWidth, setRectWidth] = React.useState(0);

  React.useEffect(() => {
    switch (stars) {
      case 4.5:
        setRectWidth(220);
        break;
      case 5:
        setRectWidth(250);
        break;
      default:
        console.error('no stars given');
    }

    gsap.to(rectRef.current, {
      width: rectWidth,
      duration: 4,
    });
  }, [rectWidth, stars]);

  return (
    <svg width='200' height='50' viewBox='0 0 400 100'>
      <defs>
        <mask id='star-mask'>
          <g
            fill='white'
            stroke='white'
            strokeWidth='5'
            strokeLinejoin='round'
          >
            <path d='M20,20 L25,35 L40,35 L30,45 L35,60 L20,50 L5,60 L10,45 L0,35 L15,35 Z' />
            <path d='M70,20 L75,35 L90,35 L80,45 L85,60 L70,50 L55,60 L60,45 L50,35 L65,35 Z' />
            <path d='M120,20 L125,35 L140,35 L130,45 L135,60 L120,50 L105,60 L110,45 L100,35 L115,35 Z' />
            <path d='M170,20 L175,35 L190,35 L180,45 L185,60 L170,50 L155,60 L160,45 L150,35 L165,35 Z' />
            <path d='M220,20 L225,35 L240,35 L230,45 L235,60 L220,50 L205,60 L210,45 L200,35 L215,35 Z' />
          </g>
        </mask>
      </defs>

      <g
        className='stars'
        fill='#b1b1b1'
        stroke='#b1b1b1'
        strokeWidth='5'
        strokeLinejoin='round'
      >
        <path d='M20,20 L25,35 L40,35 L30,45 L35,60 L20,50 L5,60 L10,45 L0,35 L15,35 Z' />
        <path d='M70,20 L75,35 L90,35 L80,45 L85,60 L70,50 L55,60 L60,45 L50,35 L65,35 Z' />
        <path d='M120,20 L125,35 L140,35 L130,45 L135,60 L120,50 L105,60 L110,45 L100,35 L115,35 Z' />
        <path d='M170,20 L175,35 L190,35 L180,45 L185,60 L170,50 L155,60 L160,45 L150,35 L165,35 Z' />
        <path d='M220,20 L225,35 L240,35 L230,45 L235,60 L220,50 L205,60 L210,45 L200,35 L215,35 Z' />
      </g>

      <rect
        ref={rectRef}
        className='yellow-overlay'
        x='0'
        y='0'
        width='0'
        height='100'
        fill='#FDCC0D'
        mask='url(#star-mask)'
      />
    </svg>
  );
};

export default StarsComponent;
