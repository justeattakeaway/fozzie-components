import { shallowMount } from '@vue/test-utils';
import RestaurantBadge from '../RestaurantBadge.vue';

describe('RestaurantBadge component', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            text: 'BTA Winner',
            textColor: '#fff',
            backgroundColor: '#222'
        };

        // act
        const wrapper = shallowMount(RestaurantBadge, { propsData });

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
        const wrapper = shallowMount(RestaurantBadge, { propsData });

        // assert
        expect(wrapper.attributes('title')).toMatch(expectedTitle);
    });

    it('styles the text and background colours with default colours if no colour props provided', () => {
        // arrange
        const expectedTitle = 'BTA Winner';
        const propsData = {
            text: expectedTitle
        };

        // act
        const wrapper = shallowMount(RestaurantBadge, { propsData });

        // assert
        expect(wrapper.attributes('style')).toMatch('color: rgb(36, 46, 48); background-color: rgb(245, 243, 241);');
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
        const wrapper = shallowMount(RestaurantBadge, { propsData });

        // assert
        expect(wrapper.attributes('style')).toMatch('color: rgb(255, 255, 255); background-color: rgb(43, 54, 57);');
    });
});
