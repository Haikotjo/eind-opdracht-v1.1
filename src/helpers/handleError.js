export function handleError(error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                console.error('Er was een fout in het verzoek.');
                break;
            case 500:
                console.error('Er was een fout op de server.');
                break;
            default:
                console.error('Er was een onbekende fout.');
                break;
        }
    } else if (error.request) {
        console.error('Er was een fout bij het maken van het verzoek.');
    } else {
        console.error('Er was een fout bij het instellen van het verzoek.');
    }
}
