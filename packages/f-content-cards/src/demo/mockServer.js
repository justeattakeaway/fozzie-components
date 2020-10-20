import { Server } from 'miragejs';
import data from '../../stories/mockData/data';
import cards from '../../stories/mockData/cards';

export default function makeServer ({ environment = 'development' } = {}) {
    return new Server({
        environment,
        routes () {
            this.passthrough();
            this.post('https://sdk.iad-01.braze.com/api/v3/data/', () => data());
            this.post('https://sdk.iad-01.braze.com/api/v3/content_cards/sync', () => cards());
            this.passthrough('https://sdk.iad-01.braze.com/api/v3/**');
        }
    });
}
