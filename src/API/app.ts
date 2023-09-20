const server = "http://localhost:8080";

export async function GetCartStore() {
  const result = await fetch(`${server}/groceries`, { method: "GET" });
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
