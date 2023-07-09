import jwt_decode from "jwt-decode";
// Dit is een helper functie om de geldigheid van een JWT te controleren.
export function checkTokenValidity(token) {
    // We decoderen het token met behulp van jwt-decode
    const decodedToken = jwt_decode(token);
    // Het 'exp' veld in een JWT bevat de vervaltijd van het token. Het is een tijdstempel in seconden.
    // We vermenigvuldigen met 1000 om het om te zetten naar milliseconden, dat is de eenheid die JavaScript's Date gebruikt.
    const expirationTime = decodedToken.exp * 1000;
    // We controleren of de huidige tijd voorbij de vervaltijd is. Als dat zo is, is het token verlopen.
    const isExpired = Date.now() > expirationTime;
    // We retourneren de negatie van 'isExpired'. Als het token is verlopen, geeft de functie false terug.
    // Als het token niet is verlopen, geeft de functie true terug.
    return !isExpired;
}
