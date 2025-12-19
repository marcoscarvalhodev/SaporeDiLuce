import React from 'react';
import LoadingComponent from './LoadingComponent/LoadingComponent';
import CanvasContainer from './CanvasContainer';
import TextContent from './TextContent';
import EatingOverlay from './RestaurantOverlays/EatingOverlay';
import WaitressActionsOverlay from './RestaurantOverlays/WaitressActionsOverlay';
import FeaturesToggle from './FeaturesToggle';
import AudioChoice from './AudioManagement/AudioChoice';
import { UseLoadingContext } from './context/UseContexts';
import AudioController from './AudioManagement/AudioController';

const SceneComponent = () => {
  const { isLoading } = UseLoadingContext();

  return (
    <>
      <CanvasContainer />

      {!isLoading && (
        <>
          <AudioChoice />
          <AudioController />
          <TextContent />
          <EatingOverlay />
          <WaitressActionsOverlay />
          <FeaturesToggle />
        </>
      )}

      {isLoading && <LoadingComponent />}
    </>
  );
};

export default SceneComponent;
