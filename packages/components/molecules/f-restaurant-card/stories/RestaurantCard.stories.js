// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../src/components/RestaurantCard.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const RestaurantCardComponent = (args, { argTypes }) => ({
    components: { RestaurantCard },
    props: Object.keys(argTypes),
    template: '<restaurant-card v-bind="$props" />'
});

RestaurantCardComponent.args = {
    data: {
        address: '11 Foo Bar, Baz, XXX XXX',
        cuisines: ['kebabs', 'pizza', 'halal'],
        id: '00000',
        isNew: false,
        isPremier: false,
        isTemporarilyOffline: false,
        isTemporaryBoost: false,
        logo: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/00000.gif',
        name: 'Fake Restaurant',
        uniqueName: 'fakerestaurant-123'
    },

    flags: {
        fancyNewTitle: false,
        experimentalBadges: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
