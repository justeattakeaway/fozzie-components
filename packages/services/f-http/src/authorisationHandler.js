import axios from 'axios';

/**
 * Set authorisation header for all requests made by this client
 * @param {string} authorisationToken - The value of the authorisation token
 */
const setAuthorisationToken = authorisationToken => {
    axios.defaults.headers.common.Authorization = authorisationToken;
};

export default setAuthorisationToken;
