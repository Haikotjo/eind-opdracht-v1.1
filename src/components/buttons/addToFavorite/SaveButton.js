import React, {useContext, useState, useEffect, useReducer} from 'react';
import {SavedContext} from '../../../context/SavedContext';
import {Link} from "react-router-dom";
import styles from "./SaveButton.module.scss";

function SaveButton({ itemKey, item }) {
    const { isItemSaved, saveItem, removeItem } = useContext(SavedContext);
    const [isSaved, setIsSaved] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    // forceUpdate is een hack om de component te forceren om opnieuw te renderen
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    // useEffect controleert of het item al is opgeslagen wanneer de component wordt geladen
    useEffect(() => {
        const alreadySaved = isItemSaved(itemKey, item.id);
        setIsSaved(alreadySaved);
    }, [item, itemKey, isItemSaved]);

    const handleSave = () => {
        if (isSaved) {
            // Als het item al is opgeslagen, verwijder het dan
            removeItem(itemKey, item.id);
            setIsSaved(false);
            console.log("Removed from storage");
        } else {
            // Anders, probeer het item op te slaan
            const saved = saveItem(itemKey, item);
            if (!saved) {
                // Als het item niet kan worden opgeslagen (bijv. omdat de gebruiker niet is ingelogd), toon dan een bericht
                setShowMessage(true);
            } else {
                console.log("Saved in storage");
                setIsSaved(true);
            }
        }
        // Forceer een re-render van de component om ervoor te zorgen dat de nieuwe opgeslagen status wordt weergegeven
        forceUpdate();
    };

    return (
        <>
            <img
                onClick={handleSave}
                className={styles["heart-icon"]}
                src={isSaved ? '/images/heart-filled-second-color.svg' : '/images/heart-empty-second-color.svg'} alt="heart"
            />
            {showMessage && <Link to="/login">Login to add to favorites</Link>}
        </>
    );
}

export default SaveButton;
