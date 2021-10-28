import { shallowMount } from '@vue/test-utils';
import RestaurantCuisines from '../RestaurantCuisines.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';

describe('RestaurantCuisines', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            cuisines: ['Mexican', 'Burgers', 'Chinese']
        };

        // act
        const wrapper = shallowMount(RestaurantCuisines, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should not be shown if there is no cuisines data', () => {
        // arrange
        const propsData = {
            cuisines: []
        };

        // act
        const wrapper = shallowMount(RestaurantCardV1, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-cuisines"]').exists()).toBe(false);
    });

    it('should be shown if there is cuisines data', () => {
        // arrange
        const propsData = {
            cuisines: ['Mexican', 'Burgers', 'Chinese']
        };

        // act
        const wrapper = shallowMount(RestaurantCardV1, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-cuisines"]').exists()).toBe(true);
    });
});
