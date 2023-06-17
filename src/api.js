import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const BASE_URL = 'http://gateway.marvel.com/v1/public';

function createHash(timeStamp) {
    return md5(timeStamp + privateKey + publicKey);
}

export function fetchMarvelAPI(endpoint, limit = 20, offset = 0, id = null, searchTerm, nameStartsWith) {
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

    return axios.get(url, { params })
        .then(response => response.data.data.results)
        .catch(error => {
            console.error("Er was een fout bij het ophalen van de data: ", error);
        });
}

export function fetchSingleMarvelObject(endpoint, id) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash
    }

    let url = `${BASE_URL}/${endpoint}/${id}`;

    return axios.get(url, { params })
        .then(response => response.data.data.results)
        .catch(error => {
            console.error("Er was een fout bij het ophalen van de data: ", error);
        });
}