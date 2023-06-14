import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const BASE_URL = 'http://gateway.marvel.com/v1/public';

function createHash(timeStamp) {
    return md5(timeStamp + privateKey + publicKey);
}

export function getHeroes(limit = 20, offset = 0) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
        limit,
        offset
    }

    console.log("Timestamp: ", timeStamp);
    console.log("Public Key: ", publicKey);
    console.log("Private Key: ", privateKey);
    console.log("Hash: ", hash);

    return axios.get(`${BASE_URL}/characters`, { params });
}

export function getComics(limit = 20, offset = 0) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
        limit,
        offset
    }

    return axios.get(`${BASE_URL}/comics`, { params });
}

export function getEvents(limit = 20, offset = 0) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
        limit,
        offset
    }

    return axios.get(`${BASE_URL}/events`, { params });
}
