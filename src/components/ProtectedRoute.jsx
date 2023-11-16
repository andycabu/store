import { Navigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
    return <div>Cargando...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
