export function handleError(error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                console.error('There was an error in the request.');
                break;
            case 401:
                console.error('Unauthorized. Please check your login credentials.');
                break;
            case 403:
                console.error('Access denied.');
                break;
            case 404:
                console.error('The requested resource could not be found.');
                break;
            case 500:
                console.error('There was an error on the server.');
                break;
            default:
                console.error('There was an unknown error.');
                break;
        }
    } else if (error.request) {
        console.error('There was an error making the request.');
    } else {
        console.error('There was an error setting up the request.');
    }
}
