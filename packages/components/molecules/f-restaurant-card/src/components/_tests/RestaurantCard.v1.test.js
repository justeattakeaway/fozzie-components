import { mount } from '@vue/test-utils';
import errorBoundary from './TestErrorBoundary.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';

describe('RestaurantCard.v1', () => {
    describe('Error Boundary', () => {
        it('Error Boundary Successfully Mounts', () => {
            // arrange
            const propsData = {
                errorBoundary
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[error-boundary]').exists()).toBe(true);
        });

        it('Successfully Wraps Cuisine Slot in Error Boundary', () => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                cuisines: '<div cuisines-slot></div>'
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData, slots });

            // assert
            expect(wrapper.find('[error-boundary]>[cuisines-slot]').exists()).toBe(true);
        });

        it('Successfully Passes Tier to Cuisine Error Boundary', () => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                cuisines: '<div cuisines-slot></div>'
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData, slots });

            // assert
            expect(wrapper.find('[error-boundary][tier="3"]>[cuisines-slot]').exists()).toBe(true);
        });

        it('Can catch slot errors inside of the error boundary', done => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                cuisines: { template: '<div cuisines-slot></div>', mounted () { throw new Error(); } }
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData, slots });

            // assert
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('[error-boundary][error="true"]>[cuisines-slot]').exists()).toBe(true);
                done();
            });
        });
    });
});
