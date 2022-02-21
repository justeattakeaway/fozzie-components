import { withA11y } from '@storybook/addon-a11y';
import RestaurantCard from '../../src/components/RestaurantCard.vue';
import restaurantLogo from '../assets/images/mcdonalds-logo.gif';
import restaurantImage from '../assets/images/mcdonalds.webp';
import availabilityTypes from '../../src/components/subcomponents/RestaurantAvailability/availabilityTypes';

export default {
    title: 'Components/Molecules/f-restaurant-card/RestaurantCard',
    decorators: [withA11y]
};

export const RestaurantCardVerboseComponent = (args, { argTypes }) => ({
    components: { RestaurantCard },
    props: Object.keys(argTypes),
    template:  `
    <div style="min-height: 100vh; display: grid; place-items: center;">
        <div style="width: 350px;">
            <restaurant-card v-bind="$props"/>
        </div>
    </div>`
});

RestaurantCardVerboseComponent.args = {
    id: '12345',
    name: 'McDonald\'s® - Clapham Junction',
    logoUrl: restaurantLogo,
    imgUrl: restaurantImage,
    isListItem: false,
    url: 'some-restaurant/12345',
    cuisines: ['Mexican', 'Burgers', 'Chinese'],
    tags: {
        imageTags: [{ text: 'Promoted', colorScheme: 'dark', testId: 'restaurant-sponsored' }, { text: 'StampCards', colorScheme: 'warm', ariaLabel: 'Stampcard Partner' }],
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
            calories: '345kcal'
        },
        {
            name: 'Fries (Large)',
            price: '£1.75',
            calories: '1250kcal',
            portion: '2 servings'
        },
        {
            name: 'Fish and chips (XL)',
            price: '£19.95',
            calories: '599kcal',
            portion: '1 serving'
        }
    ],
    offer: '30% off when you spend £20 - some really really long offer that hopefully never happens but we need to protect against just in case',
    isPremier: true,
    fees: {
        deliveryFeeText: '£2.50 delivery fee',
        minOrderText: 'No min. order'
    },
    availability: {
        availabilityType: availabilityTypes.PREORDER,
        availabilityTranslatedName: 'Pre-order',
        availabilityMessage: 'Opening at 13:20'
    }
};

RestaurantCardVerboseComponent.storyName = 'Online - Verbose Data';
