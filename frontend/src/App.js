import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";

function App() {
  return (
    <div className="app">
      <h1> Microservices  Dashboard </h1>

      <div className="grid">
        <div className="card"><Users /></div>
        <div className="card"><Products /></div>
        <div className="card"><Orders /></div>
      </div>
    </div>
  );
}

export default App;
