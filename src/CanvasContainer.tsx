import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Restaurant } from './ModelsManagement/Restaurant';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import MoveCameraOrbit from './CameraManagement/MoveCameraOrbit';
import gsap from 'gsap';

import { PerspectiveCamera as TypePerspectiveCamera } from 'three';

import { AccessButtons } from './AccessButtons/AccessButtons';
import { UseCameraMovementContext } from './context/UseContexts';
import { RestaurantMenu } from './RestaurantMenu/RestaurantMenu';
import { RestaurantDishes } from './ModelsManagement/RestaurantDishes';
import TableCustomersMain from './TableCustomers/TableCustomersMain';
import ReviewsCustomers from './ReviewsCustomers/ReviewsCustomers';
import { Waitress } from './RestaurantWaitress/Waitress';
import { NotepadPen } from './RestaurantWaitress/NotepadPen';
import WaitressDialogue from './RestaurantWaitress/WaitressDialogue';

function CanvasContainer() {
  const perspectiveRef = React.useRef<TypePerspectiveCamera | null>(null);
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);

  const { roomNameState, refCanvasUpdated } = UseCameraMovementContext();

  React.useEffect(() => {
    refCanvasUpdated.current = canvasRef.current;
  }, [refCanvasUpdated]);

  return (
    <>
      <Canvas
        id='canvas-component'
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
        onPointerDown={() => {
          gsap.to(canvasRef.current, {
            cursor: 'grabbing',
          });
        }}
        onPointerUp={() => {
          gsap.to(canvasRef.current, {
            cursor: 'grab',
          });
        }}
      >
        <PerspectiveCamera
          fov={50}
          near={0.1}
          far={1000}
          ref={perspectiveRef}
          makeDefault
          position={[15.08, 2.84, -2.54]}
        />

        <Environment
          files={'./environment.hdr'}
          environmentIntensity={0.8}
          background
        />

        {<AccessButtons />}

        <ReviewsCustomers />
        <WaitressDialogue />
        <TableCustomersMain />
        <RestaurantMenu />
        <RestaurantDishes />

        <NotepadPen />
        <Waitress />
        <MoveCameraOrbit
          params={{
            name: roomNameState,
            doorSound: roomNameState === 'restaurant_enter' ? true : false,
            moveSound: true,
          }}
        />
        <Restaurant />
      </Canvas>
    </>
  );
}

export default CanvasContainer;
