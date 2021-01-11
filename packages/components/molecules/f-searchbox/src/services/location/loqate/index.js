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
    getPartialAddressSearch (location) {
        config.params.Text = location.address;
        config.params.Container = location.streetLevelAddress;

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
