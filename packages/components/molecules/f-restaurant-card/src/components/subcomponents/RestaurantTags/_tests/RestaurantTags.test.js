import { shallowMount } from '@vue/test-utils';
import RestaurantTags from '../RestaurantTags.vue';

describe('RestaurantTags component', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            testIdPosition: 'foo',
            tags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test tag that hopefully never happens' }]
        };

        // act
        const wrapper = shallowMount(RestaurantTags, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('correctly renders a test-id data attribute using the "testIdPosition" prop', () => {
        // arrange
        const testIdPosition = 'foo';
        const propsData = {
            testIdPosition,
            tags: [{ text: 'BTA Winner' }]
        };

        // act
        const wrapper = shallowMount(RestaurantTags, { propsData });

        // assert
        expect(wrapper.attributes('data-test-id')).toMatch('restaurant-foo-tags');
    });

    it('renders a RestaurantBadge component for every tag passed in as props', () => {
        // arrange
        const testIdPosition = 'foo';
        const propsData = {
            testIdPosition,
            tags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }]
        };

        // act
        const wrapper = shallowMount(RestaurantTags, { propsData });

        // assert
        expect(wrapper.findAll('restaurant-tag-stub').length).toBe(propsData.tags.length);
    });
});
