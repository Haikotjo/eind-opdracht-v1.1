// SavedContext.js
import React, { createContext, useContext, useState } from 'react';
import {AuthContext} from './AuthContext';

// SavedContext wordt gecreëerd en kan worden gebruikt om opgeslagen items te delen tussen componenten.
export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
    const { isAuth } = useContext(AuthContext); // Haal de authenticatiestatus op uit de AuthContext.
    const [savedItems, setSavedItems] = useState([]);
    const [savedItemsChangeCounter, setSavedItemsChangeCounter] = useState(0);

    // Deze functie haalt opgeslagen items op uit de lokale opslag.
    const getSavedItems = (itemKey) => {
        return JSON.parse(localStorage.getItem(itemKey)) || [];
    };

    // Deze functie controleert of een item al is opgeslagen.
    const isItemSaved = (itemKey, id) => {
        let items = getSavedItems(itemKey);
        return items.some(item => item.id === id);
    };

    // Deze functie slaat een item op in de lokale opslag.
    const saveItem = (itemKey, item) => {
        if (!isAuth) { // Als de gebruiker niet is ingelogd, wordt de functie vroegtijdig afgebroken.
            return false;
        }
        let items = getSavedItems(itemKey);
        items.push(item);
        localStorage.setItem(itemKey, JSON.stringify(items));
        setSavedItems(items);
        setSavedItemsChangeCounter(prevCount => prevCount + 1); // Verhoog de teller om wijzigingen bij te houden.
        return true;
    };

    // Deze functie verwijdert een item uit de lokale opslag.
    const removeItem = (itemKey, id) => {
        let items = getSavedItems(itemKey);
        items = items.filter(item => item.id !== id);
        localStorage.setItem(itemKey, JSON.stringify(items));
        setSavedItems(items);
        setSavedItemsChangeCounter(prevCount => prevCount + 1); // Verlaag de teller om wijzigingen bij te houden.
    };

    // De context provider maakt de functies en de teller beschikbaar
    // voor alle kindcomponenten.
    return (
        <SavedContext.Provider value={{ isItemSaved, saveItem, removeItem, savedItemsChangeCounter }}>
            {children}
        </SavedContext.Provider>
    );
};
