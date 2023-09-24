import { IItem, IStoreItem } from "../context";

export enum ReducerActionTypes {
  INITIALIZATION = "INIT",
  STORE_TEXT_SEARCH = "STORE_TEXT_SEARCH",
  CART_TEXT_SEARCH = "CART_TEXT_SEARCH",
  STORE_CATEGORY_SEARCH = "STORE_CATEGORY_SEARCH",
  ADD_ITEM = "ADD_ITEM_SHOPPING_LIST",
  REMOVE_ITEM = "REMOVE_ITEM",
  RESET = "RESET",
}

export interface IReducerState {
  shoppingList: IStoreItem[];
  storeList: IStoreItem[];
  filteredShoppingList: IStoreItem[];
  filteredStoreList: IStoreItem[];
}

export function GroceriesReducer(state: IReducerState, action: any) {
  switch (action.type) {
    case ReducerActionTypes.INITIALIZATION: {
      const { storeList, shoppingList } = action.payload;
      const filteredStoreList = [...storeList],
        filteredShoppingList = [...shoppingList];
      return { ...state, storeList, shoppingList, filteredStoreList, filteredShoppingList };
    }

    case ReducerActionTypes.ADD_ITEM: {
      const { categoryName, itemName, itemImage } = action.payload;
      const shoppingList = addItemToShoppingList(categoryName, itemName, itemImage, state.shoppingList);
      const filteredShoppingList = [...shoppingList];
      return { ...state, shoppingList, filteredShoppingList };
    }

    case ReducerActionTypes.REMOVE_ITEM: {
      const { categoryName, itemName } = action.payload;
      const shoppingList = removeItemFromShoppingList(categoryName, itemName, state.shoppingList);
      const filteredShoppingList = [...shoppingList];
      return { ...state, shoppingList, filteredShoppingList };
    }

    case ReducerActionTypes.CART_TEXT_SEARCH: {
      const filteredShoppingList = searchGroceryItemByText(action.payload.value, action.payload.searchData);
      return { ...state, filteredShoppingList };
    }

    case ReducerActionTypes.STORE_TEXT_SEARCH: {
      const filteredStoreList = searchGroceryItemByText(action.payload.value, action.payload.searchData);
      return { ...state, filteredStoreList };
    }

    case ReducerActionTypes.STORE_CATEGORY_SEARCH: {
      const filteredStoreList = searchGroceryItemByCategory(action.payload, state.storeList);
      return { ...state, filteredStoreList };
    }

    case ReducerActionTypes.RESET: {
      const filteredStoreList = [...state.storeList],
        filteredShoppingList = [...state.shoppingList];
      return { ...state, filteredStoreList, filteredShoppingList };
    }

    default:
      return state;
  }
}

/**
 * Searches in the given grocery item data array all the items that partially match the grocery item name.
 * @param itemName Grocery Item string name
 * @param searchData Grocery Item data array , could be shop or store list.
 * @returns Filtered grocery item data array.
 */
function searchGroceryItemByText(itemName: string, searchData: IStoreItem[]) {
  const filteredGroceryItems = searchData.flatMap((storeItem) => {
    const matchingItems = storeItem.items.filter((item) => item.name.includes(itemName));
    if (matchingItems.length > 0) return [{ categoryName: storeItem.categoryName, items: matchingItems }];
    return [];
  });

  return filteredGroceryItems;
}

/**
 * Searches in the store list all the items by a given grocery category name.
 * @param categoryName Grocery Category string name.
 * @param storeList Grocery Store data array.
 * @returns  Filtered grocery item data array.
 */
function searchGroceryItemByCategory(categoryName: string, storeList: IStoreItem[]) {
  const filteredGroceryItems: IStoreItem[] = [];
  for (let i = 0; i < storeList.length; i++)
    if (storeList[i].categoryName === categoryName) {
      filteredGroceryItems.push(storeList[i]);
      continue;
    }
  return filteredGroceryItems;
}

/**
 * Adds an item to the shopping list.
 * @param categoryName Grocery Category string name.
 * @param itemName Grocery Item string name.
 * @param itemImage Grocery Item image.
 * @param shoppingList Grocery items shopping list data array.
 * @returns Updated Grocery items shopping list data array.
 */
function addItemToShoppingList(categoryName: string, itemName: string, itemImage: string, shoppingList: IStoreItem[]) {
  const existingCategory = shoppingList.find((category: IStoreItem) => category.categoryName === categoryName);
  if (existingCategory) {
    const existingItem = existingCategory.items.find((item: IItem) => item.name === itemName);
    if (!existingItem) {
      existingCategory.items.push({ name: itemName, image: itemImage });
      return shoppingList;
    } else return shoppingList;
  } else {
    const newCategory = {
      categoryName: categoryName,
      items: [{ name: itemName, image: itemImage }],
    };
    shoppingList.push(newCategory);
    return shoppingList;
  }
}

/**
 * Removes an item from the shopping list.
 * @param categoryName Grocery Category string name.
 * @param itemName Grocery Item string name.
 * @param shoppingList Grocery items shopping list data array.
 * @returns Updated Grocery items shopping list data array.
 */
function removeItemFromShoppingList(categoryName: string, itemName: string, shoppingList: IStoreItem[]) {
  const categoryIndex = shoppingList.findIndex((category) => category.categoryName === categoryName);
  if (categoryIndex === -1) return shoppingList;
  const itemIndex = shoppingList[categoryIndex].items.findIndex((item) => item.name === itemName);
  if (itemIndex === -1) return shoppingList;

  shoppingList[categoryIndex].items.splice(itemIndex, 1);

  if (shoppingList[categoryIndex].items.length === 0) shoppingList.splice(categoryIndex, 1);

  return shoppingList;
}
