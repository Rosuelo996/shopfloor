import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />;
}