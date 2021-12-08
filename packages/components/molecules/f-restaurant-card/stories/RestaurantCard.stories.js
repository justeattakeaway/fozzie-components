// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../src/components/RestaurantCard.vue';
import restaurantLogo from './assets/images/mcdonalds-logo.gif';
import restaurantImage from './assets/images/mcdonalds.webp';

export default {
    title: 'Components/Molecules/f-restaurant-card',
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
        name: 'McDonald\'s® - Clapham Junction',
        disabled: false,
        logoUrl: restaurantLogo,
        imgUrl: restaurantImage,
        isListItem: true,
        url: 'some-restaurant/12345',
        cuisines: ['Mexican', 'Burgers', 'Chinese'],
        tags: {
            imageTags: [{ text: 'Promoted', colorScheme: 'dark' }, { text: 'StampCards', colorScheme: 'warm' }],
            contentTags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test tag that hopefully never happens' }]
        },
        newTagText: 'new',
        rating: {
            isOwnRating: false,
            mean: 5.00,
            count: 1400,
            accessibleMessage: 'rated 5 stars out of 6',
            notRatedMessage: 'No ratings yet',
            isOwnRatingMessage: 'You'
        },
        deliveryTimeData: {
            address: 'Fleet Place House, 2 Fleet Pl, London EC4M 7RF, The United Kingdom of Great Britain and Northern Ireland',
            distance: '1.35 miles',
            eta: '20-25 min'
        },
        dishes: [
            {
                name: 'Sausage And Egg Mcmuffin its a really long dish name I hope never happens®',
                price: '£2.79',
                calories: '1234kcal'
            },
            {
                name: 'Fries (Large)',
                price: '£1.75',
                calories: '1234kcal'
            },
            {
                name: 'Fish and chips (XL)',
                price: '£19.95',
                calories: '1234kcal'
            },
            {
                name: 'Chicken nuggets',
                price: '£1.75',
                calories: '1234kcal'
            },
            {
                name: 'Lamb Korma',
                price: '£8.99',
                calories: '2234kcal'
            }
        ],
        offer: '30% off when you spend £20 - some really really long offer that hopefully never happens but we need to protect against just in case'
    },

    flags: {
        fancyNewTitle: false,
        experimentalTags: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
