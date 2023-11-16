import { Navigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user, authorizedUsers } = useUsers();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined && authorizedUsers !== undefined) {
      setIsAuthorized(!!(user && authorizedUsers[user.uid]));
      setIsLoading(false);
    }
  }, [user, authorizedUsers]);

  if (isLoading) {
    return <div>Cargando...</div>; // O un componente de carga
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};
