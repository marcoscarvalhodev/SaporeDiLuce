export enum roomName {
  'RESTAURANT_ENTER' = 'RESTAURANT_ENTER',
  'DINING_AREA_ENTER' = 'DINING_AREA_ENTER',
}

export interface actionRoom {
  type: roomName;
  payload: boolean;
}

export interface buttonsReducerState {
  restaurantEnter: boolean;
  diningAreaEnter: boolean;
}

export function buttonsReducer(state: buttonsReducerState, action: actionRoom) {
  const { type, payload } = action;
  switch (type) {
    case roomName.DINING_AREA_ENTER:
      return { ...state, diningAreaEnter: payload };
      break;
    case roomName.RESTAURANT_ENTER:
      return { ...state, restaurantEnter: payload };
      break;
    default:
      return state;
  }
}
