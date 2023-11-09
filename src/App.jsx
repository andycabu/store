import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import FavoritePage from "./pages/FavoritePage";
import Cart from "./components/Cart";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Categories from "./components/Categories";
import { AsideProvider } from "./context/AsideContext";
import { ProductProvider } from "./context/ProductContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <FilterProvider>
            <ThemeProvider>
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
            </ThemeProvider>
          </FilterProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
