import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const isAuthPath = (pathname) => pathname?.startsWith?.("/auth");

const AuthRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const location = useLocation();

    if (isLoggedIn) {
        const from = location.state?.from?.pathname;
        // If the previous target is an auth page, go home instead to avoid loops
        const safeDest = from && !isAuthPath(from) ? from : "/";
        return <Navigate to={safeDest} replace />;
    }

    return children;
};

export default AuthRoute;
