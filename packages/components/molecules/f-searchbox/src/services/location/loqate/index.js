import axios from 'axios';
import { removeWhitespace } from '../../../utils/helpers';

const config = {
    baseURL: 'https://api.addressy.com/Capture/Interactive',
    params: {
        Countries: 'GB',
        Limit: '20',
        Key: '',
        Text: '',
        Container: '',
        Id: '',
        Field1Format: '',
        Field2Format: ''
    }
};

export default {
    /**
     * Calls Loqate's Find API, returns matching postcode results from users search.
     *
     * Example: Searching: `AR5` > Returns results: `AR511AR, AR521AR, AR513AR`.
     *
     * @param location
     * @returns {Promise.<TResult>}
     */
    getPartialAddressSearch (location) {
        config.params.Text = location && location.address;
        config.params.Container = location && location.streetLevelAddress;

        return axios.get('/Find/v1.10/json3.ws', config)
        .then(res => {
            if (res.data) return res.data;
            return false;
        })
        .catch(error => {
            throw Error(error);
        });
    },

    /**
     * Calls Loqate's Retrieve API, Returns the full address details based on the Id.
     *
     * Note: This method will consume API credit.
     *
     * @param addressId
     */
    getFullAddressDetails (addressId) {
        config.params.Id = addressId;
        config.params.Field1Format = '{Latitude}';
        config.params.Field2Format = '{Longitude}';

        return axios.get('/Retrieve/v1/json3.ws', config)
        .then(res => {
            if (res.data) return res.data;
            return false;
        });
    },

    /**
     * Used to check that the `address` matches our requirement before we make a call to Loqate
     * to retrieve results.
     *
     * @param address
     * @returns {boolean}
     */
    hasMinimumAddressCriteria (address) {
        if (!address) return false;

        const parsedAddress = removeWhitespace(address);

        return parsedAddress
            && (parsedAddress.length > 2 && parsedAddress.length < 8);
    }
};
