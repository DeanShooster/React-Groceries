interface IRoute {
  path: string;
  name: string;
}

interface IRoutes {
  Home: IRoute;
  Store: IRoute;
}

export const routing: IRoutes = {
  Home: {
    path: "/",
    name: "עגלת קניות",
  },
  Store: {
    path: "/Store",
    name: "חנות מוצרים",
  },
};
