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

    it('styles the text and background colours based on props given', () => {
        // arrange
        const expectedTitle = 'BTA Winner';
        const propsData = {
            text: expectedTitle,
            textColour: '#fff',
            backgroundColour: '#2b3639'
        };

        // act
        const wrapper = shallowMount(RestaurantTag, { propsData });

        // assert
        expect(wrapper.attributes('style')).toMatch('color: rgb(255, 255, 255); background-color: rgb(43, 54, 57);');
    });
});
