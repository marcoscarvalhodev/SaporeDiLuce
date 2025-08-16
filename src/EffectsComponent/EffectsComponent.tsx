import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React from 'react';

const EffectsComponent = () => {
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        luminanceSmoothing={1}
        luminanceThreshold={0.1}
        intensity={0.1}
      />
    </EffectComposer>
  );
};

export default EffectsComponent;