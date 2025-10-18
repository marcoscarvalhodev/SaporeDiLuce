import React from 'react';
import GearIcon from '../assets/knife_fork_gear.svg?react';
import './LoadingComponent.css';

const LoadingComponent = () => {
  return (
    <div className='fixed z-[99999] w-full h-full'>
      <GearIcon className='loading_gear absolute translate-[-50%] top-[50%] left-[50%] w-[10rem] h-[10rem]' />
    </div>
  );
};

export default LoadingComponent;
