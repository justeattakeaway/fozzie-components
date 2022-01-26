import { mount, config } from '@vue/test-utils';
import RestaurantLogo from '../RestaurantLogo.vue';

// Allows for the testing of CSS module classes
config.mocks.$style = new Proxy({}, {
    get (_, name) {
        return name;
    }
});


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
