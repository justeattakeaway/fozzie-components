import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import checkoutJson from './checkout.json';


export default {
    setup (path) {
        const mock = new MockAdapter(axios);
        mock.onGet(path).reply(200, checkoutJson);
    }
};
