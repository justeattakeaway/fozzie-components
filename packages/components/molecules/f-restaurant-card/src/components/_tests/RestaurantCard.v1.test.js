import { mount } from '@vue/test-utils';
import errorBoundary from './mocks/MockErrorBoundary.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';

describe('RestaurantCard.v1', () => {
    describe('Error Boundary', () => {
        const slotList = ['ratings', 'meta-items', 'local-legend', 'optional-items'];

        it.each(slotList)('Successfully wraps %p slot in error boundary', slot => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                [slot]: `<div ${slot}-slot></div>`
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData,
                slots
            });

            // assert
            expect(wrapper.find(`[error-boundary]>[${slot}-slot]`).exists()).toBe(true);
        });

        it('Successfully passes tier to error boundary', () => {
            // arrange
            const propsData = {
                errorBoundary
            };

            const slots = {
                ratings: '<div ratings-slot></div>'
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData,
                slots
            });

            // assert
            expect(wrapper.find('[error-boundary][tier="3"]>[ratings-slot]').exists()).toBe(true);
        });

        it('Successfully wraps RestaurantCuisines component in error boundary', () => {
            // arrange
            const propsData = {
                errorBoundary,
                cuisines: ['Mexican', 'Burgers', 'Chinese']
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[error-boundary]>[data-test-id="restaurant-cuisines"]').exists()).toBe(true);
        });

        it('Successfully wraps "new" RestaurantBadge component in error boundary', () => {
            // arrange
            const newBadgeText = 'NEW';
            const propsData = {
                errorBoundary,
                newBadgeText: 'NEW'
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find(`[error-boundary]>[data-test-id="restaurant-badge"][title="${newBadgeText}"`).exists()).toBe(true);
        });

        it('Successfully wraps inner-content RestaurantBadges component in error boundary', () => {
            // arrange
            const propsData = {
                errorBoundary,
                contentBadges: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test badge that hopefully never happens' }]
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[error-boundary]>[data-test-id="restaurant-inner-content-badges"]').exists()).toBe(true);
        });
    });

    describe('Restaurant cuisines', () => {
        it('should not be shown if there is no cuisines data', () => {
            // arrange
            const propsData = {
                cuisines: []
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-cuisines"]').exists()).toBe(false);
        });

        it('should be shown if there is cuisines data', () => {
            // arrange
            const propsData = {
                cuisines: ['Mexican', 'Burgers', 'Chinese']
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-cuisines"]').exists()).toBe(true);
        });
    });

    describe('Restaurant badges - inner content', () => {
        it('should render if badges are provided', () => {
            // arrange
            const propsData = {
                contentBadges: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test badge that hopefully never happens' }]
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-badges"]').exists()).toBe(true);
        });

        it('should not render if no badges are provided', () => {
            // act
            const wrapper = mount(RestaurantCardV1);

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-badges"]').exists()).toBe(false);
        });

        it('should not render if an empty badge list is provided', () => {
            // arrange
            const propsData = {
                contentBadges: []
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-badges"]').exists()).toBe(false);
        });
    });

    describe('Delivery Time Meta', () => {
        it('should not be shown if there is no eta, distance or address data', () => {
            // arrange
            const propsData = {};

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-delivery-time-meta"]').exists()).toBe(false);
        });

        it.each(['eta', 'distance', 'address'])('should be shown if there is %p data', dataKey => {
            // arrange
            const propsData = {
                deliveryTimeData: {
                    [dataKey]: 'Test'
                }
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-delivery-time-meta"]').exists()).toBe(true);
        });
    });
});
