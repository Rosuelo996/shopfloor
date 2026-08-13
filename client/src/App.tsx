import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes> 
      </main>
      
    </div>
  );
}

export default App;
