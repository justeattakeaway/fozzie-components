import { mount } from '@vue/test-utils';
import errorBoundary from './TestErrorBoundary.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';

describe('RestaurantCard.v1', () => {
    describe('Error Boundary', () => {
        const slotList = ['cuisines', 'new-label', 'ratings', 'meta-items', 'local-legend', 'badges', 'optional-items'];
        it.each(slotList)('Successfully Wraps %p Slot in Error Boundary', slot => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                [slot]: `<div ${slot}-slot></div>`
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData, slots });

            // assert
            expect(wrapper.find(`[error-boundary]>[${slot}-slot]`).exists()).toBe(true);
        });

        it('Successfully Passes Tier to Error Boundary', () => {
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

        it('Does not render error boundary when slots are empty', () => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {};

            // act
            const wrapper = mount(RestaurantCardV1, { propsData, slots });

            // assert
            expect(wrapper.find('[error-boundary]').exists()).toBe(false);
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
