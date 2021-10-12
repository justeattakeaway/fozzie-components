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
    template:  `<restaurant-card v-bind="$props">
                    <template v-slot:cuisines>
                        <span>pizza</span>
                        -
                        <span>burgers</span>
                    </template>
                    <template v-slot:new-label>
                        <p>Is New</p>
                    </template>
                </restaurant-card>`
});

RestaurantCardComponent.args = {
    data: {
        id: '00000',
        name: 'Fake Restaurant',
        disabled: false,
        logoUrl: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/00000.gif',
        imgUrl: '',
        displayMode: 'mobile'
    },

    flags: {
        fancyNewTitle: false,
        experimentalBadges: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
