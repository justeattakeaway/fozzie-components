/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils';
import sut from '../RestaurantDish.vue';

describe('RestaurantDish.vue', () => {
    const dishNameSelector = '[data-test-id="dishsearch-dish-item-name"]';
    const dishPriceSelector = '[data-test-id="dishsearch-dish-item-price"]';
    const dishCaloriesSelector = '[data-test-id="restaurant-dish-calories"]';
    const dishPortionSelector = '[data-test-id="restaurant-dish-portion"]';

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
        expect(wrapper.find(dishNameSelector).exists()).toBe(true);
    });

    it('displays calories if value is passed as prop', () => {
        // arrange
        const propsData = {
            calories: '12345kcal'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishCaloriesSelector).exists()).toBe(true);
    });

    it('does not display calories if value is null', () => {
        // arrange
        const propsData = {
            calories: null
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishCaloriesSelector).exists()).toBe(false);
    });

    it('does not display calories if value is not passed as prop', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishCaloriesSelector).exists()).toBe(false);
    });

    it('displays portion if portion and calories values are passed as props', () => {
        // arrange
        const propsData = {
            calories: '12345kcal',
            portion: '2 servings'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPortionSelector).exists()).toBe(true);
    });

    it('displays portion if value is passed as prop and calories are missing', () => {
        // arrange
        const propsData = {
            portion: '2 servings'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPortionSelector).exists()).toBe(true);
    });

    it('does not display portion if value is null', () => {
        // arrange
        const propsData = {
            portion: null
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPortionSelector).exists()).toBe(false);
    });

    it('does not display portion if value is not passed as prop', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPortionSelector).exists()).toBe(false);
    });

    it('displays price if value is passed as prop', () => {
        // arrange
        const propsData = {
            price: '£2.79'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPriceSelector).exists()).toBe(true);
    });

    it('does not display price if value is null', () => {
        // arrange
        const propsData = {
            price: null
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPriceSelector).exists()).toBe(false);
    });

    it('does not display price if value is not passed as prop', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find(dishPriceSelector).exists()).toBe(false);
    });
});
