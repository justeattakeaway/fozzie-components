import { shallowMount } from '@vue/test-utils';
import RestaurantCard from '../RestaurantCard.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';
import restaurantCardVersions from '../restaurantCardVersions';

describe('RestaurantCard', () => {
    it('should be defined', () => {
        // arrange
        restaurantCardVersions.components = {
            v1: RestaurantCardV1
        };

        const propsData = {
            data: {},
            flags: {},
            version: 'v1'
        };

        // act
        const wrapper = shallowMount(RestaurantCard, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('component version rendering', () => {
        it('renders v1 of the component if no version is provided', () => {
            // arrange
            restaurantCardVersions.components = {
                v1: RestaurantCardV1
            };

            const propsData = {
                data: {},
                flags: {}
            };

            // act
            const wrapper = shallowMount(RestaurantCard, { propsData });
            const childComponent = wrapper.findComponent(RestaurantCardV1);

            // assert
            expect(childComponent.exists()).toBe(true);
        });

        it('renders the correct component version', () => {
            // arrange
            restaurantCardVersions.components = {
                v1: RestaurantCardV1
            };

            const propsData = {
                data: {},
                flags: {},
                version: 'v1'
            };

            // act
            const wrapper = shallowMount(RestaurantCard, { propsData });
            const childComponent = wrapper.findComponent(RestaurantCardV1);

            // assert
            expect(childComponent.exists()).toBe(true);
        });

        it('does not render a component version that was not provided', () => {
            // arrange
            restaurantCardVersions.components = {
                v1: RestaurantCardV1
            };

            const propsData = {
                data: {},
                flags: {},
                version: 'v2'
            };

            // act
            const wrapper = shallowMount(RestaurantCard, { propsData });
            const childComponent = wrapper.findComponent(RestaurantCardV1);

            // assert
            expect(childComponent.exists()).toBe(false);
        });

        it('does not render any markup if an invalid version is provided', () => {
            // arrange
            restaurantCardVersions.components = {
                v1: RestaurantCardV1
            };

            const propsData = {
                data: {},
                flags: {},
                version: 'a random string that is not a valid version key'
            };

            // act
            const wrapper = shallowMount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.html().length).toBe(0);
        });

        it('does not render any markup if no component versions exist', () => {
            // arrange
            restaurantCardVersions.components = {};

            const propsData = {
                data: {},
                flags: {},
                version: 'v1'
            };

            // act
            const wrapper = shallowMount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.html().length).toBe(0);
        });
    });

    describe('slots', () => {
        it('renders slots in child component if any provided', () => {
            // arrange
            restaurantCardVersions.components = {
                v1: RestaurantCardV1
            };

            const propsData = {
                data: {},
                flags: {},
                version: 'v1'
            };

            // act
            const wrapper = shallowMount(RestaurantCard, {
                propsData,
                slots: {
                    cuisines: '<p class="data-test-cuisines-slot"> cuisines slot content</p>',
                    new: '<p class="data-test-new-slot">new label slot content</p>'
                }
            });

            const childComponent = wrapper.findComponent(RestaurantCardV1);

            // assert
            expect(childComponent.findAll('.data-test-cuisines-slot').length).toBe(1);
            expect(childComponent.findAll('.data-test-new-slot').length).toBe(1);
        });
    });
});
