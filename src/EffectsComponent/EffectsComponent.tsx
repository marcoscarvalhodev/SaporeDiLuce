import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React from 'react';
import { UseFeaturesToggleContext } from '../context/UseContexts';

const EffectsComponent = () => {
  const { activeBloom } = UseFeaturesToggleContext();

  return (
    <EffectComposer>
      {activeBloom ? (
        <Bloom
          mipmapBlur
          luminanceSmoothing={1}
          luminanceThreshold={0.1}
          intensity={0.1}
        />
      ) : <></>}
    </EffectComposer>
  );
};

export default EffectsComponent;
