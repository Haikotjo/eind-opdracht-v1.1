import jwt_decode from "jwt-decode";

// This is a helper function to check the validity of a JWT.
export function checkTokenValidity(token) {
    // We decode the token using jwt-decode.
    const decodedToken = jwt_decode(token);
    // The 'exp' field in a JWT contains the expiration time of the token. It is a timestamp in seconds.
    // We multiply it by 1000 to convert it to milliseconds, which is the unit used by JavaScript's Date.
    const expirationTime = decodedToken.exp * 1000;
    // We check if the current time is past the expiration time. If so, the token has expired.
    const isExpired = Date.now() > expirationTime;
    // We return the negation of 'isExpired'. If the token is expired, the function returns false.
    // If the token is not expired, the function returns true.
    return !isExpired;
}
