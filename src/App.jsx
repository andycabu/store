import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Filters from "./components/Filters";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <Filters />
        <Card />
      </main>
    </>
  );
}

export default App;
