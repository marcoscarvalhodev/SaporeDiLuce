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

  {
    name: 'Robert',
    message: 'The gnocchi is really nice, you should try it',
    stars: 4.5,
    customer_id: 'man_table_2',
    position: [5.357, 1.233, -5.302],
  },
  {
    name: 'Michelle',
    message: 'I send my congrats to the chef for this magnificent food',
    stars: 5,
    customer_id: 'woman_table_2',
    position: [2.957, 1.233, -5.302],
  },
  {
    name: 'Josh',
    message:
      'Actually I wanted a hamburger, but I am satisfied with the spaghetti',
    stars: 3.5,
    customer_id: 'boy_table_2',
    position: [4.057, 2.2, -4.002],
  },
  {
    name: 'Lisa',
    message: "This food here is so yummy, it's really, really perfect and makes me so happy",
    stars: 5,
    customer_id: 'girl_table_3',
    position: [5.016, 1.75, -8.6],
  },
  {
    name: 'Paul',
    message:
      "The food reminded me of my grandma's, some memories were unlocked here today",
    stars: 5,
    customer_id: 'man_table_3',
    position: [5.016, 1.7, -9.5],
  },
  {name: "Christine", message: "Definitely a 5-star meal, never had anything like it before", stars: 5, customer_id: "woman_table_3", position: [5.016, 1.7, -9.31]}
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
