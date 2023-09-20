import { useContext } from "react";
import { GroceriesContext, IStoreItem } from "../../../context";

import "./index.scss";
import { Eraser, XButton } from "../../../assets";
export const Filter = () => {
  const { groceries } = useContext(GroceriesContext);

  return (
    <div className="filter-container">
      <div className="input-wrapper">
        <input placeholder="חפש מוצר" />
        <img alt="" src={XButton} />
      </div>
      <div className="categories-container">
        {groceries?.storeList.map((storeItem: IStoreItem, index: number) => {
          return <div key={index}>{storeItem.categoryName}</div>;
        })}
        <img alt="" src={Eraser} />
      </div>
    </div>
  );
};
