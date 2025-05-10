import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CanvasContainer from './CanvasContainer.tsx';
import { ContextCameraMovementProvider } from './context/CameraMovementContext.tsx';
import TextContent from './TextContent.tsx';
import AudioChoice from './AudioManagement/AudioChoice.tsx';
import { ContextAudioChoiceProvider } from './context/AudioChoiceContext.tsx';
import { ContextButtonsProvider } from './context/ButtonsContext.tsx';
import { ContextOverlaysProvider } from './context/OverlaysContext.tsx';
import { ContextAnimationsProvider } from './context/AnimationsContext.tsx';
import EatingOverlay from './RestaurantOverlays/EatingOverlay.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextAudioChoiceProvider>
      <ContextCameraMovementProvider>
        <ContextButtonsProvider>
          <ContextOverlaysProvider>
            <ContextAnimationsProvider>
              <CanvasContainer />
              <TextContent />
              <AudioChoice />
              <EatingOverlay />
            </ContextAnimationsProvider>
          </ContextOverlaysProvider>
        </ContextButtonsProvider>
      </ContextCameraMovementProvider>
    </ContextAudioChoiceProvider>
  </StrictMode>
);
