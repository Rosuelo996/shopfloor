import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider } from "./context/UserProvider";
import AppProvider from "./context/AppProvider";
import Team from "./pages/Team/Team";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <div className="app">
          <Sidebar />

          <main className="main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
          
        </div>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
