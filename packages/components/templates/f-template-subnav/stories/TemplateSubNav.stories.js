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
            to: '/account/info',
            name: 'Your account'
        },
        {
            id: 'link2',
            to: '/order-history',
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
