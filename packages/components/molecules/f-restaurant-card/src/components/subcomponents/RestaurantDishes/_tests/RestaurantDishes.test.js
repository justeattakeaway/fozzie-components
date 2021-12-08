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
                    calories: 'foo-calories'
                },
                {
                    name: 'bar',
                    price: 'bar-price',
                    calories: 'bar-calories'
                },
                {
                    name: 'baz',
                    price: 'baz-price',
                    calories: 'baz-calories'
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
                    calories: 'foo-calories'
                },
                null,
                {
                    name: 'baz',
                    price: 'baz-price',
                    calories: 'baz-calories'
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

    // it('appends the css class `c-restaurantCard-dishes--isListItem` when prop `isListItem` is true', () => {
    //     // arrange
    //     const propsData = {
    //         isListItem: true,
    //         dishes: [
    //             {
    //                 name: 'foo',
    //                 price: 'foo-price',
    //                 calories: 'foo-calories'
    //             }
    //         ]
    //     };

    //     // act
    //     const wrapper = mount(sut);
    //     console.log(wrapper.html());

    //     // assert
    //     expect(wrapper.find('c-restaurantCard-dishes--isListItem').exists()).toBe(true);
    // });

    it('does not appened the css class `c-restaurantCard-dishes--isListItem` when prop `isListItem` is false', () => {
        // arrange
        const propsData = {
            isListItem: false,
            dishes: [
                {
                    name: 'foo',
                    price: 'foo-price',
                    calories: 'foo-calories'
                }
            ]
        };

        // act
        const wrapper = mount(sut);

        // assert
        expect(wrapper.find('c-restaurantCard-dishes--isListItem').exists()).toBe(false);
    });
});
