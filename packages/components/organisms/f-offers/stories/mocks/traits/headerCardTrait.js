import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Header_Card';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        background_color: faker.random.arrayElement(['#f9fafb', '#f1f2f4', '#e2e6e9', '#c5ccd3', '#929faa', '#5e6b77', '#2a3846'])
    })
});
