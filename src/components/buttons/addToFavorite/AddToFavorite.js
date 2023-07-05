import React, { useContext, useState, useEffect } from 'react';
import {AuthContext} from "../../../context/AuthContext"
import {Link} from "react-router-dom";

function SaveButton({ itemKey, item }) {
    const { isAuth } = useContext(AuthContext);
    const [isSaved, setIsSaved] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem(itemKey)) || [];
        const alreadySaved = savedItems.some(savedItem => savedItem.id === item.id);
        setIsSaved(alreadySaved);
    }, [item, itemKey]);

    const handleSave = () => {
        if (!isAuth) {
            setShowMessage(true);
            return;
        }
        let savedItems = JSON.parse(localStorage.getItem(itemKey)) || [];
        savedItems.push(item);
        localStorage.setItem(itemKey, JSON.stringify(savedItems));
        console.log("Saved in storage");
        setIsSaved(true);
    };

    return (
        <>
            <img
                onClick={handleSave}
                disabled={isSaved}
                src={isSaved ? '/images/heart-filled-second-color.svg' : '/images/heart-empty-second-color.svg'} alt="heart"
                width="75px"
                height="75px"
            />
            {showMessage && <Link to="/login">Login to add to favorites</Link>}
        </>
    );
}

export default SaveButton;
