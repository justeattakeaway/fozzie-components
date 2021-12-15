/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils';
import sut from '../RestaurantDish.vue';

describe('RestaurantDish.vue', () => {
    it('is defined', () => {
        // act
        const wrapper = mount(sut);

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('displays name prop', () => {
        // arrange
        const propsData = {
            name: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-name"]').exists()).toBe(true);
    });

    it('displays calories if value is passed as prop', () => {
        // arrange
        const propsData = {
            calories: '12345kcal'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-calories"]').exists()).toBe(true);
    });

    it('does not display calories if value is null', () => {
        // arrange
        const propsData = {
            calories: null
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-calories"]').exists()).toBe(false);
    });

    it('does not display calories if value is not passed as prop', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-calories"]').exists()).toBe(false);
    });

    it('displays price if value is passed as prop', () => {
        // arrange
        const propsData = {
            price: '£2.79'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-price"]').exists()).toBe(true);
    });

    it('does not display price if value is null', () => {
        // arrange
        const propsData = {
            price: null
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-price"]').exists()).toBe(false);
    });

    it('does not display price if value is not passed as prop', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-dish-price"]').exists()).toBe(false);
    });
});
