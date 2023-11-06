import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ProductProvider>
);
