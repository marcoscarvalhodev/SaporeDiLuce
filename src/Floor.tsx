import { MeshReflectorMaterial } from '@react-three/drei';
import React from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const Floor = () => {
  const floorRef = React.useRef<null | Mesh>(null);

  

  React.useEffect(() => {
    if (floorRef.current) {
      floorRef.current.position.z = -2;
      floorRef.current.rotation.x = -Math.PI / 2;


      const gui = new GUI();

      gui.addFolder("reflector");

      const material = floorRef.current.material;


    
        gui.add(material, 'mixBlur', -2, 2)
        gui.add(material, 'mirror', -2, 2)
        gui.add(material, 'mixContrast', -2, 2)
        gui.add(material, 'distortion', -2, 2)
      
    }
  });

  return (
    <mesh ref={floorRef}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
      color={new THREE.Color("#5c3225")}
        blur={[512, 512]}
        mixBlur={0}
        mixStrength={1}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        distortion={1}
        reflectorOffset={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Floor;
