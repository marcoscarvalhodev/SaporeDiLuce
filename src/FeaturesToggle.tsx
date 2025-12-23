import React from 'react';
import KnifeForkGear from './assets/knife_fork_gear.svg?react';
import SoundIcon from './assets/sound_icon.svg?react';

import {
  UseAudioChoiceContext,
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
    setActiveShadows,
    activeReflections,
    activeAnimations,
    activeShadows,
  } = UseFeaturesToggleContext();
  const [settingsActive, setSettingsActive] = React.useState(false);
  const parentWrapperRef = React.useRef<null | HTMLElement>(null);
  const { roomNameState } = UseCameraMovementContext();
  const [hideIcons, setHideIcons] = React.useState(false);
  const { setAudioPlay, audioPlay } = UseAudioChoiceContext();

  const { volumeControl, setVolumeControl } = UseAudioChoiceContext();

  const [previousVolume, setPreviousVolume] = React.useState(75);
  const toggleMute = () => {
    if (volumeControl > 0) {
      setPreviousVolume(volumeControl);
      setVolumeControl(0);
    } else {
      setVolumeControl(previousVolume);
    }
  };

  React.useEffect(() => {
    if (!audioPlay) {
      setVolumeControl(0);
    } else {
      setVolumeControl(75);
    }
  }, [audioPlay, setVolumeControl]);

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
      setHideIcons(true);
    } else {
      setHideIcons(false);
    }
  }, [hideIcons, roomNameState]);

  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const updateVolume = (clientY: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const y = clientY - rect.top;
      const percentage = ((rect.height - y) / rect.height) * 100;
      const newValue = Math.round((percentage / 100) * 100);
      setVolumeControl(Math.max(0, Math.min(100, newValue)));
    };

    updateVolume(e.clientY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateVolume(moveEvent.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <section
      ref={parentWrapperRef}
      className={`z-[9999] fixed ${
        settingsActive
          ? 'w-full h-full bg-[#9c9b9b80] transition-all duration-[0.5s]'
          : 'w-max h-max '
      } right-0 flex flex-col`}
    >
      <ul
        className={`flex absolute right-0 items-start self-end mr-[1.6rem] mt-[1.6rem] gap-[1rem] ${
          hideIcons
            ? 'opacity-0 pointer-events-none transition-all duration-[0.7s]'
            : 'opacity-[100%] pointer-events-auto transition-all duration-[0.7s]'
        }`}
      >
        <li
          className={` ${
            volumeControl === 0
              ? 'sound_off'
              : volumeControl >= 1 && volumeControl < 65
              ? 'sound_mid'
              : 'sound_full'
          } icon_sound_wrapper p-[1rem] rounded-[5rem] mt-[0.2rem] hover:cursor-pointer flex flex-col items-center`}
          onClick={() => setAudioPlay(true)}
        >
          <SoundIcon
            className='icon_sound w-[4rem] h-[4rem] '
            onClick={() => toggleMute()}
          />

          <div className={` slider_wrapper flex justify-center relative`}>
            <div
              ref={sliderRef}
              className=' absolute w-[6rem] top-[1rem] h-[14rem]'
              onMouseDown={handleSliderMouseDown}
            />
            <input
              type='range'
              min='0'
              max='100'
              value={volumeControl}
              style={{
                background: `linear-gradient(to right, #e40b0b 0%, #e40b0b ${volumeControl}%, #ffffff83 ${volumeControl}%, #ffffff83 100%)`,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVolumeControl(Number(e.target.value))
              }
              className={` volume_range w-[14rem] h-[1rem] -rotate-90 absolute top-[7.5rem] appearance-none rounded-lg cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-6
    [&::-webkit-slider-thumb]:h-6
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[#e40b0b]
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-moz-range-thumb]:w-6
    [&::-moz-range-thumb]:h-6
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-[#e40b0b]
    [&::-moz-range-thumb]:border-0
    [&::-moz-range-thumb]:cursor-pointer`}
            />
          </div>
        </li>

        <li
          className='p-[1rem] hover:cursor-pointer hover:-rotate-[90deg] duration-[1s] transition-all ease-linear'
          onClick={() => setSettingsActive(!settingsActive)}
        >
          <KnifeForkGear
            className={`settings_gear w-[4.5rem] h-[4.5rem] ${
              !settingsActive ? 'fork_active' : 'knife_active'
            } `}
          />
        </li>
      </ul>

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
          onClick={() => setActiveShadows(!activeShadows)}
        >
          {activeShadows ? 'Disable shadows' : 'Enable shadows'}
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
