import "./styles/global.css";
import { Routes, Route } from "react-router-dom";

import AppProvider from "./context/AppProvider";
import { UserProvider } from "./context/UserProvider";

import ProtectedRoute from "./auth/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Team from "./pages/Team/Team";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login/>} />

          <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
          </Route>
          </Route>

        </Routes>
      </UserProvider>
    </AppProvider>
  );
}

export default App;