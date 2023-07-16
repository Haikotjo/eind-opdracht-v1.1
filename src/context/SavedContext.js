// SavedContext.js
import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

// SavedContext is created and can be used to share saved items between components.
export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
    const { isAuth } = useContext(AuthContext); // Retrieve the authentication status from the AuthContext.
    const [savedItems, setSavedItems] = useState([]);
    const [savedItemsChangeCounter, setSavedItemsChangeCounter] = useState(0);

    // This function retrieves saved items from local storage.
    const getSavedItems = (itemKey) => {
        return JSON.parse(localStorage.getItem(itemKey)) || [];
    };

    // This function checks if an item is already saved.
    const isItemSaved = (itemKey, id) => {
        let items = getSavedItems(itemKey);
        return items.some(item => item.id === id);
    };

    // This function saves an item to local storage.
    const saveItem = (itemKey, item) => {
        if (!isAuth) { // If the user is not logged in, the function is aborted early.
            return false;
        }
        let items = getSavedItems(itemKey);
        items.push(item);
        localStorage.setItem(itemKey, JSON.stringify(items));
        setSavedItems(items);
        setSavedItemsChangeCounter(prevCount => prevCount + 1); // Increase the counter to track changes.
        return true;
    };

    // This function removes an item from local storage.
    const removeItem = (itemKey, id) => {
        let items = getSavedItems(itemKey);
        items = items.filter(item => item.id !== id);
        localStorage.setItem(itemKey, JSON.stringify(items));
        setSavedItems(items);
        setSavedItemsChangeCounter(prevCount => prevCount + 1); // Decrease the counter to track changes.
    };

    // The context provider makes the functions and the counter available
    // to all child components.
    return (
        <SavedContext.Provider value={{ isItemSaved, saveItem, removeItem, savedItemsChangeCounter }}>
            {children}
        </SavedContext.Provider>
    );
};
