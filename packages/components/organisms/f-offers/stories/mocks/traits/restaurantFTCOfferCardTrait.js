import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Restaurant_FTC_Offer_Card';

/* eslint-disable camelcase */
export default trait({
    tt: () => 'First time customer',
    ds: () => 'For first time customers',
    e: () => ({
        custom_card_type: type,
        subtitle: 'Order as much or as little as you like, exclusively on Just Eat.', // faker.lorem.sentence(),
        banner: '15% discount', // faker.lorem.sentence(),
        footer: 'Discount automatically applied at the basket', // faker.lorem.sentence(),
        restaurant_id: faker.random.number({ min: 100, max: 999999 }),
        restaurant_logo_url: `https://picsum.photos/seed/${type}_restaurant_image_url/384/216?blur=3`,
        restaurant_image_url: `https://picsum.photos/seed/${type}_restaurant_logo_url/48/48`,
        offer_auth_required: faker.random.boolean()
    })
});
