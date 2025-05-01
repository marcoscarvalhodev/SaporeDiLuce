import React from 'react';
import { Html } from '@react-three/drei';
const menuOptions = [
  {
    name: 'PASTA ALLO SCARPARIELLO',
    description:
      'Pasta tossed with fresh tomatoes, garlic, chili, and a sprinkle of Pecorino cheese.',
    price: '$ 32.00',
    option: 'menu_option_1',
  },
  {
    name: 'PACCHERI FREDDI TONNO E ZUCCHINE',
    description:
      'Chilled paccheri pasta tossed with tender tuna and fresh zucchini, drizzled with olive oil.',
    price: '$ 21.00',
    option: 'menu_option_2',
  },
  {
    name: 'PASTA ALLA GRICIA',
    description:
      'A simple yet delicious pasta dish with crispy guanciale, Pecorino cheese, and black pepper.',
    price: '$ 28.00',
    option: 'menu_option_3',
  },
  {
    name: 'GNOCCHI ALLA CREMA DI SCAMPI',
    description:
      'Soft potato gnocchi tossed in a creamy scampi sauce, featuring succulent shrimp and a hint of garlic.',
    price: '$ 30.00',
    option: 'menu_option_4',
  },
  {
    name: 'RISOTTO FUNGHI E ZAFFERANO',
    description:
      'Creamy risotto cooked with earthy mushrooms and infused with fragrant saffron.',
    price: '$ 29.00',
    option: 'menu_option_5',
  },
];

const RestaurantMenuOptions = ({ menu_option }: { menu_option: string }) => {
  return menuOptions.map(({ name, description, price, option }) =>
    option === menu_option ? (
      <Html position={[1.525, 1.092, -2.004]} key={option} style={{pointerEvents: 'none'}} >
        <div className='w-[30rem] bg-[rgba(255,255,255,0.75)] p-[2rem] flex flex-col gap-[1.2rem] rounded-[1rem] select-none pointer-events-none'>
          <p className='text-[2.4rem] text-[#BA1717]'>{name}</p>
          <p className='text-[2rem] text-[#333332]'>{description}</p>
          <p className='text-[2rem] text-[#333332]'>{price}</p>
        </div>
      </Html>
    ) : (
      <></>
    )
  );
};

export default RestaurantMenuOptions;
