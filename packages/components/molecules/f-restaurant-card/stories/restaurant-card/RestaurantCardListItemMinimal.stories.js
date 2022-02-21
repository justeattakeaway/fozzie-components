import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../../src/components/RestaurantCard.vue';
import restaurantLogo from '../assets/images/mcdonalds-logo.gif';
import restaurantImage from '../assets/images/mcdonalds.webp';

export default {
    title: 'Components/Molecules/f-restaurant-card/RestaurantCard/ListItem',
    decorators: [withA11y]
};

export const RestaurantCardMinimalListItemComponent = (args, { argTypes }) => ({
    components: { RestaurantCard },
    props: Object.keys(argTypes),
    template:  '<restaurant-card v-bind="$props"/>'
});

RestaurantCardMinimalListItemComponent.args = {
    id: '12345',
    name: 'McDonald\'s® - Clapham Junction',
    logoUrl: restaurantLogo,
    imgUrl: restaurantImage,
    isListItem: true,
    url: 'some-restaurant/12345',
    cuisines: ['Mexican', 'Burgers', 'Chinese'],
    tags: {
        imageTags: [{ text: 'Promoted', colorScheme: 'dark', testId: 'restaurant-sponsored' }],
        contentTags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }]
    },
    newTagText: null,
    rating: {
        isOwnRating: false,
        mean: 5.00,
        count: 1400,
        accessibleMessage: 'rated 5 stars out of 6',
        notRatedMessage: 'No ratings yet',
        isOwnRatingMessage: 'You'
    },
    deliveryTimeData: {
        address: 'Fleet Place House, 2 Fleet Pl, London EC4M 7RF',
        distance: '1.35 miles',
        eta: '20-25 min'
    },
    dishes: [
        {
            name: 'Sausage And Egg Mcmuffin®',
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

RestaurantCardMinimalListItemComponent.storyName = 'Online - List Item Mode - Minimal Data';
