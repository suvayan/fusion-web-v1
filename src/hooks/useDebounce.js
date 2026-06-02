import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Start timer when value changes
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: clear timer if value changes before delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;