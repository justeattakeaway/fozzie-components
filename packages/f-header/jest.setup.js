import fetch from 'jest-fetch-mock';
import 'jest-localstorage-mock';

global.fetch = fetch;

beforeEach(() => {
    window.dataLayer = [];
});

afterEach(() => {
    document.body.innerHTML = '';
    window.localStorage.clear();
    fetch.resetMocks();
});
