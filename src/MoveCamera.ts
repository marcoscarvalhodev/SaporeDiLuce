import gsap from 'gsap';
import { Camera } from '@react-three/fiber';
import { UseOrbitContext } from './context/UseContexts';

const MoveCamera = (camera: Camera) => {
  const {setOrbitExists} = UseOrbitContext()

  const cameraForward = () => {
    const tl = gsap.timeline();
    tl.to(
      camera.position,
      {
        x: 7.7,
        z: 1.32,
        y: 2.7,
        ease: 'power1.out',
        duration: 3,
        onStart: () => {
          setOrbitExists(true)
        }
      },
      0
    )
  };

  return {
    cameraForward,
  };
};

export default MoveCamera;
