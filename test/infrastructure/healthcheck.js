
const axios = require('axios');

let attempts = 0;
let intervalId;


/**
 * Makes GET requests to the vue server until a 200 is recieved so that WebdriverIO can start.
 */
const interval = setInterval(async () => {
    attempts++;
    try {
        const { status } = await axios.get(`http://localhost:${process.argv[2]}`);

        if (status === 200) {
            clearInterval(intervalId);
        }
    } catch (error) {
        console.log('Attempt', attempts, error.code); // eslint-disable-line
    }

    if (attempts >= 15) {
        console.error('Too many attempts'); // eslint-disable-line
        process.exit(1);
    }
}, 10000);

intervalId = interval;