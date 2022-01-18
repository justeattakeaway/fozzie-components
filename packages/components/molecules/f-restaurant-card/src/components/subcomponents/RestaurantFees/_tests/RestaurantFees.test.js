import { mount } from '@vue/test-utils';
import sut from '../RestaurantFees.vue';

describe('RestaurantFees.vue', () => {
    it('is defined', () => {
        // act
        const wrapper = mount(sut);

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('displays delivery fee if one exists', () => {
        // arrange
        const propsData = {
            deliveryFeeText: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-delivery"]').exists()).toBe(true);
    });

    it('displays `deliveryFeeText` text', () => {
        // arrange
        const propsData = {
            deliveryFeeText: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-delivery"]').text()).toStrictEqual(propsData.deliveryFeeText);
    });

    it('does not display delivery fee if none exists', () => {
        // arrange
        const propsData = {
            minOrderText: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-delivery"]').exists()).toBe(false);
    });

    it('displays minimum order if one exists', () => {
        // arrange
        const propsData = {
            minOrderText: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-min-order"]').exists()).toBe(true);
    });

    it('displays `minOrderText` text', () => {
        // arrange
        const propsData = {
            minOrderText: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-min-order"]').text()).toStrictEqual(propsData.minOrderText);
    });

    it('does not display minimum order if none exists', () => {
        // arrange
        const propsData = {
            deliveryFeeText: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-min-order"]').exists()).toBe(false);
    });

    it('displays both delivery fee and minimum order if both exist', () => {
        // arrange
        const propsData = {
            deliveryFeeText: 'foo',
            minOrderText: 'bar'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-delivery"]').exists()).toBe(true);
        expect(wrapper.find('[data-test-id="restaurant-fees-min-order"]').exists()).toBe(true);
    });

    it('displays both `deliveryFeeText` and `minOrderText` text', () => {
        // arrange
        const propsData = {
            deliveryFeeText: 'foo',
            minOrderText: 'bar'
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-delivery"]').text()).toStrictEqual(propsData.deliveryFeeText);
        expect(wrapper.find('[data-test-id="restaurant-fees-min-order"]').text()).toStrictEqual(propsData.minOrderText);
    });

    it('does not display anything if no delivery fee or minimum order exists', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-fees-delivery"]').exists()).toBe(false);
        expect(wrapper.find('[data-test-id="restaurant-fees-min-order"]').exists()).toBe(false);
    });
});
