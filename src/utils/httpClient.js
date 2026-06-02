import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
});


// ---- Request Interceptor (attach auth token etc.) ----
httpClient.interceptors.request.use(
    (config) => {
        // You can attach auth token here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// ---- Response Interceptor (normalize errors, refresh tokens, etc.) ----
let isRefreshing = false;
let queue = [];

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config || {};
        const apiStatus = error?.response?.data?.statusCode || error?.response?.status || 500;
        const apiMessage = error?.response?.data?.message || "An unexpected error occurred";

        const normalized = {
            statusCode: error.response?.data?.statusCode ?? 500,
            status: error.response?.data?.status ?? "error",
            success: error.response?.data?.success ?? false,
            message: error.response?.data?.message ?? "An unexpected error occurred",
        }

        // Handle missing access token - clear persisted state and redirect to login
        if (apiStatus === 401 && apiMessage === "Access token is missing") {
            // Clear persisted Redux auth state from localStorage
            localStorage.removeItem("persist:auth");
            // Redirect to login page
            window.location.href = "/auth/login";
            return Promise.reject(normalized);
        }

        // If unauthorized, try refresh once then retry original request
        if(apiStatus === 401 && (apiMessage === "Your token has expired. Please log in again.") && !originalRequest._retry){
            originalRequest._retry = true;
            if (isRefreshing) {
                // Wait for refresh to finish
                await new Promise((resolve) => queue.push(resolve));
            }else{
                isRefreshing = true;
                try{
                    await axios.post(
                        `${httpClient.defaults.baseURL}auth/refresh-token`,
                        {},
                        { withCredentials: true }
                    );
                    // release queued requests
                    queue.forEach((resolve) => resolve());
                }catch{
                    queue = [];
                    isRefreshing = false;
                    return Promise.reject(normalized); // refresh failed
                }finally{
                    isRefreshing = false;
                    queue = [];
                }
            }

            // Retry original request (cookies now have new access token)
            return httpClient(originalRequest);
        }


        return Promise.reject(normalized);
    }
);

export default httpClient;