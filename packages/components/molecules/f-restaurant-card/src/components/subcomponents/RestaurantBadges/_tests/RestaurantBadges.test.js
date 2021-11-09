import { shallowMount } from '@vue/test-utils';
import RestaurantBadges from '../RestaurantBadges.vue';

describe('RestaurantBadges component', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            testIdPosition: 'foo',
            badges: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test badge that hopefully never happens' }]
        };

        // act
        const wrapper = shallowMount(RestaurantBadges, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('correctly renders a test-id data attribute using the "testIdPosition" prop', () => {
        // arrange
        const testIdPosition = 'foo';
        const propsData = {
            testIdPosition,
            badges: [{ text: 'BTA Winner' }]
        };

        // act
        const wrapper = shallowMount(RestaurantBadges, { propsData });

        // assert
        expect(wrapper.attributes('data-test-id')).toMatch('restaurant-foo-badges');
    });

    it('renders a RestaurantBadge component for every badge passed in as props', () => {
        // arrange
        const testIdPosition = 'foo';
        const propsData = {
            testIdPosition,
            badges: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }]
        };

        // act
        const wrapper = shallowMount(RestaurantBadges, { propsData });

        // assert
        expect(wrapper.findAll('restaurant-badge-stub').length).toBe(propsData.badges.length);
    });
});
