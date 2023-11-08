import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import FavoritePage from "./pages/FavoritePage";
import Cart from "./components/Cart";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Categories from "./components/Categories";
import { AsideProvider } from "./context/AsideContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AsideProvider>
          <Navbar />
          <Cart />
          <main className="pt-28">
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/category/:id" element={<Categories />} />
            </Routes>
          </main>
        </AsideProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
