import React from 'react';
import KnifeForkGear from './assets/knife_fork_gear.svg?react';

import {
  UseCameraMovementContext,
  UseFeaturesToggleContext,
} from './context/UseContexts';

import './FeatureToggle.css';

const FeaturesToggle = () => {
  const {
    setActiveBloom,
    setActiveReflections,
    setActiveAnimations,
    activeBloom,
    activeReflections,
    activeAnimations,
  } = UseFeaturesToggleContext();
  const [settingsActive, setSettingsActive] = React.useState(false);
  const parentWrapperRef = React.useRef<null | HTMLElement>(null);
  const { roomNameState } = UseCameraMovementContext();
  const [hideGear, setHideGear] = React.useState(false);

  React.useEffect(() => {
    parentWrapperRef.current?.addEventListener('click', (event: MouseEvent) => {
      if (event.target === parentWrapperRef.current) {
        setSettingsActive(false);
      }
    });
  }, []);

  React.useEffect(() => {
    if (
      roomNameState &&
      [
        'check_table_1',
        'check_table_2',
        'check_table_3',
        'check_table_4',
        'check_table_5',
      ].includes(roomNameState)
    ) {
      setHideGear(true);
    } else {
      setHideGear(false);
    }
  }, [hideGear, roomNameState]);

  return (
    <section
      ref={parentWrapperRef}
      className={`z-[9999] fixed ${
        settingsActive
          ? 'w-full h-full bg-[#9c9b9b80] transition-all duration-[0.5s]'
          : 'w-max h-max '
      } right-0 flex flex-col`}
    >
      <KnifeForkGear
        className={`settings_gear w-[7rem] h-[7rem] self-end mr-[1.6rem] mt-[1.6rem] hover:cursor-pointer hover:-rotate-[90deg] duration-[1s] transition-all ease-linear absolute right-0 ${
          hideGear
            ? 'opacity-0 pointer-events-none transition-all duration-[0.7s]'
            : 'opacity-[100%] pointer-events-auto transition-all duration-[0.7s]'
        } ${!settingsActive ? 'fork_active' : 'knife_active'} `}
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
          onClick={() => {
            setActiveAnimations(!activeAnimations);
          }}
        >
          {activeAnimations ? 'Disable animations' : 'Enable animations'}
        </li>
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
