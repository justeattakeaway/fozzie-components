// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../src/components/RestaurantCard.vue';
import restaurantLogo from './assets/images/mcdonalds-logo.gif';
import restaurantImage from './assets/images/mcdonalds.webp';

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
        imageBadges: [{ text: 'Promoted', textColour: '#fff', backgroundColour: '#2b3639' }, { text: 'StampCards', textColour: '#242e30', backgroundColour: '#ffead4' }],
        contentBadges: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test badge that hopefully never happens' }],
        newBadgeText: 'NEW'
    },

    flags: {
        fancyNewTitle: false,
        experimentalBadges: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
