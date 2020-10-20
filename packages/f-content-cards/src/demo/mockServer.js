import { Server } from 'miragejs';

export default function makeServer ({ environment = 'development' } = {}) {
    return new Server({
        environment,
        routes () {
            this.passthrough();
            this.post('https://sdk.iad-01.braze.com/api/v3/data/', () => ({ error: 'invalid_api_keys' }));
            this.passthrough('https://sdk.iad-01.braze.com/api/v3/**');
        }
    });
}
