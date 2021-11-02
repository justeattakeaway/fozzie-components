import { shallowMount } from '@vue/test-utils';
import RestaurantCuisines from '../subcomponents/RestaurantCuisines.vue';

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
});
