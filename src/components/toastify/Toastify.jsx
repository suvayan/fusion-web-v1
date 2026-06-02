import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Default options you can reuse in showToast
const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
};


// Simple Custom ToastContainer with default configuration
const CustomToastContainer = () => {
    return <ToastContainer {...defaultOptions} newestOnTop />;
};



// Custom toast utility functions
export const showToast = {
    success: (message) => {
        toast.success(message);
    },
    
    error: (message) => {
        toast.error(message);
    },
    
    warning: (message) => {
        toast.warning(message);
    },
    
    info: (message) => {
        toast.info(message);
    }
};

// Export the toast function
export { toast };

// Default export
export default CustomToastContainer;
