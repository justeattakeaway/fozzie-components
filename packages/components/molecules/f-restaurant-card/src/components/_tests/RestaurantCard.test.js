import { shallowMount } from '@vue/test-utils';
import RestaurantCard from '../RestaurantCard.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';
import restaurantCardVersions from '../restaurantCardVersions';

describe('RestaurantCard', () => {
    it('should be defined', () => {
        restaurantCardVersions.components = {
            v1: RestaurantCardV1
        };

        const propsData = {
            data: {},
            flags: {},
            version: 'v1'
        };

        const wrapper = shallowMount(RestaurantCard, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('renders v1 of the component if no version is provided', () => {
        restaurantCardVersions.components = {
            v1: RestaurantCardV1
        };

        const propsData = {
            data: {},
            flags: {}
        };

        const wrapper = shallowMount(RestaurantCard, { propsData });
        const childComponent = wrapper.findComponent(RestaurantCardV1);
        expect(childComponent.exists()).toBe(true);
    });

    it('renders the correct component version', () => {
        restaurantCardVersions.components = {
            v1: RestaurantCardV1
        };

        const propsData = {
            data: {},
            flags: {},
            version: 'v1'
        };

        const wrapper = shallowMount(RestaurantCard, { propsData });
        const childComponent = wrapper.findComponent(RestaurantCardV1);
        expect(childComponent.exists()).toBe(true);
    });

    it('does not render a component version that was not provided', () => {
        restaurantCardVersions.components = {
            v1: RestaurantCardV1
        };

        const propsData = {
            data: {},
            flags: {},
            version: 'v2'
        };

        const wrapper = shallowMount(RestaurantCard, { propsData });
        const childComponent = wrapper.findComponent(RestaurantCardV1);
        expect(childComponent.exists()).toBe(false);
    });

    it('does not render any markup if an invalid version is provided', () => {
        restaurantCardVersions.components = {
            v1: RestaurantCardV1
        };

        const propsData = {
            data: {},
            flags: {},
            version: 'a random string that is not a valid version key'
        };

        const wrapper = shallowMount(RestaurantCard, { propsData });
        expect(wrapper.html().length).toBe(0);
    });

    it('does not render any markup if no component versions exist', () => {
        restaurantCardVersions.components = {};

        const propsData = {
            data: {},
            flags: {},
            version: 'v1'
        };

        const wrapper = shallowMount(RestaurantCard, { propsData });
        expect(wrapper.html().length).toBe(0);
    });
});
