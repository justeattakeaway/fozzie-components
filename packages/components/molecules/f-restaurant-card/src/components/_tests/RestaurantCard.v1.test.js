import { mount } from '@vue/test-utils';
import errorBoundary from './mocks/MockErrorBoundary.vue';
import RestaurantCardV1 from '../RestaurantCard.v1.vue';

describe('RestaurantCard.v1', () => {
    describe('Error Boundary', () => {
        const slotList = ['meta-items', 'optional-items'];

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
                'meta-items': '<div meta-items-slot></div>'
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData,
                slots
            });

            // assert
            expect(wrapper.find('[error-boundary][tier="3"]>[meta-items-slot]').exists()).toBe(true);
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

        it('Successfully wraps "new" RestaurantTag component in error boundary', () => {
            // arrange
            const newTagText = 'NEW';
            const propsData = {
                errorBoundary,
                newTagText: 'NEW'
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find(`[error-boundary]>[data-test-id="restaurant-tag"][title="${newTagText}"`).exists()).toBe(true);
        });

        it('Successfully wraps inner-content RestaurantTags component in error boundary', () => {
            // arrange
            const propsData = {
                errorBoundary,
                tags: {
                    contentTags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test tag that hopefully never happens' }]
                }
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[error-boundary]>[data-test-id="restaurant-inner-content-tags"]').exists()).toBe(true);
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

    describe('Restaurant tags - inner content', () => {
        it('should render if tags are provided', () => {
            // arrange
            const propsData = {
                tags: {
                    contentTags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test tag that hopefully never happens' }]
                }
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-tags"]').exists()).toBe(true);
        });

        it('should not render if no tags are provided', () => {
            // act
            const wrapper = mount(RestaurantCardV1);

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-tags"]').exists()).toBe(false);
        });

        it('should not render if an empty tag list is provided', () => {
            // arrange
            const propsData = {
                contentTags: []
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-tags"]').exists()).toBe(false);
        });
    });

    describe('Restaurant Rating', () => {
        it('renders rating component', () => {
            // arrange
            const propsData = {
                rating: {
                    isOwnRating: false,
                    mean: 5.45,
                    count: 1400,
                    accessibleMessage: 'rated 5 stars out of 6',
                    notRatedMessage: 'No ratings yet',
                    isOwnRatingMessage: 'You'
                }
            };

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-rating"]').exists()).toBe(true);
        });

        it('renders rating component when state missing', () => {
            // arrange
            const propsData = {};

            // act
            const wrapper = mount(RestaurantCardV1, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-rating"]').exists()).toBe(true);
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

    describe('Offer', () => {
        it('displays an offer if one is provided', () => {
            // arrange
            const propsData = {
                offer: 'foo bar baz'
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-offer"]').exists()).toBe(true);
        });

        it.each([
            null,
            undefined,
            ''
        ])('does not display an offer if none exists', offer => {
            // arrange
            const propsData = {
                offer
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-offer"]').exists()).toBe(false);
        });
    });

    describe('Local Legend', () => {
        it('should show Local Legends when restaurant is Premier', () => {
            // arrange
            const propsData = {
                isPremier: true

            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="local-legend-icon"]').exists()).toBe(true);
        });

        it('should not show Local Legends when restaurant is not Premier', () => {
            // arrange
            const propsData = {
                isPremier: false
            };

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="local-legend-icon"]').exists()).toBe(false);
        });

        it('should not show Local Legends when premier data is missing', () => {
            // arrange
            const propsData = {};

            // act
            const wrapper = mount(RestaurantCardV1, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="local-legend-icon"]').exists()).toBe(false);
        });
    });
});
