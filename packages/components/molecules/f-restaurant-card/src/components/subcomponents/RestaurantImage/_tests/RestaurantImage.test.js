import { mount } from '@vue/test-utils';
import RestaurantImage from '../RestaurantImage.vue';

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
