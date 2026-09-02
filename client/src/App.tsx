import "./styles/global.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider } from "./context/UserProvider";
import AppProvider from "./context/AppProvider";
import Team from "./pages/Team/Team";
import Welcome from "./pages/Welcome/Welcome";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Welcome/components/Login/Login";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route element={<AppLayout />}>
          <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
          </Route>
        </Routes>
      </UserProvider>
    </AppProvider>
  );
}

export default App;