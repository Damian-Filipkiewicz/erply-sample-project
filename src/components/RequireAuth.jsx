import React from 'react'
import { Navigate } from 'react-router-dom';
import routes from '../routes';

export const RequireAuth = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState(localStorage.getItem('sessionKey'))

  return isLogged
    ? children
    : <Navigate to={routes.login} replace />;
}
