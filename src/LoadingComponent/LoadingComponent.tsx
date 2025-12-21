import React from 'react';
import GearIcon from '../assets/knife_fork_gear.svg?react';
import './LoadingComponent.css';
import { useProgress } from '@react-three/drei';

const LoadingComponent = () => {
  const { progress } = useProgress();
  return (
    <div className='fixed z-[99999] w-full h-full'>
      <div className='absolute translate-[-50%] top-[50%] left-[50%] flex flex-col items-center gap-[2rem] '>
        <GearIcon className='loading_gear  w-[10rem] h-[10rem]' />
        <div className='w-[20rem] h-[1rem] bg-[#ffffff] rounded-[6rem]'>
          {' '}
          <div
            className={`h-[100%] bg-[#e40b0b] rounded-[6rem] transition-all duration-300 ease-in-out `}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
