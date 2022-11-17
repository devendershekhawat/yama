import { useEffect, useState } from 'react';

function useDebounce(value:any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearInterval(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
