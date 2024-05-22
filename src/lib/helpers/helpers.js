/**
 * Get cookie
 * @param name
 * @param cookiesString
 * @returns {null|string}
 */
const getCookie = (name, cookiesString) => {
    var nameEQ = name + "=";
    var ca = cookiesString.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const deleteCookie = (name) => {
    document.cookie = name +'=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const setCookies = (cookies) => {
    document.cookie = cookies;
}

export {
    getCookie,
    setCookies,
    deleteCookie
}