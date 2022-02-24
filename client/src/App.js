//RRD allows us to route our components
import { Routes, Route } from "react-router-dom";

// Importing our componentssss
import ProductList from "./componentes/ProductList";
import NavBar from "./componentes/NavBar"

function App() {
  return (
    <div>
    <NavBar />
      <div className="container p-4">
        <Routes>
          {/* Here we are going to include our routes */}          
          <Route exact path="/" element={<ProductList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
