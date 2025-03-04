import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { UseOrbitContext } from './context/UseContexts';
import gsap from 'gsap';

import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const OrbitManipulation = () => {
  const { camera } = useThree();
  const orbitRef = React.useRef<OrbitControlsImpl>(null);

  const { orbitExists } = UseOrbitContext();
  const initialOrbit = new THREE.Vector3(-20, 1.8, -2.12);

  React.useEffect(() => {
    const gui = new GUI();

    gui.addFolder('orbit');

    if (orbitRef.current) {
      gui.add(orbitRef.current.target, 'x', -50, 50);
      gui.add(orbitRef.current.target, 'y', -20, 20);
      gui.add(orbitRef.current.target, 'z', -20, 20);
    }
  });

  React.useEffect(() => {
    if (orbitRef.current && camera && orbitExists) {
      const tl = gsap.timeline();

      tl.to(
        orbitRef.current.target,
        {
          x: 7,
          y: 2.7,
          z: 0.8,
          ease: 'power1.out',
          duration: 3,
          onComplete: () => {
            if (orbitRef.current) {
              orbitRef.current.minPolarAngle = Math.PI / 6;
              orbitRef.current.maxPolarAngle = Math.PI / 1.5;

              orbitRef.current.minAzimuthAngle = -Infinity;
              orbitRef.current.maxAzimuthAngle = Infinity;

              orbitRef.current.update();
            }
          },
          onStart: () => {
            orbitRef.current?.update();
          },
        },
        0
      );
      orbitRef.current.update();
    } 
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enableDamping={true}
      minPolarAngle={Math.PI / 2.05}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={Math.PI / 2.05}
      maxAzimuthAngle={Math.PI / 1.9}
      dampingFactor={0.05}
      rotateSpeed={0.3}
      target={initialOrbit}
      enablePan={false}
      enableZoom={false}
    />
  );
};

export default OrbitManipulation;
