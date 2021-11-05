// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import PieTokens from '@justeat/pie-design-tokens/dist/tokens.json';
import RestaurantCard from '../src/components/RestaurantCard.vue';
import restaurantLogo from './assets/images/mcdonalds-logo.gif';
import restaurantImage from './assets/images/mcdonalds.webp';

const tagColourSchemes = {
    promoted: {
        text: PieTokens.theme.jet.color.alias.default['content-light'],
        background: PieTokens.theme.jet.color.alias.default['container-dark']
    },
    stampcards: {
        text: PieTokens.theme.jet.color.alias.default['content-default'],
        background: PieTokens.theme.jet.color.alias.default['support-brand-02']
    }
};

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
        tags: {
            imageTags: [{ text: 'Promoted', textColour: tagColourSchemes.promoted.text, backgroundColour: tagColourSchemes.promoted.background }, { text: 'StampCards', textColour: tagColourSchemes.stampcards.text, backgroundColour: tagColourSchemes.stampcards.background }],
            contentTags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test tag that hopefully never happens' }]
        },
        newTagText: 'new',
        rating: {
            isOwnRating: false,
            mean: 5.00,
            count: 1400,
            accessibleMessage: 'rated 5 stars out of 6',
            notRatedMessage: 'No ratings yet',
            isOwnRatingMessage: 'You',
            notRated: false
        },
        deliveryTimeData: {
            address: 'Fleet Place House, 2 Fleet Pl, London EC4M 7RF, The United Kingdom of Great Britain and Northern Ireland',
            distance: '1.35 miles',
            eta: '20-25 min'
        }
    },

    flags: {
        fancyNewTitle: false,
        experimentalTags: true
    },

    version: 'v1'
};

RestaurantCardComponent.storyName = 'f-restaurant-card';
