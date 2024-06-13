import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue = null) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error retrieving localStorage key “${key}”:`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key) {
                setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue];
}