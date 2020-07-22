import faker from 'faker';

/* eslint-disable camelcase */
const cardTypes = {
    Terms_And_Conditions_Card: {
        label: 'Terms and Conditions',
        fields: ['line3', 'line4']
    },
    Terms_And_Conditions_Card_2: {
        label: 'Terms and Conditions 2',
        fields: []
    },
    Header_Card: {
        label: 'Header',
        fields: ['background_color']
    },
    Voucher_Card_1: {
        label: 'Voucher',
        fields: ['button_1', 'line_3', 'voucher_code', 'image_1', 'icon_1']
    },
    Recommendation_Card_1: {
        label: 'Recommendation',
        fields: ['line_3', 'image_1']
    },
    Promotion_Card_1: {
        label: 'Promotion 1',
        fields: ['image_1', 'button_1', 'line_3', 'line_4', 'line_5', 'line_6', 'offer_auth_required']
    },
    Promotion_Card_2: {
        label: 'Promotion 2',
        fields: ['icon_1', 'button_1', 'line_3', 'image_1']
    },
    Home_Promotion_Card_1: {
        label: 'Home Promotion 1',
        fields: ['icon_1', 'button_1', 'background_color', 'content_container_background', 'display_times_json', 'brand_name']
    },
    Home_Promotion_Card_2: {
        label: 'Home Promotion 2',
        fields: ['button_1', 'background_color', 'display_times_json', 'brand_name']
    },
    Post_Order_Card_1: {
        label: 'Post Order 1',
        fields: ['button_1', 'headline', 'image_1', 'icon_1']
    },
    Anniversary_Card_1: {
        label: 'Anniversary 1',
        fields: ['button_1', 'line_3', 'background_image_1', 'voucher_code']
    },
    Restaurant_FTC_Offer_Card: {
        label: 'Restaurant FTC Offer',
        fields: ['subtitle', 'banner', 'footer', 'restaurant_id', 'restaurant_logo_url', 'restaurant_image_url', 'offer_auth_required']
    }
};

const fieldTypeToFaker = {
    background_color: faker.internet.color.bind(faker.internet),
    background_image_1: () => 'https://picsum.photos/seed/background_image_1/384/216?blur=3',
    banner: faker.lorem.sentence.bind(faker.lorem),
    brand_name: faker.commerce.product.bind(faker.commerce),
    button_1: faker.lorem.words.bind(faker.lorem),
    content_container_background: faker.internet.color.bind(faker.internet),
    display_times_json: () => ({
        Any: [
            { Start: '00:00', End: '23:59' }
        ]
    }),
    footer: faker.lorem.sentence.bind(faker.lorem),
    headline: faker.lorem.sentence.bind(faker.lorem),
    icon_1: () => 'https://picsum.photos/seed/icon_1/48/48',
    image_1: () => 'https://picsum.photos/seed/image_1/384/216?blur=3',
    line3: faker.lorem.sentence.bind(faker.lorem),
    line4: faker.lorem.sentence.bind(faker.lorem),
    line_3: faker.lorem.sentence.bind(faker.lorem),
    line_4: faker.lorem.sentence.bind(faker.lorem),
    line_5: faker.lorem.sentence.bind(faker.lorem),
    line_6: faker.lorem.sentence.bind(faker.lorem),
    offer_auth_required: faker.random.boolean.bind(faker.random),
    restaurant_id: faker.random.number.bind(faker.random, { min: 100, max: 999999 }),
    restaurant_image_url: () => 'https://picsum.photos/seed/restaurant_image_url/384/216?blur=3',
    restaurant_logo_url: () => 'https://picsum.photos/seed/restaurant_logo_url/48/48',
    subtitle: faker.lorem.sentence.bind(faker.lorem),
    voucher_code: faker.lorem.slug.bind(faker.lorem)
};
/* eslint-enable camelcase */

/**
 * A set of key types to label as expected by the 'options' knob in storybook
 *
 * @type {any}
 */
export const labelledMultiSelectAllowedValues = Object.fromEntries(Object.keys(cardTypes)
    .map(key => [key, cardTypes[key].label]));

function timeRange10HoursAroundNow () {
    const now = Math.floor(Date.now() / 1000);
    return {
        nowPlus5Hours: now + 60 * 60 * 5,
        nowMinus5Hours: now - 60 * 60 * 5
    };
}

function randomCardOfType (type) {
    const { nowMinus5Hours, nowPlus5Hours } = timeRange10HoursAroundNow();

    const e = {
        /* eslint-disable camelcase */
        custom_card_type: type
        /* eslint-enable camelcase */
    }; // extra fields

    cardTypes[type].fields
        .forEach(field => {
            if (!fieldTypeToFaker[field]) {
                console.log(`Invalid field: ${field}`);
                return;
            }

            e[field] = fieldTypeToFaker[field]();
        });

    const id = btoa([`5d79109d167e923a83d3d7db_$_cc=${faker.random.uuid()}`, 'mv=5d79109d167e923a83d3d7dd', 'pi=cmp'].join('&'));
    const tt = faker.lorem.sentence();
    const ds = faker.lorem.sentence();
    const dm = faker.internet.domainName();

    return {
        id,
        v: false,
        cl: false,
        p: true,
        db: false,
        ca: nowMinus5Hours,
        ea: nowPlus5Hours,
        e,
        tp: 'short_news',
        ar: 1,
        i: null,
        u: null,
        uw: null,
        tt,
        ds,
        dm
    };
}

/**
 * Generates a set of faked cards wrapped in data format expected by the braze SDK
 *
 * @return {Object}
 */
export default () => {
    const { nowMinus5Hours } = timeRange10HoursAroundNow();

    return {
        cards: [
            randomCardOfType('Terms_And_Conditions_Card'),
            randomCardOfType('Terms_And_Conditions_Card_2'),
            randomCardOfType('Header_Card'),
            randomCardOfType('Voucher_Card_1'),
            randomCardOfType('Recommendation_Card_1'),
            randomCardOfType('Promotion_Card_1'),
            randomCardOfType('Promotion_Card_2'),
            randomCardOfType('Home_Promotion_Card_1'),
            randomCardOfType('Home_Promotion_Card_2'),
            randomCardOfType('Post_Order_Card_1'),
            randomCardOfType('Anniversary_Card_1'),
            randomCardOfType('Restaurant_FTC_Offer_Card')
        ],
        /* eslint-disable camelcase */
        last_full_sync_at: nowMinus5Hours,
        last_card_updated_at: nowMinus5Hours,
        full_sync: true
        /* eslint-enable camelcase */
    };
};
