import { shallowMount } from '@vue/test-utils';
import RestaurantTag from '../RestaurantTag.vue';

describe('RestaurantTag component', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            text: 'BTA Winner',
            textColor: '#fff',
            backgroundColor: '#222'
        };

        // act
        const wrapper = shallowMount(RestaurantTag, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('sets a "title" attribute to the text prop value', () => {
        // arrange
        const expectedTitle = 'BTA Winner';
        const propsData = {
            text: expectedTitle,
            textColor: '#fff',
            backgroundColor: '#222'
        };

        // act
        const wrapper = shallowMount(RestaurantTag, { propsData });

        // assert
        expect(wrapper.attributes('title')).toMatch(expectedTitle);
    });

    it('sets an "aria-label" attribute to the text prop value', () => {
        // arrange
        const expectedAriaLabelText = 'foo';
        const propsData = {
            text: 'bar',
            textColor: '#fff',
            backgroundColor: '#222',
            ariaLabel: expectedAriaLabelText
        };

        // act
        const wrapper = shallowMount(RestaurantTag, { propsData });

        // assert
        expect(wrapper.attributes('aria-label')).toMatch(expectedAriaLabelText);
    });

    it('does not set an "aria-label" attribute if no prop is provided', () => {
        // arrange
        const propsData = {
            text: 'bar',
            textColor: '#fff',
            backgroundColor: '#222'
        };

        // act
        const wrapper = shallowMount(RestaurantTag, { propsData });

        // assert
        expect(wrapper.attributes('aria-label')).toBe(undefined);
    });
});
