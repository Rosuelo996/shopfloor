import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";
import AuthLoading from "../components/AuthLoading/AuthLoading";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />;
}