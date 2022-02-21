import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../../src/components/RestaurantCard.vue';
import restaurantLogo from '../assets/images/mcdonalds-logo.gif';

export default {
    title: 'Components/Molecules/f-restaurant-card/RestaurantCard/ListItem',
    decorators: [withA11y]
};

export const RestaurantCardListItemOfflineComponent = (args, { argTypes }) => ({
    components: { RestaurantCard },
    props: Object.keys(argTypes),
    template:  '<restaurant-card v-bind="$props"/>'
});

RestaurantCardListItemOfflineComponent.args = {
    id: '12345',
    name: 'McDonald\'s® - Clapham Junction',
    logoUrl: restaurantLogo,
    imgUrl: null,
    isListItem: true,
    isPremier: false,
    url: 'some-restaurant/12345',
    cuisines: ['Mexican', 'Burgers', 'Chinese'],
    rating: {
        isOwnRating: false,
        mean: 5.00,
        count: 1400,
        accessibleMessage: 'rated 5 stars out of 6',
        notRatedMessage: 'No ratings yet',
        isOwnRatingMessage: 'You'
    },
    disabledMessage: 'Not taking orders at the moment'
};

RestaurantCardListItemOfflineComponent.storyName = 'Offline - List Item Mode';
