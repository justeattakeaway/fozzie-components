import { mount } from '@vue/test-utils';
import errorBoundary from './mocks/MockErrorBoundary.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';

describe('RestaurantCard.v1', () => {
    describe('Error Boundary', () => {
        const slotList = ['new-label', 'ratings', 'meta-items', 'local-legend', 'badges', 'optional-items'];

        it.each(slotList)('Successfully wraps %p slot in error boundary', slot => {
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

        it('Successfully passes tier to error boundary', () => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                badges: '<div badges-slot></div>'
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData, slots });

            // assert
            expect(wrapper.find('[error-boundary][tier="3"]>[badges-slot]').exists()).toBe(true);
        });
    });

    describe('Restaurant cuisines', () => {
        it('should not be shown if there is no cuisines data', () => {
            // arrange
            const propsData = {
                cuisines: []
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-cuisines"]').exists()).toBe(false);
        });

        it('should be shown if there is cuisines data', () => {
            // arrange
            const propsData = {
                cuisines: ['Mexican', 'Burgers', 'Chinese']
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-cuisines"]').exists()).toBe(true);
        });
    });
});
