import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const BASE_URL = 'http://gateway.marvel.com/v1/public';

function createHash(timeStamp) {
    return md5(timeStamp + privateKey + publicKey);
}

export function getHeroes() {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash
    }

    console.log("Timestamp: ", timeStamp);
    console.log("Public Key: ", publicKey);
    console.log("Private Key: ", privateKey);
    console.log("Hash: ", hash);

    return axios.get(`${BASE_URL}/characters`, { params });
}

export function getComics() {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash
    }

    return axios.get(`${BASE_URL}/comics`, { params });
}

export function getEvents() {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash
    }

    return axios.get(`${BASE_URL}/events`, { params });
}
