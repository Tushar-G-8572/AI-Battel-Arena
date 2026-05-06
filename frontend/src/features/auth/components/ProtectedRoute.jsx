import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../shared/components/Loader";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
