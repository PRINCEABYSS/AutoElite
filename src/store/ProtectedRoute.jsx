import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const isAdmin = useSelector((state) => state.auth?.isAdmin);
  
  if (isAdmin === undefined) return null; 
  
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;