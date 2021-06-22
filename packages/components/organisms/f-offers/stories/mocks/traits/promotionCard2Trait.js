import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Promotion_Card_2';

/* eslint-disable camelcase */
export default trait({
    tt: () => `KFC I Love You Bacon Burger ${faker.random.number({ min: 1, max: 10 })}`,
    ds: () => 'Available Tuesdays',
    e: () => ({
        custom_card_type: type,
        button_1: 'Order now', // faker.random.word(),
        line_3: 'Order the KFC I Love You Bacon Burger, packed with smoked bacon, baconnaise and sweet Bacon Lovers’ Relish.', // faker.lorem.sentence(),
        image_1: `https://picsum.photos/seed/${type}_image_1/384/216?blur=3`,
        icon_1: `https://picsum.photos/seed/${type}_icon_1/48/48`
    })
});
