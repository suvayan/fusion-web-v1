import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;