import { shallowMount } from '@vue/test-utils';
import NavigationLinks from '../NavigationLinks.vue';

const propsData = {
    links: [
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
    ]
};

describe('NavigationLinks', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(NavigationLinks, { propsData });

        expect(wrapper.exists()).toBe(true);
    });

    it('should not fail if no `links` prop supplied', () => {
        const wrapper = shallowMount(NavigationLinks);

        expect(wrapper.html).toMatchSnapshot();
    });

    it('should display the list elements correctly for each `link` supplied', () => {
        const wrapper = shallowMount(NavigationLinks, { propsData });

        const links = wrapper.find('[data-test-id="navigationLinks"]');
        expect(links).toMatchSnapshot();
    });
});
