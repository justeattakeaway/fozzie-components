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
        restaurant: {
            id: '12345',
            name: 'Jamies Kebabs',
            url: '/restaurants/12345/menu',
            logoPath: 'some-path/to/logo.png',
            tempOffline: false
        },

        display: {
            ratings: true,
            cuisines: true,
            new: true,
            localLegend: false
        },


        cloudinaryEnabled: true
    },

    flags: {
        fancyNewTitle: false,
        experimentalBadges: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
