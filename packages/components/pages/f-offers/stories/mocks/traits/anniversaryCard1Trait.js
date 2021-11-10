import { trait } from 'miragejs';
import faker from 'faker';

const type = 'Anniversary_Card_1';

/* eslint-disable camelcase */
export default trait({
    tt: () => 'It’s our anniversary!',
    ds: () => 'It’s been a year since your first order.',
    e: () => ({
        custom_card_type: type,
        button_1: faker.random.word(),
        line_3: 'Here’s £5 off to celebrate that!',
        image_1: `https://picsum.photos/seed/${type}_background_image_1/384/216?blur=3`,
        voucher_code: 'Code1234455'
    })
});
