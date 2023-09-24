import { useContext, useRef } from "react";
import { ListItems } from "../../components/ListItems";
import { GroceriesContext } from "../../context";
import { ReducerActionTypes } from "../../reducers/groceriesReducer";

import "./index.scss";
import { XButton } from "../../assets";
export const Cart = () => {
  const { groceries, dispatchGroceries } = useContext(GroceriesContext);
  const inputRef = useRef<any>();

  const resetCartList = () => dispatchGroceries({ type: ReducerActionTypes.RESET });

  const textSearchHandler = (event: any) => {
    if (event.target.value.length === 0) resetCartList();
    if (event.target.value.length >= 2)
      dispatchGroceries({ type: ReducerActionTypes.CART_TEXT_SEARCH, payload: { value: event.target.value, searchData: groceries.shoppingList } });
  };

  const resetHandler = () => {
    if (inputRef) inputRef.current.value = "";
    resetCartList();
  };

  return (
    <section className="cart-page">
      <div className="filter-container">
        <div className="input-wrapper">
          <input placeholder="חפש מוצר" onChange={textSearchHandler} ref={inputRef} />
          <img alt="" src={XButton} onClick={resetHandler} />
        </div>
      </div>
      <ListItems isStore={false} />
    </section>
  );
};
