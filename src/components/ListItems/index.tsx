import { useContext, useEffect, useState } from "react";
import { GroceriesContext, IItem, IStoreItem } from "../../context";

import "./index.scss";

interface IListItems {
  isStore: boolean;
}
export const ListItems = ({ isStore }: IListItems) => {
  const { groceries } = useContext(GroceriesContext);
  const [list, setList] = useState<IStoreItem[]>([]);

  useEffect(() => {
    if (groceries) setList(isStore ? groceries.storeList : groceries.shoppingList);
  }, [isStore, groceries]);

  const itemSelectedHandler = (categoryName: string, itemName: string) => {
    if (isStore) {
      console.log(categoryName, itemName);
    } else {
      console.log(categoryName, itemName);
    }
  };

  return (
    <div className="list-items-container">
      {list.map((listCategory: IStoreItem) => {
        return listCategory.items.map((item: IItem) => {
          return (
            <div key={item.name}>
              <img alt="" src={item.image} />
              <p>{item.name}</p>
              <button onClick={() => itemSelectedHandler(listCategory.categoryName, item.name)}>{isStore ? "הוסף לעגלה" : "הסר"}</button>
            </div>
          );
        });
      })}
    </div>
  );
};
