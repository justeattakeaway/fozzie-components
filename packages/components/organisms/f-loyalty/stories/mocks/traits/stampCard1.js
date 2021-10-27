import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Stamp_Card_1';

/* eslint-disable camelcase */
export default trait({
    e: () => ({
        custom_card_type: type,
        line_3: faker.lorem.sentence(),
        expiry_line: faker.lorem.sentence(),
        discount_percentage: 10,
        earned_stamps: faker.random.number(1, 5),
        expiry_date: faker.date.soon(),
        is_ready_to_claim: false,
        total_required_stamps: 5
    })
});
