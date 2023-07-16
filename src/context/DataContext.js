import axios from 'axios';
import md5 from 'md5';
import React, { createContext, useState } from "react";
import { handleError } from "../helpers/handleError";

// DataContext is created and can be used to share data between components.
export const DataContext = createContext(null);

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const BASE_URL = 'http://gateway.marvel.com/v1/public';

const DataContextProvider = ({ children }) => {

    // useState hook is used to track the state of an item.
    const [isItem, setItem] = useState("");

    const data = {
        isItem: isItem,
        setItem: setItem,
        fetchMarvelData: fetchMarvelData,
    };

    // This function creates an md5 hash required for the Marvel API.
    function createHash(timeStamp) {
        return md5(timeStamp + privateKey + publicKey);
    }

    // This function is used to fetch data from the Marvel API.
    function fetchMarvelData(endpoint, limit = 20, offset = 0, id = null, searchTerm, nameStartsWith, wantResults) {
        const timeStamp = Date.now();
        const hash = createHash(timeStamp);

        let params = {
            ts: timeStamp,
            apikey: publicKey,
            hash: hash,
            limit,
            offset
        };

        // The API request parameters are modified based on the provided arguments.
        if (searchTerm) {
            params.nameStartsWith = searchTerm;
        }

        if (nameStartsWith) {
            params.titleStartsWith = nameStartsWith;
        }

        let url = `${BASE_URL}/${endpoint}`;
        if (id) {
            url = `${url}/${id}`;
        }

        // The actual API request is made using axios.
        return axios.get(url, { params })
            .then(response => wantResults ? response.data.data.results : response.data.data)
            .catch(handleError);
    }

    // The context provider makes the data and the fetchMarvelData function available
    // to all child components.
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;
