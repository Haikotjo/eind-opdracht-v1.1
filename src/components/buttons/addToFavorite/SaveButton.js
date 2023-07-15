import React, { useContext, useState, useEffect, useReducer } from 'react';
import { SavedContext } from '../../../context/SavedContext';
import { Link } from "react-router-dom";
import styles from "./SaveButton.module.scss";

const SaveButton = ({ itemKey, item }) => {
    const { isItemSaved, saveItem, removeItem } = useContext(SavedContext);
    const [isSaved, setIsSaved] = useState(false);
    const [message, setMessage] = useState("");
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    // useEffect checks if the item is already saved when the component is loaded
    useEffect(() => {
        const alreadySaved = isItemSaved(itemKey, item.id);
        setIsSaved(alreadySaved);
    }, [item, itemKey, isItemSaved]);

    const handleSave = () => {
        const saved = saveItem(itemKey, item);
        if (!saved) {
            // If the item cannot be saved (e.g., because the user is not logged in), show a message
            setMessage("Login");
        } else {
            // If the item is saved successfully, show a success message
            setMessage("Item added!");
            setIsSaved(true);
        }
        // Force a re-render of the component to ensure the new saved status is displayed
        forceUpdate();
    };

    const handleRemove = () => {
        // Remove the item from the saved list
        removeItem(itemKey, item.id);
        // Show a success message
        setMessage("Item removed!");
        setIsSaved(false);
        // Force a re-render of the component to ensure the new saved status is displayed
        forceUpdate();
    };

    // Choose the appropriate handler based on whether the item is currently saved
    const handleClick = isSaved ? handleRemove : handleSave;

    return (
        <>
            <img
                onClick={handleClick}
                className={styles["heart-icon"]}
                src={isSaved ? '/images/heart-filled-second-color.svg' : '/images/heart-empty-second-color.svg'}
                alt="heart"
            />
            {message && message.length > 0 && (
                message === "Login" ?
                    <Link className={styles["login-link"]} to="/login">{message}</Link> :
                    <div className={styles['saved-message']}>{message}</div>
            )}
        </>
    );
};

export default SaveButton;
