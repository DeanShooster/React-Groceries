export enum ReducerActionTypes {
  INITIALIZATION = "INIT",
}

export function GroceriesReducer(state: any, action: any) {
  switch (action.type) {
    case ReducerActionTypes.INITIALIZATION: {
      const { storeList, shoppingList } = action.payload;
      return { ...state, storeList, shoppingList };
    }

    default:
      return state;
  }
}
