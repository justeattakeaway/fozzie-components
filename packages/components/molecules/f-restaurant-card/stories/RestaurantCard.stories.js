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
        imgUrl: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,h_161,w_436,d_uk:cuisines:caribbean-5.jpg/v1/uk/restaurants/123215.jpg',
        tileMode: true
    },

    flags: {
        fancyNewTitle: false,
        experimentalBadges: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
