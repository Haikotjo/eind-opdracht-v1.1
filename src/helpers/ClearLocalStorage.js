import { handleError } from "./handleError";

export function clearLocalStorage() {
    try {
        // Remove user token
        localStorage.removeItem('token');

        // Remove all other user-related data
        localStorage.removeItem('savedEvent');
        localStorage.removeItem('savedComic');
        localStorage.removeItem('savedHero');
    } catch (error) {
        handleError(error);
    }
}
