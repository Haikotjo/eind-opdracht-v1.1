import {handleError} from "./handleError";

export function clearLocalStorage() {
    try {
        // Verwijder user token
        localStorage.removeItem('token');

        // Verwijder alle andere gebruikers gerelateerde data
        localStorage.removeItem('savedEvent');
        localStorage.removeItem('savedComic');
        localStorage.removeItem('savedHero');
    } catch (error) {
        handleError(error);
    }
}