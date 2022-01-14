import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Stamp_Card_1';

/* eslint-disable camelcase */
export default trait({
    i: `https://picsum.photos/seed/${type}_i/384/165?blur=3`,
    e: () => ({
        custom_card_type: type,
        line_3: 'Your stamps will expire soon, use within 7 days...',
        expiry_line: 'Your stamps will expire soon, use within 7 days...',
        discount_percentage: 10,
        earned_stamps: faker.datatype.number(1, 5),
        expiry_date: faker.date.soon(),
        is_ready_to_claim: true,
        total_required_stamps: 5
    })
});
