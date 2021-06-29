import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Home_Promotion_Card_1';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        icon_1: `https://picsum.photos/seed/${type}_icon_1/48/48`,
        button_1: faker.random.word(),
        background_color: faker.random.arrayElement(['#f9fafb', '#f1f2f4', '#e2e6e9', '#c5ccd3', '#929faa', '#5e6b77', '#2a3846']),
        content_container_background: faker.random.arrayElement(['#f9fafb', '#f1f2f4', '#e2e6e9', '#c5ccd3', '#929faa', '#5e6b77', '#2a3846']),
        display_times_json: () => ({
            Any: [
                { Start: '00:00', End: '23:59' }
            ]
        }),
        brand_name: faker.commerce.product()
    })
});
