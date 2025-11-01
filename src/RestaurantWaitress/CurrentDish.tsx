import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

type dishTypes =
  | 'dish_0'
  | 'dish_1'
  | 'dish_2'
  | 'dish_3'
  | 'dish_4'
  | 'dish_5';


const CurrentDish = (
  dishes: THREE.Group | null,
  menuOptionsClick: dishTypes,
  showEatButton: boolean
) => {
  useFrame(() => {
    const dishesWrapper = [
      'dish_0',
      'dish_1',
      'dish_2',
      'dish_3',
      'dish_4',
      'dish_5',
    ];
    if (showEatButton) {
      dishes?.children.forEach((item) => {
        if (dishesWrapper.includes(item.name)) {
          if (item.name !== menuOptionsClick) {
            item.scale.set(0, 0, 0);
          } else {
            item.scale.set(1, 1, 1);
          }
        }
      });
    } else {
      dishes?.children.forEach((item) => {
        if (dishesWrapper.includes(item.name)) {
          if (item.name !== 'dish_0') {
            item.scale.set(0, 0, 0);
          } else {
            item.frustumCulled = false;
            item.scale.set(1, 1, 1);
          }
        }
      });
    }
  });

  return null;
};

export default CurrentDish;
