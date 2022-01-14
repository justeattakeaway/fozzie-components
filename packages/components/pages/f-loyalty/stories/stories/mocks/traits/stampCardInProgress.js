import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Stamp_Card_1';

/* eslint-disable camelcase */
export default trait({
    i: `https://picsum.photos/seed/${type}_i/384/165?blur=3`,
    e: () => ({
        custom_card_type: type,
        line_3: 'hey',
        discount_percentage: 10,
        earned_stamps: faker.random.number(1, 5),
        expiry_date: faker.date.soon(),
        is_ready_to_claim: false,
        total_required_stamps: 5
    })
});
