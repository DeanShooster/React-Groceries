const server = "http://34.244.204.92:8080";

const endpoints = {
  getGroceries: "groceries",
  cart: "cart",
};

/**
 * Get Groceries API.
 * @returns {shoppingList, storeList}
 */
export async function GetCartStore() {
  const result = await fetch(`${server}/${endpoints.getGroceries}`, { method: "GET" });
  return await errorHandler(await result.json());
}

/**
 * Adds an item to the cart API.
 * @param groceryItemName Grocery Item Name
 */
export async function AddItemToCart(groceryItemName: string) {
  const result = await fetch(`${server}/${endpoints.cart}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groceryItemName }),
  });
  return await errorHandler(await result.json());
}

/**
 * Removes an item from the cart API.
 * @param groceryItemName Grocery Item Name
 */
export async function RemoveItemFromCart(groceryItemName: string) {
  const result = await fetch(`${server}/${endpoints.cart}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groceryItemName }),
  });
  return await errorHandler(await result.json());
}

/**
 * Generic error handler. Defined by server error configuration of { Message , status } for errors.
 * @param {Object: Error/Data} ob
 * @returns Error object {error , status} or the data object.
 */
async function errorHandler(ob: any) {
  if (ob.Message) return { error: ob.Message, status: ob.status };
  return ob;
}
