export function clearLocalStorage() {
    // Remove user token
    localStorage.removeItem('token');

    // Remove other user related data
    localStorage.removeItem('savedEvent');
    localStorage.removeItem('savedComic');
    localStorage.removeItem('savedHero');
}
