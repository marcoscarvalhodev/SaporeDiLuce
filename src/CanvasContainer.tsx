import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import React from 'react';
import { Restaurant } from './ModelsManagement/Restaurant';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import MoveCameraOrbit from './CameraManagement/MoveCameraOrbit';

import { PerspectiveCamera as TypePerspectiveCamera } from 'three';
import { ContextAnimationsProvider } from './context/AnimationsContext';

import { AccessButtons } from './AccessButtons/AccessButtons';
import { UseCameraMovementContext } from './context/UseContexts';
import { RestaurantCounter } from './ModelsManagement/RestaurantCounter';

function CanvasContainer() {
  const perspectiveRef = React.useRef<TypePerspectiveCamera | null>(null);
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);

  const { roomNameState } = UseCameraMovementContext();

  return (
    <>
      <Canvas
        onMouseDown={() => {
          gsap.to(canvasRef.current, {
            cursor: 'grabbing',
          });
        }}
        onMouseUp={() => {
          gsap.to(canvasRef.current, {
            cursor: 'grab',
          });
        }}
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          cursor: 'grab',
        }}
        className='bg-[#000000]'
      >
        <PerspectiveCamera
          ref={perspectiveRef}
          makeDefault
          position={[15.08, 2.84, -2.54]}
          rotation={[-1.5772074309645465, 1.556, 1.5772077820156805]}
        />

        <Environment  preset="city" environmentIntensity={1} background />
        

        {<AccessButtons />}

        <ContextAnimationsProvider>
          <MoveCameraOrbit
            params={{
              name: roomNameState,
              doorSound: roomNameState === 'restaurant_enter' ? true : false,
              moveSound: true,
            }}
          />
        <Restaurant />
        <RestaurantCounter />
        </ContextAnimationsProvider>
      </Canvas>
    </>
  );
}

export default CanvasContainer;
