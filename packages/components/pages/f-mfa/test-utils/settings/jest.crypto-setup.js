/* eslint-disable global-require */
global.crypto = {
    getRandomValues: arr => require('crypto').randomBytes(arr.length)
};
/* eslint-enable global-require */
