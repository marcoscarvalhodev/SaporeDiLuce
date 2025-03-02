import { Canvas } from '@react-three/fiber';
import React from 'react';
import TestMesh from './TestMesh';
import Floor from './Floor';
import { Environment, OrbitControls } from '@react-three/drei';

function App() {
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
      <OrbitControls dampingFactor={0.5}/>
      <Environment preset="forest" environmentIntensity={2}/>
      <ambientLight intensity={1.5} color={"#ffffff"}/>

      <Floor />
      <TestMesh />

    </Canvas>
  );
}

export default App;
