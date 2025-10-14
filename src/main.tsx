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
import { ContextHumansProvider } from './context/HumansContext.tsx';
import WaitressActionsOverlay from './RestaurantOverlays/WaitressActionsOverlay.tsx';
import { ContextFoodProvider } from './context/FoodContext.tsx';
import FeaturesToggle from './FeaturesToggle.tsx';
import { ContextFeaturesToggleProvider } from './context/FeaturesToggleContext.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <ContextFeaturesToggleProvider>
      <FeaturesToggle />
      <ContextAudioChoiceProvider>
        <ContextCameraMovementProvider>
          <ContextButtonsProvider>
            <ContextOverlaysProvider>
              <ContextAnimationsProvider>
                <ContextHumansProvider>
                  <ContextFoodProvider>
                    <CanvasContainer />
                    <TextContent />
                    <AudioChoice />
                    <EatingOverlay />
                    <WaitressActionsOverlay />
                  </ContextFoodProvider>
                </ContextHumansProvider>
              </ContextAnimationsProvider>
            </ContextOverlaysProvider>
          </ContextButtonsProvider>
        </ContextCameraMovementProvider>
      </ContextAudioChoiceProvider>
    </ContextFeaturesToggleProvider>
  </>
);
