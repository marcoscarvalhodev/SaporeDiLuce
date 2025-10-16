import React from 'react';
import * as THREE from 'three';
import {
  UseHumansContext,
  UseCameraMovementContext,
  UseFeaturesToggleContext,
} from '../context/UseContexts';
import { roomNameProps } from '../context/CameraMovementContext';
import { customerReviewProps } from '../context/CreateContexts';

interface reviewAnimProps {
  customerCam: THREE.AnimationAction | null;
  customerReview: THREE.AnimationAction | null;
}

interface CustomersAnimationProps {
  actions: { [x: string]: THREE.AnimationAction | null };
  customerAnimationsReady: boolean;
  review_actions: {
    action: {
      customer_cam: THREE.AnimationAction | null;
      customer_review: THREE.AnimationAction | null;
      customer_init: THREE.AnimationAction | null;
    };
    customer_id: customerReviewProps;
  }[];
  table_id: roomNameProps;
}

const CustomersAnimations = ({
  customerAnimationsReady,
  review_actions,
  table_id,
  actions,
}: CustomersAnimationProps) => {
  const { customerReview } = UseHumansContext();
  const { roomNameState } = UseCameraMovementContext();
  const { activeAnimations } = UseFeaturesToggleContext();

  const ReviewAnim = React.useCallback(
    ({ customerCam, customerReview }: reviewAnimProps) => {
      if (customerCam && customerReview) {
        customerCam?.crossFadeTo(customerReview, 0.3, true);
        customerReview.reset();
        customerReview.timeScale = 1;
        customerReview.repetitions = 1;
        customerReview.clampWhenFinished = true;
        customerReview.play();
      }
    },
    []
  );

  const InitReviewAnim = React.useCallback(() => {
    const matchedItem = review_actions.find(
      (item) => customerReview === item.customer_id
    );

    if (matchedItem) {
      ReviewAnim({
        customerCam: matchedItem.action.customer_cam,
        customerReview: matchedItem.action.customer_review,
      });
    }
  }, [ReviewAnim, customerReview, review_actions]);

  const InitToCamAnim = React.useCallback(() => {
    switch (roomNameState) {
      case table_id:
        {
          setTimeout(() => {
            review_actions.forEach((item) => {
              const customer_cam = item.action.customer_cam;
              const customer_init = item.action.customer_init;

              if (customer_cam && customer_init) {
                customer_cam.reset();
                customer_cam.clampWhenFinished = true;
                customer_cam.repetitions = 1;
                customer_cam.timeScale = 1;
                customer_cam.play();
                customer_init.crossFadeTo(customer_cam, 1, true);
              }
            });
          }, 2000);
        }
        break;
      case 'dining_room_enter':
        {
          review_actions.forEach((item) => {
            const customer_review = item.action.customer_review;
            const customer_init = item.action.customer_init;
            const customer_cam = item.action.customer_cam;

            if (customer_review && customer_init && customer_cam) {
              customer_init.reset();
              customer_init.clampWhenFinished = false;
              customer_init.timeScale = 1;
              customer_init.play();
              customer_review.crossFadeTo(customer_init, 1, true);
              customer_cam.crossFadeTo(customer_init, 1, true);
            }
          });
        }
        break;
      default: {
        review_actions.forEach((item) => {
          const customer_init = item.action.customer_init;
          if (customer_init) {
            item.action.customer_cam?.stop();
            item.action.customer_review?.stop();

            customer_init.reset();
            customer_init.clampWhenFinished = false;
            customer_init.timeScale = 1;
            customer_init.play();
          }
        });
      }
    }
  }, [roomNameState, review_actions, table_id]);

  React.useEffect(() => {
    const animActions = Object.keys(actions)
      .filter((item) => item.includes('anim_1'))
      .map((key) => actions[key]);

    if (activeAnimations) {
      animActions.forEach((item) => {
        if(item) item.paused = false;
      });
    } else {
      animActions.forEach((item) => {
        if (item) item.paused = true;
      });
    }
  }, [actions, activeAnimations]);

  React.useEffect(() => {
    actions['blink_eyes']?.play();
  }, [actions]);

  React.useEffect(() => {
    if (!customerAnimationsReady) return;

    if (activeAnimations) InitToCamAnim();
  }, [InitToCamAnim, customerAnimationsReady, activeAnimations]);

  React.useEffect(() => {
    if (activeAnimations) InitReviewAnim();
  }, [InitReviewAnim, activeAnimations]);

  return null;
};

export default CustomersAnimations;
