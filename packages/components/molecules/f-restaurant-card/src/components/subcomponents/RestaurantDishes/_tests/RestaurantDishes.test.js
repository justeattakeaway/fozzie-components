/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils';
import sut from '../RestaurantDishes.vue';
import RestaurantDish from '../RestaurantDish.vue';

describe('RestaurantDishes.vue', () => {
    it('is defined', () => {
        // act
        const wrapper = mount(sut);

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('renders a `RestaurantDish` component for each dish item passed in the `dishes` prop', () => {
        // arrange
        const propsData = {
            dishes: [
                {
                    name: 'foo',
                    price: 'foo-price',
                    calories: 'foo-calories',
                    portion: 'foo-portion'
                },
                {
                    name: 'bar',
                    price: 'bar-price',
                    calories: 'bar-calories',
                    portion: 'bar-portion'
                },
                {
                    name: 'baz',
                    price: 'baz-price',
                    calories: 'baz-calories',
                    portion: 'baz-portion'
                }
            ]
        };

        const expectedDishCount = 3;

        // act
        const wrapper = mount(sut, { propsData });
        const dishes = wrapper.findAllComponents(RestaurantDish);

        // assert
        expect(dishes.length).toBe(expectedDishCount);
    });

    it('does not render a `RestaurantDish` component for any `dishes` prop items that are null', () => {
        // arrange
        const propsData = {
            dishes: [
                {
                    name: 'foo',
                    price: 'foo-price',
                    calories: 'foo-calories',
                    portion: 'foo-portion'
                },
                null,
                {
                    name: 'baz',
                    price: 'baz-price',
                    calories: 'baz-calories',
                    portion: 'baz-portion'
                }
            ]
        };

        const expectedDishCount = 2;

        // act
        const wrapper = mount(sut, { propsData });
        const dishes = wrapper.findAllComponents(RestaurantDish);

        // assert
        expect(dishes.length).toBe(expectedDishCount);
    });

    it.each([
        null,
        undefined
    ])('does not render any `RestaurantDish` components if `dishes` prop is %p', dishesProp => {
        // arrange
        const propsData = {
            dishes: dishesProp
        };

        const expectedDishCount = 0;

        // act
        const wrapper = mount(sut, { propsData });
        const dishes = wrapper.findAllComponents(RestaurantDish);

        // assert
        expect(dishes.length).toBe(expectedDishCount);
    });
});
