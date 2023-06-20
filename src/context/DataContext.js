import axios from 'axios';
import md5 from 'md5';
import React, {createContext, useState} from "react";

export const DataContext = createContext(null)

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const BASE_URL = 'http://gateway.marvel.com/v1/public';

const DataContextProvider = ({children}) => {

    const [isItem, setItem] = useState("")

    const data = {
        isItem : isItem,
        setItem : setItem,
        fetchMarvelData: fetchMarvelData,
    }
    function createHash(timeStamp) {
        return md5(timeStamp + privateKey + publicKey);
    }


    function fetchMarvelData(endpoint, limit = 20, offset = 0, id = null, searchTerm, nameStartsWith, wantResults) {
        const timeStamp = Date.now();
        const hash = createHash(timeStamp);

        let params = {
            ts: timeStamp,
            apikey: publicKey,
            hash: hash,
            limit,
            offset
        }

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

        return axios.get(url, {params})
            .then(response => wantResults ? response.data.data.results : response.data.data)
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de data: ", error);
            });
    }





    return(
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContextProvider
