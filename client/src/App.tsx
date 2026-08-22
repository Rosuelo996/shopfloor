import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Sidebar />

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        
      </div>
    </UserProvider>
  );
}

export default App;
