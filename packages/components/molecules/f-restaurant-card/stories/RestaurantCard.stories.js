// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import PieTokens from '@justeat/pie-design-tokens/dist/tokens.json';
import RestaurantCard from '../src/components/RestaurantCard.vue';
import restaurantLogo from './assets/images/mcdonalds-logo.gif';
import restaurantImage from './assets/images/mcdonalds.webp';

const badgeColourSchemes = {
    promoted: {
        text: PieTokens.theme.jet.color.alias.default['content-light'],
        background: PieTokens.theme.jet.color.alias.default['container-dark']
    },
    stampcards: {
        text: PieTokens.theme.jet.color.alias.default['content-default'],
        background: PieTokens.theme.jet.color.alias.default['support-brand-02']
    }
};

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const RestaurantCardComponent = (args, { argTypes }) => ({
    components: { RestaurantCard },
    props: Object.keys(argTypes),
    template:  `<restaurant-card v-bind="$props">
                    <template v-slot:new-label>
                        <p>Is New</p>
                    </template>
                </restaurant-card>`
});

RestaurantCardComponent.args = {
    data: {
        id: '00000',
        name: "McDonald's® - Clapham Junction",
        disabled: false,
        logoUrl: restaurantLogo,
        imgUrl: restaurantImage,
        isListItem: true,
        url: 'some-restaurant/12345',
        cuisines: ['Mexican', 'Burgers', 'Chinese'],
        imageBadges: [{ text: 'Promoted', textColour: badgeColourSchemes.promoted.text, backgroundColour: badgeColourSchemes.promoted.background }, { text: 'StampCards', textColour: badgeColourSchemes.stampcards.text, backgroundColour: badgeColourSchemes.stampcards.background }],
        contentBadges: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test badge that hopefully never happens' }],
        newBadgeText: 'NEW',
        deliveryTimeData: {
            address: 'Fleet Place House, 2 Fleet Pl, London EC4M 7RF, The United Kingdom of Great Britain and Northern Ireland',
            distance: '1.35 miles',
            distanceForScreenReaders: '1.35 miles from your location',
            eta: '20-25 min',
            etaForScreenReaders: 'delivery estimate 20 to 25 minutes'
        }
    },

    flags: {
        fancyNewTitle: false,
        experimentalBadges: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
