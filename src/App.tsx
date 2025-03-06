import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Restaurant } from './Restaurant';
import { Environment, PerspectiveCamera } from '@react-three/drei';

import { PerspectiveCamera as TypePerspectiveCamera } from 'three';
import { ContextAnimationsProvider } from './context/AnimationsContext';

import OrbitManipulation from './OrbitManipulation';
import MoveCamera from './MoveCamera';

function App() {
  const perspectiveRef = React.useRef<TypePerspectiveCamera | null>(null);

  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
        }}
        className='bg-[#000000]'
      >
        <PerspectiveCamera
          ref={perspectiveRef}
          makeDefault
          position={[15.08, 2.8435732169767913, -2.5378144324531187]}
          rotation={[-1.5772074309645465, 1.556, 1.5772077820156805]}
        />

        <OrbitManipulation />
        <Environment preset='forest' environmentIntensity={2} background />
        <ambientLight intensity={1.5} color={'#ffffff'} />

        <ContextAnimationsProvider>
          <Restaurant />
          <MoveCamera />
        </ContextAnimationsProvider>
      </Canvas>
    </>
  );
}

export default App;
