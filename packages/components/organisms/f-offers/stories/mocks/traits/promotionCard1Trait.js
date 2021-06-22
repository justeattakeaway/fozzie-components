import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Promotion_Card_1';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        button_1: faker.random.word(),
        line_3: faker.lorem.sentence(),
        line_4: faker.lorem.sentence(),
        line_5: faker.lorem.sentence(),
        line_6: faker.lorem.sentence(),
        image_1: `https://picsum.photos/seed/${type}_image_1/384/216?blur=3`,
        offer_auth_required: faker.random.boolean()
    })
});
