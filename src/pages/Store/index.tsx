import { ListItems } from "../../components/ListItems";
import { Filter } from "./Filter";

import "./index.scss";
export const Store = () => {
  return (
    <section className="store-page">
      <Filter />
      <ListItems isStore />
    </section>
  );
};
