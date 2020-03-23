import axios from 'axios';
// import userMessageMock from '../components/tests/fixtures/user-message.json';

export default {
    async getUserMessage (culture/*, debugmode = false*/) {
        // if (debugmode) {
        //     return userMessageMock[culture].userMessageEnabled && userMessageMock[culture].userMessageText;
        // }
        return axios.get('/user-message.json')
            .then(response => response.data[culture])
            .then(c => (c.userMessageEnabled ? c.userMessageText : ''))
            .catch(() => '');
    }
};
