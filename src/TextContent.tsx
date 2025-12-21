import React from 'react';
import MenuOverlay from './RestaurantOverlays/MenuOverlay';
import FoodReadyOverlay from './RestaurantOverlays/FoodReadyOverlay';

const TextContent = () => {

  return (
    <section className='fixed z-[999]'>
      <div>
        <MenuOverlay />
        <FoodReadyOverlay />
      </div>
    </section>
  );
};

export default TextContent;
