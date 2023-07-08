import React, {useContext, useState, useEffect, useReducer} from 'react';
import {SavedContext} from '../../../context/SavedContext';
import {Link} from "react-router-dom";
import styles from "./SaveButton.scss";


function SaveButton({ itemKey, item }) {
    const { isItemSaved, saveItem, removeItem } = useContext(SavedContext);
    const [isSaved, setIsSaved] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const alreadySaved = isItemSaved(itemKey, item.id);
        setIsSaved(alreadySaved);
    }, [item, itemKey, isItemSaved]);

    const handleSave = () => {
        if (isSaved) {
            removeItem(itemKey, item.id);
            setIsSaved(false);
            console.log("Removed from storage");
        } else {
            const saved = saveItem(itemKey, item);
            if (!saved) {
                setShowMessage(true);
            } else {
                console.log("Saved in storage");
                setIsSaved(true);
            }
        }
        forceUpdate();
    };

    return (
        <>
            <img
                onClick={handleSave}
                className="heart-icon"
                src={isSaved ? '/images/heart-filled-second-color.svg' : '/images/heart-empty-second-color.svg'} alt="heart"
            />
            {showMessage && <Link to="/login">Login to add to favorites</Link>}
        </>
    );
}

export default SaveButton;
