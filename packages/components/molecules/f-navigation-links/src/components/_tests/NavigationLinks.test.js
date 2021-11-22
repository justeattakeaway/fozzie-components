import { shallowMount } from '@vue/test-utils';
import NavigationLinks from '../NavigationLinks.vue';

const propsData = {
    links: [
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
        },
        {
            id: 'link8',
            href: '/anchor-link',
            name: 'Anchor link'
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

    it('should pass to attribute to `<v-link>` when present', () => {
        const expected = '/account/info';
        const wrapper = shallowMount(NavigationLinks, {
            propsData: {
                links: [
                    {
                        id: 'link1',
                        to: expected,
                        name: 'Your account'
                    }]
            }
        });

        const link = wrapper.find('[data-test-id="link1"]');

        expect(link.attributes('to')).toEqual(expected);
    });

    it('should pass href attribute to `<v-link>` when present', () => {
        const expected = '/account/info';
        const wrapper = shallowMount(NavigationLinks, {
            propsData: {
                links: [
                    {
                        id: 'link1',
                        href: expected,
                        name: 'Your account'
                    }]
            }
        });

        const link = wrapper.find('[data-test-id="link1"]');

        expect(link.attributes('href')).toEqual(expected);
    });

    it('should pass href attribute to `<v-link>` when both `to` and `href` present in links data', () => {
        const expected = '/account/info';
        const wrapper = shallowMount(NavigationLinks, {
            propsData: {
                links: [
                    {
                        id: 'link1',
                        href: expected,
                        to: '/not-used',
                        name: 'Your account'
                    }]
            }
        });

        const link = wrapper.find('[data-test-id="link1"]');

        expect(link.attributes('href')).toEqual(expected);
        expect(link.attributes('to')).toBeUndefined();
    });

    it('should skip link item if both `to` and `href` missing in props.links object', () => {
        const wrapper = shallowMount(NavigationLinks, {
            propsData: {
                links: [
                    {
                        id: 'link1',
                        name: 'Your account'
                    },
                    {
                        id: 'link2',
                        to: '/account/info',
                        name: 'Your account'
                    }]
            }
        });

        const links = wrapper.find('[data-test-id="navigationLinks"]');
        const link = wrapper.find('[data-test-id="link1"]');

        expect(links.findAll('li').length).toEqual(1);
        expect(link.exists()).toBeFalsy();
    });

    describe('computed ::', () => {
        describe('filterLinks ::', () => {
            it('should filter props.links if link does not have `to` or `href` property', () => {
                const wrapper = shallowMount(NavigationLinks, {
                    propsData: {
                        links: [
                            {
                                id: 'link1',
                                name: 'Link 1'
                            },
                            {
                                id: 'link2',
                                to: '/account/info',
                                name: 'Your account'
                            },
                            {
                                id: 'link3',
                                name: 'Link 3',
                                href: '/link-3'
                            }]
                    }
                });

                const result = wrapper.vm.filterLinks;
                expect(result.length).toEqual(2);
                expect(result.find(x => x.id === 'link1')).toBeUndefined();
            });
        });
    });
});


