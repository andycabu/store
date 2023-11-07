import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AsideProvider } from "./context/AsideContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <ThemeProvider>
      <AsideProvider>
        <App />
      </AsideProvider>
    </ThemeProvider>
  </ProductProvider>
);
