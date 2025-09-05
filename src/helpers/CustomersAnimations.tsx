import React from 'react';
import * as THREE from 'three';
import {
  UseHumansContext,
  UseCameraMovementContext,
} from '../context/UseContexts';
import { roomNameProps } from '../context/CameraMovementContext';
import { customerReviewProps } from '../context/CreateContexts';

interface reviewAnimProps {
  customerCam: THREE.AnimationAction | null;
  customerReview: THREE.AnimationAction | null;
}

interface CustomersAnimationProps {
  anim_action_init: (THREE.AnimationAction | null)[];
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
  anim_action_init,
  review_actions,
  table_id,
}: CustomersAnimationProps) => {
  const { customerReview } = UseHumansContext();
  const { roomNameState } = UseCameraMovementContext();

  const ReviewAnimStart = React.useCallback(
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

  const InitialAnim = React.useCallback(() => {
    if (anim_action_init) {
      anim_action_init.forEach((item) => {
        if (item) {
          item.stop();
          item.timeScale = 1;
          item.play();
        }
      });
    }
  }, [anim_action_init]);

  const ReviewToInitAnim = React.useCallback(() => {
    if (roomNameState === table_id) {
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
    } else if (roomNameState === 'dining_room_enter') {
      review_actions.forEach((item) => {
        const customer_review = item.action.customer_review;
        const customer_init = item.action.customer_init;
         const customer_cam = item.action.customer_cam;

        if (customer_review && customer_init && customer_cam) {
          
          
          customer_init.reset();
          customer_init.clampWhenFinished = false;
          customer_init.timeScale = 1;
          customer_init.play();
          customer_review.crossFadeTo(customer_init, 1, true)
          customer_cam.crossFadeTo(customer_init, 1, true);
        }
      });
    }
  }, [roomNameState, review_actions, table_id]);

  React.useEffect(() => {
    InitialAnim();
  }, [InitialAnim]);

  React.useEffect(() => {
    const matchedItem = review_actions.find(
      (item) => customerReview === item.customer_id
    );

    if (matchedItem) {
      ReviewAnimStart({
        customerCam: matchedItem.action.customer_cam,
        customerReview: matchedItem.action.customer_review,
      });
    }
  }, [customerReview, review_actions, ReviewAnimStart]);

  React.useEffect(() => {
    ReviewToInitAnim();
  }, [ReviewToInitAnim]);

  return null;
};

export default CustomersAnimations;
