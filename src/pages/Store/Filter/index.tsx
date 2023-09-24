import { useContext, useRef } from "react";
import { GroceriesContext, IStoreItem } from "../../../context";
import { ReducerActionTypes } from "../../../reducers/groceriesReducer";

import "./index.scss";
import { Eraser, XButton } from "../../../assets";
export const Filter = () => {
  const { groceries, dispatchGroceries } = useContext(GroceriesContext);
  const inputRef = useRef<any>();

  const resetStoreList = () => dispatchGroceries({ type: ReducerActionTypes.RESET });

  const textSearchHandler = (event: any) => {
    if (event.target.value.length === 0) resetStoreList();
    if (event.target.value.length >= 2)
      dispatchGroceries({ type: ReducerActionTypes.STORE_TEXT_SEARCH, payload: { value: event.target.value, searchData: groceries.storeList } });
  };

  const resetHandler = () => {
    if (inputRef) inputRef.current.value = "";
    resetStoreList();
  };

  const categorySearchHandler = (categoryName: string) => dispatchGroceries({ type: ReducerActionTypes.STORE_CATEGORY_SEARCH, payload: categoryName });

  return (
    <div className="filter-container">
      <div className="input-wrapper">
        <input placeholder="חפש מוצר" onChange={textSearchHandler} ref={inputRef} />
        <img alt="" src={XButton} onClick={resetHandler} />
      </div>
      <div className="categories-container">
        {groceries?.storeList.map((storeItem: IStoreItem, index: number) => {
          return (
            <div key={index} onClick={() => categorySearchHandler(storeItem.categoryName)}>
              {storeItem.categoryName}
            </div>
          );
        })}
        <img alt="" src={Eraser} onClick={resetHandler} />
      </div>
    </div>
  );
};
