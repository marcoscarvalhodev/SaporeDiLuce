import React from 'react';
import GearSVG from './assets/gear.svg?react';
import { UseFeaturesToggleContext } from './context/UseContexts';
const FeaturesToggle = () => {
  const {
    setActiveBloom,
    setActiveReflections,
    activeBloom,
    activeReflections,
  } = UseFeaturesToggleContext();
  const [settingsActive, setSettingsActive] = React.useState(false);
  const parentWrapperRef = React.useRef<null | HTMLElement>(null);

  React.useEffect(() => {
    parentWrapperRef.current?.addEventListener(
      'click',
      (event: MouseEvent) => {
        if (event.target === parentWrapperRef.current) {
          setSettingsActive(false);
        }
      }
    );
  });

  return (
    <section
      ref={parentWrapperRef}
      className={`z-[9999] overflow-hidden fixed ${
        settingsActive
          ? 'w-full h-full bg-[#9c9b9b80] transition-all duration-[0.5s]'
          : 'w-max h-max '
      } right-0 flex flex-col`}
    >
      <GearSVG
        className='w-[5rem] h-[5rem] self-end mr-[1.6rem] hover:cursor-pointer stroke-amber-300 hover:-rotate-[360deg] duration-[1s] transition-all ease-linear'
        onClick={() => setSettingsActive(!settingsActive)}
      />

      <ul
        className={` flex flex-col gap-[2rem] items-center w-max absolute translate-[-50%] top-[50%] left-[50%] p-[5rem] ${
          settingsActive
            ? 'opacity-[100%] pointer-events-auto transition-all duration-[1s]'
            : 'opacity-0 pointer-events-none w-0 h-0'
        }`}
      >
        <li
          className='button_call w-max'
          onClick={() => setActiveReflections(!activeReflections)}
        >
          {activeReflections ? 'Disable reflections' : 'Enable reflections'}
        </li>

        <li
          className='button_call w-max'
          onClick={() => {
            setActiveBloom(!activeBloom);
          }}
        >
          {activeBloom ? 'Disable bloom' : 'Enable bloom'}
        </li>
      </ul>
    </section>
  );
};

export default FeaturesToggle;
