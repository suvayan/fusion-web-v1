import { useLocation, useNavigate } from "react-router-dom";

// Utility hook for handling redirects
export const useRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const redirectToIntended = (fallback = "/") => {
        const from = location.state?.from?.pathname || fallback;
        navigate(from, { replace: true });
    };

    const redirectWithState = (to, fromLocation) => {
        navigate(to, { 
            state: { from: fromLocation || location },
            replace: true 
        });
    };

    return {
        redirectToIntended,
        redirectWithState,
        intendedDestination: location.state?.from?.pathname
    };
};

// Utility for getting redirect URL
export const getRedirectUrl = (location, fallback = "/") => {
    return location.state?.from?.pathname || fallback;
};