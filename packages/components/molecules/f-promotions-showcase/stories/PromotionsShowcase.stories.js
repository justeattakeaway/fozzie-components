// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import PromotionsShowcase from '../src/components/PromotionsShowcase.vue';
import { STYLE_EMPHASIZED, STYLE_LINK } from '../src/constants';
import StampCardsLogo from './images/stampcards.svg';
import OffersLogo from './images/offers.svg';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

const stampcardsItem = {
    illustration: StampCardsLogo,
    title: 'StampCard restaurant',
    lines: [
        {
            text: 'Find out more',
            style: STYLE_LINK
        }
    ],
    link: () => console.log('hello!')
};

const offersItem = {
    illustration: OffersLogo,
    title: 'Offers',
    lines: [
        '20% off when you spend £20',
        '20% off when you spend £20',
        {
            text: 'More offers',
            style: STYLE_EMPHASIZED
        }
    ],
    link: {
        href: '/#i-m-a-link',
        target: '_blank',
        rel: 'noopener'
    }
};

const mapping = {
    Both: [offersItem, stampcardsItem],
    Offers: [offersItem],
    StampCards: [stampcardsItem],
    Neither: []
};

export const PromotionsShowcaseComponent = (args, { argTypes }) => ({
    components: { PromotionsShowcase },
    props: Object.keys(argTypes),
    template: '<promotions-showcase :items="getItems(items)" />',
    methods: {
        getItems (items) {
            return mapping[items];
        }
    }
});

PromotionsShowcaseComponent.argTypes = {
    items: {
        control: {
            type: 'select',
            options: Object.keys(mapping)
        },
        defaultValue: 'Both'
    }
};

PromotionsShowcaseComponent.storyName = 'f-promotions-showcase';
