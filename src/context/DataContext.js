import axios from 'axios';
import md5 from 'md5';
import React, {createContext, useState} from "react";

// DataContext wordt gecreëerd en kan worden gebruikt om data te delen tussen componenten.
export const DataContext = createContext(null)

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const BASE_URL = 'http://gateway.marvel.com/v1/public';

const DataContextProvider = ({children}) => {

    // useState hook wordt gebruikt om de status van een item bij te houden.
    const [isItem, setItem] = useState("")

    const data = {
        isItem : isItem,
        setItem : setItem,
        fetchMarvelData: fetchMarvelData,
    }

    // Deze functie creëert een md5-hash die nodig is voor de Marvel API.
    function createHash(timeStamp) {
        return md5(timeStamp + privateKey + publicKey);
    }

    // Deze functie wordt gebruikt om data op te halen van de Marvel API.
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

        // De parameters van de API-aanvraag worden aangepast op basis van de meegegeven argumenten.
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

        // De daadwerkelijke API-aanvraag wordt gedaan met behulp van axios.
        return axios.get(url, {params})
            .then(response => wantResults ? response.data.data.results : response.data.data)
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de data: ", error);
            });
    }

    // De context provider maakt de data en de fetchMarvelData-functie beschikbaar
    // voor alle kindcomponenten.
    return(
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContextProvider
