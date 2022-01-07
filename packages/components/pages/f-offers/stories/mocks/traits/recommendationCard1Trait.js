import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Recommendation_Card_1';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        line_3: faker.lorem.sentence(),
        image_1: `https://picsum.photos/seed/${type}_image_1/384/216?blur=3`
    })
});
