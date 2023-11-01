import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="pt-28">
          <Filters />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
