import { useContext, useEffect, useState } from "react";
import { GroceriesContext, IItem, IStoreItem } from "../../context";
import { ReducerActionTypes } from "../../reducers/groceriesReducer";
import { AddItemToCart, RemoveItemFromCart } from "../../API/app";

import "./index.scss";
import { ErrorModal } from "../ErrorModal";

interface IListItems {
  isStore: boolean;
}
export const ListItems = ({ isStore }: IListItems) => {
  const { groceries, dispatchGroceries } = useContext(GroceriesContext);
  const [list, setList] = useState<IStoreItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (groceries) setList(isStore ? groceries.filteredStoreList : groceries.filteredShoppingList);
  }, [isStore, groceries]);

  const itemSelectedHandler = async (categoryName: string, itemName: string, itemImage: string) => {
    if (isStore) {
      const result = await AddItemToCart(itemName);
      if (result.Error) setErrorMsg("קרתה תקלה!");
      else {
        setErrorMsg(null);
        dispatchGroceries({ type: ReducerActionTypes.ADD_ITEM, payload: { categoryName, itemName, itemImage } });
      }
    } else {
      const result = await RemoveItemFromCart(itemName);
      if (result.Error) setErrorMsg("קרתה תקלה!");
      else {
        setErrorMsg(null);
        dispatchGroceries({ type: ReducerActionTypes.REMOVE_ITEM, payload: { categoryName, itemName } });
      }
    }
  };

  return (
    <>
      <div className="list-items-container">
        {list.length === 0 && <div>רשימה ריקה</div>}
        {list.map((listCategory: IStoreItem) => {
          return listCategory.items.map((item: IItem) => {
            let isExist = null;
            if (isStore) {
              isExist = groceries.shoppingList.find((item) => item.categoryName === listCategory.categoryName)?.items.find((groceryItem) => groceryItem.name === item.name);
            }
            return (
              <div
                key={item.name}
                onDoubleClick={isStore ? undefined : () => itemSelectedHandler(listCategory.categoryName, item.name, item.image)}
                className={isStore ? undefined : "cart-item-wrapper"}
              >
                <img alt="" src={item.image} />
                <p>{item.name}</p>

                {isExist ? (
                  <span className="exist-in-cart">מוצר נמצא בעגלה!</span>
                ) : (
                  <button onClick={() => itemSelectedHandler(listCategory.categoryName, item.name, item.image)}>{isStore ? "הוסף לעגלה" : "הסר"}</button>
                )}
              </div>
            );
          });
        })}
      </div>
      {errorMsg && <ErrorModal text={errorMsg} closeModal={() => setErrorMsg(null)} />}
    </>
  );
};
