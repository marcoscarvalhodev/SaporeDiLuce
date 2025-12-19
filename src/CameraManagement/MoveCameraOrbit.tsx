import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import gsap from 'gsap';
import { UseAnimationsContext } from '../context/UseContexts';
import { roomNameProps } from '../context/CameraMovementContext';

const cameraPositions = {
  restaurant_enter: {
    position: new THREE.Vector3(6.5, 2.2, 1),
    target: new THREE.Vector3(6, 2.2, 0),
    limitRotation: false,
  },
  restaurant_leave: {
    position: new THREE.Vector3(15.08, 2.4, 2),
    target: new THREE.Vector3(-20, 2, -2.12),
    limitRotation: false,
  },
  dining_room_leave: {
    position: new THREE.Vector3(0, 2, -2),
    target: new THREE.Vector3(6, 2, 0),
    limitRotation: false,
  },
  dining_room_enter: {
    position: new THREE.Vector3(1, 2, -4),
    target: new THREE.Vector3(0.5, 2, -8),
    limitRotation: false,
  },
  table_counter_leave: {
    position: new THREE.Vector3(1, 2.2, -8),
    target: new THREE.Vector3(0.5, 2.2, -8),
    limitRotation: false,
  },
  check_table_1: {
    position: new THREE.Vector3(4, 1.8, -7.52),
    target: new THREE.Vector3(2.32, 1, -8.04),
    limitRotation: true,
    fromAzimuth: { min: Math.PI / -1.9, max: Math.PI / -2.1 },
    toAzimuth: { min: Math.PI / -1.9, max: Math.PI / -2.1 },
    setAzimuthalAngle: 1.5,
  },
  check_table_2: {
    position: new THREE.Vector3(4.76, 1.8, -6.56),
    target: new THREE.Vector3(3.76, 1.16, -5.08),
    limitRotation: true,
    fromAzimuth: { min: Math.PI / -0.98, max: Math.PI / -1.05 },
    toAzimuth: { min: Math.PI / -0.98, max: Math.PI / -1.05 },
    setAzimuthalAngle: 1.5,
  },
  check_table_3: {
    position: new THREE.Vector3(5, 1.8, -6.56),
    target: new THREE.Vector3(5.2, 0.84, -8.6),
    limitRotation: true,
    fromAzimuth: { min: Math.PI / -1.9, max: Math.PI / -2.2 },
    toAzimuth: { min: Math.PI / -1.9, max: Math.PI / -2.2 },
    setAzimuthalAngle: 1.5,
  },
  check_table_4: {
    position: new THREE.Vector3(7.3, 1.8, -4.8),
    target: new THREE.Vector3(6.56, 1.3, -4.8),
    limitRotation: true,
    fromAzimuth: { min: Math.PI / -1.5, max: Math.PI / -3 },
    toAzimuth: { min: Math.PI / 2.5, max: Math.PI / 1.5 },
    setAzimuthalAngle: 1.5,
  },
  check_table_5: {
    position: new THREE.Vector3(6, 1.16, -6.2),
    target: new THREE.Vector3(7, 1.16, -7.8),
    limitRotation: true,
    fromAzimuth: { min: Math.PI / -1.9, max: Math.PI / -2.2 },
    toAzimuth: { min: Math.PI / -1.9, max: Math.PI / -2.2 },
    setAzimuthalAngle: 1.5,
  },
  check_counter: {
    position: new THREE.Vector3(0.9, 1.88, -5.5),
    target: new THREE.Vector3(-0.58, 1.72, -5.5),
    limitRotation: true,
    fromAzimuth: { min: Math.PI / 4, max: Math.PI / 1.5 },
    toAzimuth: { min: Math.PI / 4, max: Math.PI / 1.5 },
    setAzimuthalAngle: 1.5,
  },
};

interface MoveCameraOrbitProps {
  params: {
    name: roomNameProps | null;
    doorSound: boolean;
    moveSound: boolean;
  };
}

interface CameraPropertiesProps {
  position: THREE.Vector3;
  target: THREE.Vector3;
  limitRotation: boolean;
  toAzimuth?: { min: number; max: number };
  fromAzimuth?: { min: number; max: number };
  setAzimuthalAngle?: number;
}

const MoveCameraOrbit = (currentPosition: MoveCameraOrbitProps) => {
  const { camera } = useThree();
  const controlsRef = React.useRef<null | OrbitControlsImpl>(null);

  const [initalOrbit, setInitialOrbit] = React.useState(
    new THREE.Vector3(-20, 1.8, -2.12)
  );

  const { setCameraMoving } = UseAnimationsContext();

  const initialCameraPosition = new THREE.Vector3(15.08, 2.84, -1);

  const limitRotationInit = React.useCallback(() => {
    if (currentPosition.params.name) {
      const cameraProperties: CameraPropertiesProps =
        cameraPositions[currentPosition.params.name];

      if (cameraProperties.limitRotation) {
        gsap.to(controlsRef.current, {
          minPolarAngle: Math.PI / 2.5,
          maxPolarAngle: Math.PI / 2.3,

          rotateSpeed: 0.2,
          duration: 1,
        });

        gsap.fromTo(
          controlsRef.current,
          {
            minAzimuthAngle: cameraProperties.fromAzimuth?.min,
            maxAzimuthAngle: cameraProperties.fromAzimuth?.max,
          },
          {
            minAzimuthAngle: cameraProperties.toAzimuth?.min,
            maxAzimuthAngle: cameraProperties.toAzimuth?.max,

            duration: 1,
          }
        );
      }
    }
  }, [currentPosition.params.name]);

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
          setCameraMoving(true);
        },
        onComplete: () => {
          setCameraMoving(false);
        },
      });
    }
  }, [
    setCameraMoving,
    camera.position,
    initialCameraPosition.x,
    initialCameraPosition.y,
    initialCameraPosition.z,
  ]);

  const RestaurantInsideMovement = React.useCallback(() => {
    if (currentPosition.params.name) {
      const tl = gsap.timeline();

      tl.to(
        camera.position,
        {
          x: cameraPositions[currentPosition.params.name].position.x,
          y: cameraPositions[currentPosition.params.name].position.y,
          z: cameraPositions[currentPosition.params.name].position.z,
          duration: 3,
          ease: 'power2.inOut',
          /* onStart: () => {
            if (currentPosition.params.moveSound) {
            }
          },*/

          onComplete: () => {
            if (currentPosition.params.doorSound) {
              controlsRef.current?.update();
            }
          },
        },
        0
      );

      if (currentPosition.params.name === 'dining_room_enter') {
        tl.to(
          camera.position,
          {
            duration: 1.7,
            z: -8,
            ease: 'power2.inOut',
          },
          2
        );
      } else if (currentPosition.params.name === 'dining_room_leave') {
        tl.to(
          camera.position,
          {
            duration: 1.7,
            z: 0.5,
            x: 6.5,
            ease: 'power2.inOut',
          },
          1.6
        );
      }

      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: cameraPositions[currentPosition.params.name].target.x,
          y: cameraPositions[currentPosition.params.name].target.y,
          z: cameraPositions[currentPosition.params.name].target.z,
          duration: 3,
          ease: 'power2.inOut',
          onStart: () => {
            setCameraMoving(true);

            if (controlsRef.current) {
              controlsRef.current.minPolarAngle = Math.PI / 6;
              controlsRef.current.maxPolarAngle = Math.PI / 1.5;
              controlsRef.current.rotateSpeed = 0.2;

              controlsRef.current.minAzimuthAngle = -Infinity;
              controlsRef.current.maxAzimuthAngle = Infinity;
            }
          },

          onComplete: () => {
            setCameraMoving(false);
            if (controlsRef.current) {
              setInitialOrbit(controlsRef.current.target);
              controlsRef.current.update();
            }
          },
        });
      }

      limitRotationInit();
    }
  }, [
    setCameraMoving,
    currentPosition.params.doorSound,
    camera.position,
    currentPosition.params.name,

    limitRotationInit,
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
