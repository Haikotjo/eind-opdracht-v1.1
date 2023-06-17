import axios from 'axios';
import md5 from 'md5';
import React, {createContext, useState} from "react";

export const DataContext = createContext(null)

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const BASE_URL = 'http://gateway.marvel.com/v1/public';

const DataContextProvider = ({children}) => {

    const [response, setResponse] = useState("")

    const data = {
        response: response,
        setResponse: setResponse
    }

    return(
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}
    function createHash(timeStamp) {
    return md5(timeStamp + privateKey + publicKey);
}

export async function fetchMarvelData(endpoint, limit, offset) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
        limit,
        offset
    }

    let url = `${BASE_URL/{ endpoint }}`

    try {
        const response = await axios.get(url, { params });
        return response.data.data;
    } catch (error) {
        console.error("Er was een fout bij het ophalen van de data: ", error);
        throw error;
    }
}

export default DataContextProvider
