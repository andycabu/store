import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import DayNight from "./components/DayNight.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <DayNight />
    <App />
  </ProductProvider>
);
