import { createBrowserRouter, Navigate } from "react-router-dom";
import { allPagesConfig } from "@/config/page-config";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";


const flattenRoutes = (pages) => {
    const output = [];
    const walk = (node) => {
    const { component: Component, path, children, isPrivate } = node || {};
        if (Component && path) {
            const element = <Component />;
            output.push({ path, element, isPrivate });
        }
        if (Array.isArray(children)) {
            children.forEach((child) => walk(child));
        }
    };
    pages.forEach((page) => walk(page));
    return output;
};


const makeChildRoute = ({ path, element }) => {
    if (path === "/") {
        return { index: true, element };
    }
    const normalized = path.replace(/^\//, ""); // child routes are relative
    return { path: normalized, element };
};

const appRouteEntries = flattenRoutes(allPagesConfig);


const privateRoutes = appRouteEntries.filter((route) => route.isPrivate).map(makeChildRoute);
const publicRoutes = appRouteEntries.filter((route) => !route.isPrivate).map(makeChildRoute);



const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: privateRoutes,
    },
    {
        path: "/auth",
        element: (
            <AuthRoute>
                <AuthLayout />
            </AuthRoute>
        ),
        children: publicRoutes,
    },
    { path: "*", element: <Navigate to="/" replace /> },
])

export default router;
