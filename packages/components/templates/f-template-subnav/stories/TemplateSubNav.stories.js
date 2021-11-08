import { withA11y } from '@storybook/addon-a11y';
import TemplateSubNav from '../src/components/TemplateSubNav.vue';

export default {
    title: 'Components/Templates',
    decorators: [withA11y]
};

export const TemplateSubNavComponent = (args, { argTypes }) => ({
    components: { TemplateSubNav },
    props: Object.keys(argTypes),
    template: `<template-sub-nav
                    v-bind='$props'>
                    <div
                        :style="{'text-align':'center',
                                'border-radius': '12px',
                                'height': '500px',
                                'background-color': '#d3d3ff'}">
                        Dynamic Page goes here via a 'Slot'
                    </div>
               </template-sub-nav>`
});

TemplateSubNavComponent.storyName = 'f-template-subnav';

/**
 * Arguments without specified controls
 * @type {{routerLinks: boolean}}
 */
TemplateSubNavComponent.args = {
    navigationLinks: [
        {
            id: 'link1',
            url: '/account/info',
            name: 'Your account',
            selected: false
        },
        {
            id: 'link2',
            url: '/order-history',
            name: 'Your orders',
            selected: false
        },
        {
            id: 'link3',
            url: '/account/paymentoptions',
            name: 'Your saved cards',
            selected: false
        },
        {
            id: 'link4',
            url: '/member/addressbook',
            name: 'Your address book',
            selected: false
        },
        {
            id: 'link5',
            url: '/account/credit',
            name: 'Redeem a voucher',
            selected: false
        },
        {
            id: 'link6',
            url: '/giftcards/redeem',
            name: 'Redeem a gift card',
            selected: false
        },
        {
            id: 'link7',
            url: '/account/preferences',
            name: 'Contact preferences',
            selected: true
        }
    ],
    breadcrumbLinks: [
        {
            name: 'Home',
            url: '/',
            routerLink: false
        },
        {
            name: 'Contact Preferences'
        }
    ]
};
