export function clearLocalStorage() {
    // Verwijer user token
    localStorage.removeItem('token');

    // Verwijder alle andere gebruikers gerelateerde data
    localStorage.removeItem('savedEvent');
    localStorage.removeItem('savedComic');
    localStorage.removeItem('savedHero');
}
