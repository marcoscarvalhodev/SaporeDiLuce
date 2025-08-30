
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import React from 'react';

const TextureAssetsLoader = (texture_path: string) => {
  const map_channel = useLoader(TextureLoader, texture_path);

  React.useLayoutEffect(() => {
    map_channel.flipY = false;
  })

  return map_channel;
};

export default TextureAssetsLoader;
