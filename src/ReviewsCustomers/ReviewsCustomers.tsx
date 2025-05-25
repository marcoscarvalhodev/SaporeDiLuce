import React from 'react';
import { customerReviewProps } from '../context/CreateContexts';
import { Html } from '@react-three/drei';
import { UseHumansContext } from '../context/UseContexts';

import './ReviewsCustomers.css';
import TypewriterText from './TypewriterText';
import StarsComponent from './StarsComponent';

type customerReviews = {
  name: string;
  message: string;
  customer_id: customerReviewProps;
  stars: number;
  position: [x: number, y: number, z: number];
}[];

const listCustomerReviews: customerReviews = [
  {
    name: 'Bryan',
    message:
      "The food here tastes really delicious. I'd love to try it again soon",
    stars: 5,
    customer_id: 'man_table_1',
    position: [1.825, 1.092, -8.804],
  },
  {
    name: 'Joanne',
    message:
      'Even though the garlic flavor was slightly strong, the gnocchi had a lovely texture, and I loved it',
    stars: 4.5,
    customer_id: 'woman_table_1',
    position: [1.825, 1.092, -8.004],
  },
];

const ReviewsCustomers = () => {
  const { customerReview } = UseHumansContext();

  return listCustomerReviews.map(
    ({ name, message, stars, customer_id, position }) =>
      customer_id === customerReview ? (
        <mesh position={position} key={customer_id}>
          <Html>
            <div className='dialogue_wrapper'>
              <p className='text-[2.4rem] text-[#333332]'>{name}</p>
              <TypewriterText fullMessage={message} />
              <div>
                <StarsComponent stars={stars} />
              </div>
            </div>
          </Html>
        </mesh>
      ) : (
        <mesh key={customer_id}></mesh>
      )
  );
};

export default ReviewsCustomers;
