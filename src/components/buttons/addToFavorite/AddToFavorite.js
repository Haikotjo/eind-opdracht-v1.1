import React, { useContext } from 'react';
import {AuthContext} from "../../../context/AuthContext"

function SaveButton({ item }) {
    const { isAuth } = useContext(AuthContext);

    const handleSave = () => {
        if (!isAuth) {
            alert('Inloggen om op te slaan');
            return;
        }

        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        savedItems.push(item);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        console.log("saved in storaged")
    };


    return (
        <button onClick={handleSave}>
            Save
        </button>
    );
}

export default SaveButton;
