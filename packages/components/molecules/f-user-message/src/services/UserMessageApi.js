import axios from 'axios';

export default {
    async getUserMessage (culture) {
        return axios.get('/user-message.json')
            .then(response => response.data[culture])
            .then(c => (c.userMessageEnabled ? c.userMessageText : ''))
            .catch(() => '');
    }
};
