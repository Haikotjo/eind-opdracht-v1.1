// SavedContext.js
import React, { createContext, useContext, useState } from 'react';
import {AuthContext} from './AuthContext';

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
    const { isAuth } = useContext(AuthContext);
    const [savedItems, setSavedItems] = useState([]);
    const [savedItemsChangeCounter, setSavedItemsChangeCounter] = useState(0);

    const getSavedItems = (itemKey) => {
        return JSON.parse(localStorage.getItem(itemKey)) || [];
    };

    const isItemSaved = (itemKey, id) => {
        let items = getSavedItems(itemKey);
        return items.some(item => item.id === id);
    };

    const saveItem = (itemKey, item) => {
        if (!isAuth) {
            return false;
        }
        let items = getSavedItems(itemKey);
        items.push(item);
        localStorage.setItem(itemKey, JSON.stringify(items));
        setSavedItems(items);
        setSavedItemsChangeCounter(prevCount => prevCount + 1); // Add this line
        return true;
    };

    const removeItem = (itemKey, id) => {
        let items = getSavedItems(itemKey);
        items = items.filter(item => item.id !== id);
        localStorage.setItem(itemKey, JSON.stringify(items));
        setSavedItems(items);
        setSavedItemsChangeCounter(prevCount => prevCount + 1); // Add this line
    };

    return (
        <SavedContext.Provider value={{ isItemSaved, saveItem, removeItem, savedItemsChangeCounter }}>
            {children}
        </SavedContext.Provider>
    );
};
