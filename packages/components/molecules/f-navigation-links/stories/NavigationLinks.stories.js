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
 * @type {{id: string}}
 */
NavigationLinksComponent.args = {
    links: [
        {
            id: 'link1',
            to: '/account/info',
            name: 'Your account'
        },
        {
            id: 'link2',
            href: '/order-history',
            name: 'Your orders'
        },
        {
            id: 'link3',
            to: '/account/paymentoptions',
            name: 'Your saved cards'
        },
        {
            id: 'link4',
            to: '/member/addressbook',
            name: 'Your address book'
        },
        {
            id: 'link5',
            to: '/account/credit',
            name: 'Redeem a voucher'
        },
        {
            id: 'link6',
            to: '/giftcards/redeem',
            name: 'Redeem a gift card'
        },
        {
            id: 'link7',
            to: '/account/preferences',
            name: 'Contact preferences'
        }
    ]
};
