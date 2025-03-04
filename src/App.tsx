import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Restaurant } from './Restaurant';
import { Environment, PerspectiveCamera } from '@react-three/drei';

import { PerspectiveCamera as TypePerspectiveCamera } from 'three';


import OrbitManipulation from './OrbitManipulation';

function App() {
  const perspectiveRef = React.useRef<TypePerspectiveCamera | null>(null);

  React.useEffect(() => {
   /*
      setTimeout(() => {
        const gui = new GUI();

        gui.addFolder('camera');

        if (perspectiveRef.current) {
          gui.add(perspectiveRef.current.position, 'x', -20, 20);
          gui.add(perspectiveRef.current.position, 'y', -20, 20);
          gui.add(perspectiveRef.current.position, 'z', -20, 20);
          gui.add(perspectiveRef.current.rotation, 'x', -2, 2);
          gui.add(perspectiveRef.current.rotation, 'y', -2, 2);
          gui.add(perspectiveRef.current.rotation, 'z', -2, 2);
        }
      }, 2000);
    */
  });

  return (
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
      <Environment preset='forest' environmentIntensity={2} background/>
      <ambientLight intensity={1.5} color={'#ffffff'} />

      <Restaurant />
    </Canvas>
  );
}

export default App;
