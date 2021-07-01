import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Post_Order_Card_1';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        button_1: faker.random.word(),
        headline: faker.lorem.sentence(),
        image_1: `https://picsum.photos/seed/${type}_image_1/384/216?blur=3`,
        icon_1: `https://picsum.photos/seed/${type}_icon_1/48/48`
    })
});
