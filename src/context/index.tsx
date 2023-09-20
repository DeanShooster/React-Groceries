import { createContext, useEffect, useReducer } from "react";
import { GetCartStore } from "../API/app";
import { GroceriesReducer, ReducerActionTypes } from "../reducers/groceriesReducer";

interface IGroceriesContext {
  groceries: {
    shoppingList: IStoreItem[];
    storeList: IStoreItem[];
  };
  dispatchGroceries: Function;
}

export interface IStoreItem {
  categoryName: string;
  items: IItem[];
}

export interface IItem {
  image: string;
  name: string;
}

export const GroceriesContext = createContext<IGroceriesContext>({
  groceries: {
    shoppingList: [],
    storeList: [],
  },
  dispatchGroceries: () => {},
});

type Props = { children: React.ReactNode };

export const GroceriesContextProvider = ({ children }: Props) => {
  const [groceries, dispatchGroceries]: any = useReducer(GroceriesReducer, undefined);

  useEffect(() => {
    (async () => {
      const data = await GetCartStore();
      if (data.error) return;
      dispatchGroceries({ type: ReducerActionTypes.INITIALIZATION, payload: data });
    })();
  }, []);

  return <GroceriesContext.Provider value={{ groceries, dispatchGroceries }}>{children}</GroceriesContext.Provider>;
};
