// handleError.js
export function handleError(error) {
    // Als er een reactie van de server is (d.w.z. de server heeft gereageerd met een statuscode die buiten het bereik van 2xx valt)
    if (error.response) {
        switch (error.response.status) {
            case 400:
                // Fout in het verzoek (bijvoorbeeld een slecht geformuleerd verzoek of ongeldige parameters)
                console.error('Er was een fout in het verzoek.');
                break;
            case 500:
                // Er is een fout opgetreden op de server (bijvoorbeeld een onverwachte situatie op de server)
                console.error('Er was een fout op de server.');
                break;
            default:
                // Een onverwachte fout (bijvoorbeeld een statuscode die niet specifiek wordt behandeld)
                console.error('Er was een onbekende fout.');
                break;
        }
    } else if (error.request) {
        // Het verzoek is gemaakt, maar er is geen reactie ontvangen
        console.error('Er was een fout bij het maken van het verzoek.');
    } else {
        // Er is iets gebeurd bij het instellen van het verzoek
        console.error('Er was een fout bij het instellen van het verzoek.');
    }
}
