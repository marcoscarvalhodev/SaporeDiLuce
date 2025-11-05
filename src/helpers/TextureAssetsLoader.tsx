import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import React from 'react';


const TextureAssetsLoader = (texture_path: string) => {
  const useLoaderChannel = useLoader(TextureLoader, texture_path);
  
  

  React.useLayoutEffect(() => {
    useLoaderChannel.flipY = false;
    
  });

  return  useLoaderChannel;
};

export default TextureAssetsLoader;
