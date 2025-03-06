import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import { UseAnimationsContext, UseOrbitContext } from './context/UseContexts';
import React from 'react';
import { AudioEffects } from './AudioEffects';

function MoveCamera() {
  const { setOrbitExists } = UseOrbitContext();
  const { setDoorClose } = UseAnimationsContext();

  const { camera } = useThree();

  const { DoorAudio } = AudioEffects();

  const { startButtonRef } = UseOrbitContext();

  React.useEffect(() => {
    const buttonEnter = startButtonRef.current;

    const moveCameraForward = () => {
      

      const tl = gsap.timeline();
      tl.to(
        camera.position,
        {
          x: 6.5,
          z: 1.32,
          y: 2.7,
          ease: 'power1.out',
          duration: 3,
          onComplete: () => {
            setDoorClose(true);
            DoorAudio();
          },
          onStart: () => {
            setOrbitExists(true);
          },
        },
        0
      );
    };

    if (buttonEnter) {
      buttonEnter.addEventListener('click', moveCameraForward);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (buttonEnter) {
        buttonEnter.removeEventListener('click', moveCameraForward);
      }
    };
  }, [startButtonRef, camera, setDoorClose, setOrbitExists, DoorAudio]);

  return <></>;
}

export default MoveCamera;
