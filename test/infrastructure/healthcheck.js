
const axios = require('axios');

const address = 'http://localhost:8080';
let attempts = 0;
let intervalId;


/**
 * Makes GET requests to the vue server until a 200 is recieved so that WebdriverIO can start.
 */
const interval = setInterval(async () => {
    attempts++;
    try {
        const { status } = await axios.get(address);

        if (status === 200) {
            clearInterval(intervalId);
        }

        if (attempts >= 15) {
            console.error(`Failed to get ${address} after ${attempts} attempts.  Server returned ${status}`); // eslint-disable-line
            process.exit(1);
        }

    } catch (error) {
        console.log('Attempt', attempts, error.code); // eslint-disable-line
    }

}, 15000);

intervalId = interval;