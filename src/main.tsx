import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CanvasContainer from './CanvasContainer.tsx';
import { ContextCameraMovementProvider } from './context/CameraMovementContext.tsx';
import TextContent from './TextContent.tsx';
import AudioChoice from './AudioManagement/AudioChoice.tsx';
import { ContextAudioChoiceProvider } from './context/AudioChoiceContext.tsx';
import { ContextButtonsRoomProvider } from './context/ButtonsRoomContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextAudioChoiceProvider>
      <ContextCameraMovementProvider>
        <ContextButtonsRoomProvider>
          <CanvasContainer />
          <TextContent />
          <AudioChoice />
        </ContextButtonsRoomProvider>
      </ContextCameraMovementProvider>
    </ContextAudioChoiceProvider>
  </StrictMode>
);
