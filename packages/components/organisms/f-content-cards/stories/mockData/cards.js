import faker from 'faker';
import sha1 from 'crypto-js/sha1';

/* eslint-disable camelcase */
const cardTypes = {
    Anniversary_Card_1: {
        label: 'Anniversary 1',
        fields: ['button_1', 'line_3', 'background_image_1', 'voucher_code']
    },
    Header_Card: {
        label: 'Header',
        fields: ['background_color']
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
    Promotion_Card_1: {
        label: 'Promotion 1',
        fields: ['image_1', 'button_1', 'line_3', 'line_4', 'line_5', 'line_6', 'offer_auth_required']
    },
    Promotion_Card_2: {
        label: 'Promotion 2',
        fields: ['icon_1', 'button_1', 'line_3', 'image_1']
    },
    Recommendation_Card_1: {
        label: 'Recommendation',
        fields: ['line_3', 'image_1']
    },
    Restaurant_FTC_Offer_Card: {
        label: 'Restaurant FTC Offer',
        fields: ['subtitle', 'banner', 'footer', 'restaurant_id', 'restaurant_logo_url', 'restaurant_image_url', 'offer_auth_required']
    },
    Terms_And_Conditions_Card: {
        label: 'Terms and Conditions',
        fields: ['line3', 'line4']
    },
    Terms_And_Conditions_Card_2: {
        label: 'Terms and Conditions 2',
        fields: []
    },
    Voucher_Card_1: {
        label: 'Voucher',
        fields: ['button_1', 'line_3', 'voucher_code', 'image_1', 'icon_1']
    },
    Stamp_Card_1: {
        label: 'Stamp Card',
        fields: ['line_3', 'discount_percentage', 'earned_stamps', 'expiry_date', 'expiry_line', 'is_ready_to_claim', 'total_required_stamps']
    }
};
/* eslint-enable camelcase */

const randomSentence = faker.lorem.sentence.bind(faker.lorem, undefined, undefined);
const randomColour = faker.internet.color.bind(faker.internet, undefined, undefined, undefined);

/* eslint-disable camelcase */
/**
 * A POJO map of fieldname to generator function that will predictably generate the correct type
 * @type {Object}
 */
const fieldTypeToFaker = {
    background_color: randomColour,
    background_image_1: type => `https://picsum.photos/seed/${type}_background_image_1/384/216?blur=3`,
    banner: randomSentence,
    brand_name: faker.commerce.product.bind(faker.commerce),
    button_1: faker.lorem.words.bind(faker.lorem, undefined),
    content_container_background: randomColour,
    display_times_json: () => ({
        Any: [
            { Start: '00:00', End: '23:59' }
        ]
    }),
    discount_percentage: faker.random.number.bind(faker.random, { min: 1, max: 99 }),
    earned_stamps: faker.random.number.bind(faker.random, { min: 1, max: 4 }),
    expiry_date: faker.random.number.bind(faker.random, { min: 1, max: 4 }),
    expiry_line: randomSentence,
    footer: randomSentence,
    headline: randomSentence,
    icon_1: type => `https://picsum.photos/seed/${type}_icon_1/48/48`,
    is_ready_to_claim: () => false,
    image_1: type => `https://picsum.photos/seed/${type}_image_1/384/216?blur=3`,
    line3: randomSentence,
    line4: randomSentence,
    line_3: randomSentence,
    line_4: randomSentence,
    line_5: randomSentence,
    line_6: randomSentence,
    offer_auth_required: faker.random.boolean.bind(faker.random),
    restaurant_id: faker.random.number.bind(faker.random, { min: 100, max: 999999 }),
    restaurant_image_url: type => `https://picsum.photos/seed/${type}_restaurant_image_url/384/216?blur=3`,
    restaurant_logo_url: type => `https://picsum.photos/seed/${type}_restaurant_logo_url/48/48`,
    subtitle: randomSentence,
    total_required_stamps: () => 5,
    voucher_code: faker.lorem.slug.bind(faker.lorem, undefined)
};
/* eslint-enable camelcase */

/**
 * A set of key types to label as expected by the 'options' knob in storybook
 *
 * @type {any}
 */
export const labelledMultiSelectAllowedValues = Object.fromEntries(Object.entries(cardTypes)
    .map(([key, { label }]) => [label, key]));

function timeRange10HoursAroundNow () {
    const now = Math.floor(Date.now() / 1000);
    return {
        nowPlus5Hours: now + 60 * 60 * 5,
        nowMinus5Hours: now - 60 * 60 * 5
    };
}

/**
 * Predictably generates a number from a given string by performing a sha-1 hash
 * and extracting the first four bytes as a 32 bit integer
 * @param type
 * @return {number}
 */
function seedFromType (type) {
    const cryptoHash = sha1(type);
    return cryptoHash.words[0];
}

function seededRandomCardOfType (type) {
    faker.seed(seedFromType(type));
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

            e[field] = fieldTypeToFaker[field](type);
        });

    const id = btoa([`5d79109d167e923a83d3d7db_$_cc=${faker.random.uuid()}`, 'mv=5d79109d167e923a83d3d7dd', 'pi=cmp'].join('&'));
    const tt = faker.lorem.sentence(3);
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
        i: (type === 'Anniversary_Card_1'
            ? `https://picsum.photos/seed/${type}_i/109/96`
            : `https://picsum.photos/seed/${type}_i/384/216?blur=3`),
        u: null,
        uw: null,
        tt,
        ds,
        dm
    };
}

/**
 * Generates a set of predictable faked cards wrapped in data format expected by the braze SDK
 *
 * @return {Object}
 */
export default () => {
    const { nowMinus5Hours } = timeRange10HoursAroundNow();

    return {
        cards: [
            seededRandomCardOfType('Terms_And_Conditions_Card'),
            seededRandomCardOfType('Terms_And_Conditions_Card_2'),
            seededRandomCardOfType('Header_Card'),
            seededRandomCardOfType('Voucher_Card_1'),
            seededRandomCardOfType('Recommendation_Card_1'),
            seededRandomCardOfType('Promotion_Card_1'),
            seededRandomCardOfType('Promotion_Card_2'),
            seededRandomCardOfType('Home_Promotion_Card_1'),
            seededRandomCardOfType('Home_Promotion_Card_2'),
            seededRandomCardOfType('Post_Order_Card_1'),
            seededRandomCardOfType('Anniversary_Card_1'),
            seededRandomCardOfType('Restaurant_FTC_Offer_Card'),
            seededRandomCardOfType('Stamp_Card_1')
        ],
        /* eslint-disable camelcase */
        last_full_sync_at: nowMinus5Hours,
        last_card_updated_at: nowMinus5Hours,
        full_sync: true
        /* eslint-enable camelcase */
    };
};
