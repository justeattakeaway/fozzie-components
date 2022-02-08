import { mount, config } from '@vue/test-utils';
import mockCssModules from 'root/test/utils/mockCSSModules';
import RestaurantImage from '../RestaurantImage.vue';

// Mocks CSS modules and allows for their testing
mockCssModules(config);

describe('RestaurantBadge component', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            imgUrl: '/foo/bar'
        };

        // act
        const wrapper = mount(RestaurantImage, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should contain the correct css class', () => {
        // arrange
        const propsData = {
            imgUrl: '/foo/bar'
        };

        const expectedResult = ['c-restaurantCard-img'];

        // act
        const wrapper = mount(RestaurantImage, { propsData });

        // assert
        expect(wrapper.classes()).toStrictEqual(expectedResult);
    });

    it('sets the background image to the imgUrl prop provided', () => {
        // arrange
        const propsData = {
            imgUrl: 'img/mcdonalds.258a7ec0.webp'
        };

        // act
        const wrapper = mount(RestaurantImage, { propsData });

        // assert
        expect(wrapper.attributes('style')).toMatch('background-image: url(img/mcdonalds.258a7ec0.webp);');
    });
});
