import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Filters from "./components/Filters";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Filters />
        <Card />
      </main>
    </>
  );
}

export default App;
