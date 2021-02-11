/**
 * Gets a specific cookie based on the cookie name you provide it.
 *
 * TODO: Use universal cookie helper when consuming apps are ready.
 *
 * @param name
 * @returns {*}
 */
const getCookie = name => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export {
    // eslint-disable-next-line import/prefer-default-export
    getCookie
};
