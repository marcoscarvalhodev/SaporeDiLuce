import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { AudioEffects } from '../AudioManagement/AudioEffects';
import gsap from 'gsap';
import { UseAnimationsContext } from '../context/UseContexts';

const cameraPositions = {
  restaurant_enter: {
    position: new THREE.Vector3(6.5, 1.32, 2.7),
    target: new THREE.Vector3(5.7, 2.7, 0.6),
  },
  restaurant_leave: {
    position: new THREE.Vector3(15.08, 2.84, -2.54),
    target: new THREE.Vector3(-20, 1.8, -2.12),
  },
  dining_room_leave: {
    position: new THREE.Vector3(6.5, 1.32, 2.7),
    target: new THREE.Vector3(5.7, 2.7, 0.6),
  },
  dining_room_enter: {
    position: new THREE.Vector3(-2, 3, -6),
    target: new THREE.Vector3(-1.5, 2, -5),
  },
};

interface MoveCameraOrbitProps {
  params: {
    name:
      | 'restaurant_enter'
      | 'dining_room_enter'
      | 'restaurant_leave'
      | 'dining_room_leave'
      | null;
    doorSound: boolean;
    moveSound: boolean;
  };
}

const MoveCameraOrbit = (currentPosition: MoveCameraOrbitProps) => {
  const { camera } = useThree();
  const controlsRef = React.useRef<null | OrbitControlsImpl>(null);

  const [initalOrbit, setInitialOrbit] = React.useState(
    new THREE.Vector3(-20, 1.8, -2.12)
  );

  const initialCameraPosition = new THREE.Vector3(15.08, 2.84, -2.54);

  const { MovementAudio, DoorAudio } = AudioEffects();
  const { setDoorClose } = UseAnimationsContext();

  React.useEffect(() => {
    console.log(controlsRef.current);
  });

  const RestaurantOutsideMovement = React.useCallback(() => {
    if (controlsRef.current) {
      gsap.to(camera.position, {
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z,
        duration: 3,
        ease: 'power2.inOut',
      });

      gsap.fromTo(
        controlsRef.current,
        { minAzimuthAngle: -1, maxAzimuthAngle: 0 },
        {
          minAzimuthAngle: Math.PI / 2.05,
          maxAzimuthAngle: Math.PI / 1.9,
          duration: 1,
        }
      );

      gsap.to(controlsRef.current, {
        minPolarAngle: Math.PI / 2.05,
        maxPolarAngle: Math.PI / 2,
        rotateSpeed: 0.05,
        duration: 1,
        onComplete: () => {
          console.log(controlsRef.current);
          controlsRef.current?.update();
        },
      });

      gsap.to(controlsRef.current.target, {
        x: -20,
        y: 1.8,
        z: -2.12,
        duration: 3,
        ease: 'power2.inOut',
        onStart: () => {
          MovementAudio();
          controlsRef.current?.update();
          setDoorClose(false);
        },

        onComplete: () => {
          setDoorClose(true);
          DoorAudio();
        },
      });
    }
  }, [
    DoorAudio,
    setDoorClose,
    camera.position,
    initialCameraPosition.x,
    initialCameraPosition.y,
    initialCameraPosition.z,
    MovementAudio,
  ]);

  const RestaurantInsideMovement = React.useCallback(() => {
    if (currentPosition.params.name) {
      gsap.to(camera.position, {
        x: cameraPositions[currentPosition.params.name].position.x,
        y: cameraPositions[currentPosition.params.name].position.y,
        z: cameraPositions[currentPosition.params.name].position.z,
        duration: 3,
        ease: 'power2.inOut',
        onStart: () => {
          if (currentPosition.params.moveSound) {
            MovementAudio();
            setDoorClose(false);
          }
        },

        onComplete: () => {
          if (currentPosition.params.doorSound) {
            DoorAudio();
            setDoorClose(true);
          }
        },
      });

      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: cameraPositions[currentPosition.params.name].target.x,
          y: cameraPositions[currentPosition.params.name].target.y,
          z: cameraPositions[currentPosition.params.name].target.z,
          duration: 3,
          ease: 'power2.inOut',
          onStart: () => {
            if (controlsRef.current) {
              controlsRef.current.minPolarAngle = Math.PI / 6;
              controlsRef.current.maxPolarAngle = Math.PI / 1.5;
              controlsRef.current.rotateSpeed = 0.2;

              controlsRef.current.minAzimuthAngle = -Infinity;
              controlsRef.current.maxAzimuthAngle = Infinity;

              controlsRef.current.update();
            }
          },

          onComplete: () => {
            if (controlsRef.current) {
              console.log(controlsRef.current);
              setInitialOrbit(controlsRef.current.target);
            }
          },
        });
      }
    }
  }, [
    DoorAudio,
    MovementAudio,
    currentPosition.params.doorSound,
    camera.position,
    currentPosition.params.moveSound,
    currentPosition.params.name,
    setDoorClose,
  ]);

  React.useEffect(() => {
    if (!controlsRef.current) return;

    if (currentPosition.params.name === 'restaurant_leave') {
      RestaurantOutsideMovement();
    } else {
      RestaurantInsideMovement();
    }
  }, [
    RestaurantInsideMovement,
    RestaurantOutsideMovement,
    currentPosition.params.name,
  ]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      minPolarAngle={Math.PI / 2.05}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={Math.PI / 2.05}
      maxAzimuthAngle={Math.PI / 1.9}
      dampingFactor={0.05}
      rotateSpeed={0.05}
      target={initalOrbit}
      enablePan={false}
      enableZoom={false}
    />
  );
};

export default MoveCameraOrbit;
