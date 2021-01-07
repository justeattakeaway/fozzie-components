import axios from 'axios';

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
    }
};
