import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routing } from "./constants/routing";
import { GroceriesContextProvider } from "./context";

import { Header } from "./components/Header";
import { Cart } from "./pages/Cart";
import { Store } from "./pages/Store";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <GroceriesContextProvider>
          <Routes>
            <Route path={routing.Home.path} element={<Cart />} />
            <Route path={routing.Store.path} element={<Store />} />
          </Routes>
        </GroceriesContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
