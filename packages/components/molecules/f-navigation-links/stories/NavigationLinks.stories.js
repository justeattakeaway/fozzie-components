// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import NavigationLinks from '../src/components/NavigationLinks.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const NavigationLinksComponent = (args, { argTypes }) => ({
    components: { NavigationLinks },
    props: Object.keys(argTypes),
    template: '<navigation-links v-bind="$props" />'
});

NavigationLinksComponent.storyName = 'f-navigation-links';

/**
 * Arguments without specified controls
 * @type {{Id: string}}
 */
NavigationLinksComponent.args = {
    links: [
        {
            Id: 'link1',
            url: '/account/info',
            name: 'Your account',
            selected: false
        },
        {
            Id: 'link2',
            url: '/order-history',
            name: 'Your orders',
            selected: false
        },
        {
            Id: 'link3',
            url: '/account/paymentoptions',
            name: 'Your saved cards',
            selected: false
        },
        {
            Id: 'link4',
            url: '/member/addressbook',
            name: 'Your address book',
            selected: false
        },
        {
            Id: 'link5',
            url: '/account/credit',
            name: 'Redeem a voucher',
            selected: false
        },
        {
            Id: 'link6',
            url: '/giftcards/redeem',
            name: 'Redeem a gift card',
            selected: false
        },
        {
            Id: 'link7',
            url: '/account/preferences',
            name: 'Contact preferences',
            selected: true
        }
    ]
};
