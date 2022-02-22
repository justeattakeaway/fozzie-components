import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../../src/components/RestaurantCard.vue';
import restaurantLogo from '../assets/images/mcdonalds-logo.gif';
import restaurantImage from '../assets/images/mcdonalds.webp';

export default {
    title: 'Components/Molecules/f-restaurant-card/RestaurantCard',
    decorators: [withA11y]
};

export const RestaurantCardMinimalComponent = (args, { argTypes }) => ({
    components: { RestaurantCard },
    props: Object.keys(argTypes),
    template:  `
    <div style="display: grid; place-items: center;">
        <div style="max-width: 350px;">
            <restaurant-card v-bind="$props"/>
        </div>
    </div>`
});

RestaurantCardMinimalComponent.args = {
    id: '12345',
    name: 'McDonald\'s® - Clapham Junction',
    logoUrl: restaurantLogo,
    imgUrl: restaurantImage,
    isListItem: false,
    url: 'some-restaurant/12345',
    cuisines: ['Mexican', 'Burgers'],
    tags: {
        imageTags: [{ text: 'Promoted', colorScheme: 'dark', testId: 'restaurant-sponsored' }],
        contentTags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }]
    },
    rating: {
        isOwnRating: false,
        mean: 5.00,
        count: 1400,
        accessibleMessage: 'rated 5 stars out of 6',
        notRatedMessage: 'No ratings yet',
        isOwnRatingMessage: 'You'
    },
    deliveryTimeData: {
        distance: '1.35 miles',
        eta: '20-25 min'
    },
    dishes: [
        {
            name: 'Sausage And Egg Mcmuffin its a really long dish name I hope never happens®',
            price: '£2.79',
            calories: '345kcal'
        }
    ],
    offer: '30% off when you spend £20',
    isPremier: false,
    fees: {
        deliveryFeeText: '£2.50 delivery fee',
        minOrderText: 'No min. order'
    }
};

RestaurantCardMinimalComponent.storyName = 'Online - Minimal Data';
