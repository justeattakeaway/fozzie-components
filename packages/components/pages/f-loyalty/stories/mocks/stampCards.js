import { faker } from '@faker-js/faker';

faker.seed(194367);

const generateStampCards = numberOfCards => [...Array.from({ length: numberOfCards })].map(() => ({
    v: false,
    cl: false,
    p: true,
    db: false,
    tp: 'short_news',
    ar: 1,
    u: '#',
    uw: '#',
    id: faker.datatype.uuid(),
    tt: faker.helpers.arrayElement(['The Castle and Banker', 'The Bishop of Ruislip Gardens', 'The Freelance', 'The Coat and Bear', 'The Woodman and Angel']),
    i: 'data:image/png;base64,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',
    url: null,
    e: {
        // eslint-disable-next-line camelcase
        custom_card_type: 'Stamp_Card_1',
        // eslint-disable-next-line camelcase
        discount_percentage: faker.helpers.arrayElement([10, 15]),
        // eslint-disable-next-line camelcase
        earned_stamps: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
        // eslint-disable-next-line camelcase
        expiry_date: faker.date.recent(),
        // eslint-disable-next-line camelcase
        expiry_line: faker.lorem.lines(1),
        // eslint-disable-next-line camelcase
        is_ready_to_claim: faker.helpers.arrayElement([true, false]),
        // eslint-disable-next-line camelcase
        total_required_stamps: 5,
        description: [faker.lorem.lines(1)]

    },
    ds: faker.lorem.lines(1)
}));

export default generateStampCards;
