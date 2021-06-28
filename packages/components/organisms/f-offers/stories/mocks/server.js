import { createServer, Model } from 'miragejs';
import cardFactory from './factories/cardFactory';

const makeSever = seed => createServer({
    routes () {
        this.post('https://sdk.iad-01.braze.com/api/v3/data/', () => {});
        this.post('https://sdk.iad-01.braze.com/api/v3/content_cards/sync', schema => schema.cards.all());
        this.passthrough();
    },

    models: {
        card: Model
    },

    factories: {
        card: cardFactory
    },

    seeds (server) {
        seed(server);
    }
});

export default makeSever;
