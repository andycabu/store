import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import Product from "./components/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="pt-28">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
