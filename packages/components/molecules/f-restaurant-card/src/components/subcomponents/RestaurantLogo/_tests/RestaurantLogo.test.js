import { mount, config } from '@vue/test-utils';
import mockCssModules from 'root/test/utils/mockCSSModules';
import RestaurantLogo from '../RestaurantLogo.vue';

// Mocks CSS modules and allows for their testing
mockCssModules(config);


describe('RestaurantLogo component', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            logoUrl: '/foo/bar'
        };

        // act
        const wrapper = mount(RestaurantLogo, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should contain the correct css class', () => {
        // arrange
        const propsData = {
            logoUrl: '/foo/bar'
        };

        const expectedResult = ['c-restaurantCard-logo'];

        // act
        const wrapper = mount(RestaurantLogo, { propsData });

        // assert
        expect(wrapper.classes()).toStrictEqual(expectedResult);
    });

    it('should add the hidden class on error', async () => {
        // arrange
        const propsData = {
            logoUrl: '/foo/bar'
        };

        const expectedResult = ['c-restaurantCard-logo', 'c-restaurantCard-logo--hidden'];

        // act
        const wrapper = mount(RestaurantLogo, { propsData });

        await wrapper.trigger('error');

        // assert
        expect(wrapper.classes()).toStrictEqual(expectedResult);
    });
});
