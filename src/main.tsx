import { createRoot } from 'react-dom/client';
import './index.css';
import { ContextCameraMovementProvider } from './context/CameraMovementContext.tsx';
import { ContextAudioChoiceProvider } from './context/AudioChoiceContext.tsx';
import { ContextButtonsProvider } from './context/ButtonsContext.tsx';
import { ContextOverlaysProvider } from './context/OverlaysContext.tsx';
import { ContextAnimationsProvider } from './context/AnimationsContext.tsx';
import { ContextHumansProvider } from './context/HumansContext.tsx';
import { ContextFoodProvider } from './context/FoodContext.tsx';
import { ContextFeaturesToggleProvider } from './context/FeaturesToggleContext.tsx';
import { ContextLoadingProvider } from './context/LoadingContext.tsx';
import SceneComponent from './SceneComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <ContextLoadingProvider>
      <ContextFeaturesToggleProvider>
        <ContextButtonsProvider>
          <ContextAudioChoiceProvider>
            <ContextCameraMovementProvider>
              <ContextOverlaysProvider>
                <ContextAnimationsProvider>
                  <ContextHumansProvider>
                    <ContextFoodProvider>
                      <SceneComponent />
                    </ContextFoodProvider>
                  </ContextHumansProvider>
                </ContextAnimationsProvider>
              </ContextOverlaysProvider>
            </ContextCameraMovementProvider>
          </ContextAudioChoiceProvider>
        </ContextButtonsProvider>
      </ContextFeaturesToggleProvider>
    </ContextLoadingProvider>
  </>
);
