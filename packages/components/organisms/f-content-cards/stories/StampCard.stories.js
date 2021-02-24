import StampCard1 from '../src/components/cardTemplates/StampCard1.vue';
import image from './images/an-viet.png';

const copy = {
    locale: 'en-EN',
    stampCardStatus: {
        0: 'Zero stamps earned out of five',
        1: 'One stamp earned out of five',
        2: 'Two stamps earned out of five',
        3: 'Three stamps earned out of five',
        4: 'Four stamps earned out of five',
        5: 'Five stamps earned out of five'
    }
};

export default {
    title: 'Components/Molecules/f-content-cards/stamp-card-1',
    argTypes: {
        testId: {
            control: { type: 'text' },
            description: 'Id for adding as attribute to card in test scenarios'
        },
        title: {
            control: { type: 'text' },
            description: 'Title text for the card - typically the restaurant name'
        },
        description: {
            control: { type: 'array', separator: '--' },
            description: 'Individual lines for the text in the inner card, lines separated by "--"'
        },
        image: {
            control: { type: 'text' },
            description: 'A url to the icon for the card - typically the restaurant logo'
        },
        url: {
            control: { type: 'text' },
            description: 'A url for the ongoing journey to order at the relevant restaurant'
        },
        discountPercentage: {
            control: { type: 'text' },
            description: 'Currently fixed - The percentage of each contributing order taken as the value off on the resulting card'
        },
        earnedStamps: {
            control: { type: 'range', min: 0, max: 5 },
            description: 'Gives the number of `completed` stamps for this card'
        },
        expiryDate: {
            control: { type: 'date' },
            description: 'Date of expiry of card'
        },
        expiryLine: {
            control: { type: 'text' },
            description: 'Braze-given line giving a description of when the card expires'
        },
        isReadyToClaim: {
            control: { type: 'boolean' },
            description: 'Should the card render as a `claimable` card'
        },
        totalRequiredStamps: {
            control: { type: 'number' },
            description: 'Currently fixed - How many `completed` stamps are required for the card to become `claimable`'
        }
    },
    args: {
        totalRequiredStamps: 5
    }
};

/**
 * Definition for story for In-Progress StampCard component
 */
export const InProgressStampCard1Component = (args, { argTypes }) => ({
    components: {
        StampCard: StampCard1
    },

    props: Object.keys(argTypes),

    /**
     * Stubbed copy for injecting when supplied card information is not complete
     * @return {{emitCardView: {Function}, emitCardClick: {Function}}}
     */
    provide () {
        return {
            copy,
            emitCardView () { },
            emitCardClick () { }
        };
    },

    template: '<stamp-card'
        + ' :test-id="testId"'
        + ' :card="{title, description, image, url, discountPercentage, earnedStamps, expiryDate, expiryLine, isReadyToClaim, subtitle, totalRequiredStamps}"'
        + '/>'
});

InProgressStampCard1Component.storyName = 'In Progress';

InProgressStampCard1Component.args = {
    testId: 'stampCard1-inProgress',
    title: 'An Viet',
    subtitle: 'You’ve accumulated £6.83 so far',
    description: [],
    image,
    url: 'https://example.com/the-burger-place',
    discountPercentage: 15,
    earnedStamps: 2,
    expiryDate: '2021-02-28T23:59:59',
    expiryLine: 'Discount expires',
    isReadyToClaim: false,
    totalRequiredStamps: 5
};

/**
 * Definition for story for Claimable StampCard component
 */
export const ClaimableStampCard1Component = (args, { argTypes }) => ({
    components: {
        StampCard: StampCard1
    },

    props: Object.keys(argTypes),

    /**
     * Stubbed copy for injecting when supplied card information is not complete
     * @return {{emitCardView: {Function}, emitCardClick: {Function}}}
     */
    provide () {
        return {
            copy,
            emitCardView () { },
            emitCardClick () { }
        };
    },

    template: '<stamp-card'
        + ' :test-id="testId"'
        + ' :card="{title, description, image, url, discountPercentage, earnedStamps, expiryDate, expiryLine, isReadyToClaim, subtitle, totalRequiredStamps}"'
        + '/>'
});

ClaimableStampCard1Component.storyName = 'Claimable';

ClaimableStampCard1Component.args = {
    testId: 'stampCard1-claimable',
    title: 'An Viet',
    subtitle: 'Time to claim your <strong>$20.75</strong> discount',
    description: [
        'This will be taken off your next order from this restaurant automatically (your order must be more than this discount).'
    ],
    image,
    url: 'https://example.com/an-viet',
    discountPercentage: 15,
    earnedStamps: 5,
    expiryDate: '2021-02-28T23:59:59',
    expiryLine: 'Discount expires',
    isReadyToClaim: true,
    totalRequiredStamps: 5
};
