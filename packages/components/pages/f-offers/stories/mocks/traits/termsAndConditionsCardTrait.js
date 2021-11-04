import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Terms_And_Conditions_Card';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        line_3: faker.lorem.sentence(),
        line_4: faker.lorem.sentence()
    })
});
