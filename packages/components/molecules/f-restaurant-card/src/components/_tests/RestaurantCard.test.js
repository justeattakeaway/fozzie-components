import { mount } from '@vue/test-utils';
import RestaurantCard from '../RestaurantCard.vue';
import { EVENT_CLICK_RESTAURANT_CARD } from '../../constants/custom-events';
import RestaurantAvailability from '../subcomponents/RestaurantAvailability/RestaurantAvailability.vue';
import RestaurantDishes from '../subcomponents/RestaurantDishes/RestaurantDishes.vue';

describe('RestaurantCard', () => {
    describe('Restaurant cuisines', () => {
        it('should not be shown if there is no cuisines data', () => {
            // arrange
            const propsData = {
                cuisines: []
            };

            // act
            const wrapper = mount(RestaurantCard, {
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
            const wrapper = mount(RestaurantCard, {
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
            const wrapper = mount(RestaurantCard, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-tags"]').exists()).toBe(true);
        });

        it('should not render if no tags are provided', () => {
            // act
            const wrapper = mount(RestaurantCard);

            // assert
            expect(wrapper.find('[data-test-id="restaurant-inner-content-tags"]').exists()).toBe(false);
        });

        it('should not render if an empty tag list is provided', () => {
            // arrange
            const propsData = {
                contentTags: []
            };

            // act
            const wrapper = mount(RestaurantCard, {
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
            const wrapper = mount(RestaurantCard, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-rating"]').exists()).toBe(true);
        });

        it('does not render rating component when entire state missing', () => {
            // arrange
            const propsData = {};

            // act
            const wrapper = mount(RestaurantCard, {
                propsData
            });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-rating"]').exists()).toBe(false);
        });
    });

    describe('Delivery Time Meta', () => {
        it('should not be shown if there is no eta, distance or address data', () => {
            // arrange
            const propsData = {};

            // act
            const wrapper = mount(RestaurantCard, { propsData });

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
            const wrapper = mount(RestaurantCard, { propsData });

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
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-discounts"]').exists()).toBe(true);
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
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-offer"]').exists()).toBe(false);
        });
    });

    describe('Premier Restaurant', () => {
        it('should show Premier Tag when restaurant is Premier', () => {
            // arrange
            const propsData = {
                isPremier: true

            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-premier"]').exists()).toBe(true);
        });

        it('should not show Premier Tag when restaurant is not Premier', () => {
            // arrange
            const propsData = {
                isPremier: false
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-premier"]').exists()).toBe(false);
        });

        it('should not show Premier Tag when premier data is missing', () => {
            // arrange
            const propsData = {};

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-premier"]').exists()).toBe(false);
        });

        it.each([null, undefined])('should not show Premier Tag when premier data is %p', value => {
            // arrange
            const propsData = {
                isPremier: value
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-premier"]').exists()).toBe(false);
        });
    });

    describe('Restaurant dishes', () => {
        it('renders restaurant dishes component when some dishes exist', () => {
            // arrange
            const propsData = {
                dishes: [{ foo: 'bar' }]
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.findComponent(RestaurantDishes).exists()).toBe(true);
        });

        it.each([
            { dishes: null },
            { dishes: undefined },
            { dishes: [] },
            {}
        ])('does not render restaurant dishes component if no dishes exist', propsData => {
            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.findComponent(RestaurantDishes).exists()).toBe(false);
        });
    });

    describe('Restaurant Fees', () => {
        it.each([
            { fees: null },
            { fees: undefined },
            { fees: {} },
            {}
        ])('does not render if no fees state exists', propsData => {
            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-delivery-fees"]').exists()).toBe(false);
        });

        it('renders if there is a delivery fee', () => {
            // arrange
            const propsData = {
                fees: {
                    deliveryFeeText: 'foo'
                }
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-delivery-fees"]').exists()).toBe(true);
        });

        it('renders if there is a minimum order', () => {
            // arrange
            const propsData = {
                fees: {
                    minOrderText: 'foo'
                }
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-delivery-fees"]').exists()).toBe(true);
        });
    });

    describe('Disabled Message', () => {
        it('displays a disabled message if one is provided', () => {
            // arrange
            const propsData = {
                disabledMessage: 'foo bar baz'
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-offline"]').exists()).toBe(true);
        });

        it.each([
            null,
            undefined,
            ''
        ])('does not display a disabled message if none exists', disabledMessage => {
            // arrange
            const propsData = {
                disabledMessage
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.find('[data-test-id="restaurant-disabled"]').exists()).toBe(false);
        });
    });

    describe('Restaurant availability', () => {
        it('renders an availability component if data provided', () => {
            // arrange
            const propsData = {
                availability: {
                    availabilityType: 'COLLECTION',
                    availabilityTranslatedName: 'Pre-order',
                    availabilityMessage: 'Opening at 13:20'
                }
            };

            // act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.findComponent(RestaurantAvailability).exists()).toBe(true);
        });

        it.each([
            {},
            {
                availability: null
            }
        ])('does not render an availability component if availability prop is missing', propsData => {
            // arrange & act
            const wrapper = mount(RestaurantCard, { propsData });

            // assert
            expect(wrapper.findComponent(RestaurantAvailability).exists()).toBe(false);
        });
    });

    describe('events', () => {
        it(`emits the event ${EVENT_CLICK_RESTAURANT_CARD} once when the component is clicked`, async () => {
            // arrange
            const mockRestaurantId = '12345';
            const propsData = {
                id: mockRestaurantId
            };

            const wrapper = mount(RestaurantCard, { propsData });

            // act
            await wrapper.trigger('click');
            const emittedEvent = wrapper.emitted()[EVENT_CLICK_RESTAURANT_CARD];

            // assert
            expect(emittedEvent).toBeTruthy();
            expect(emittedEvent.length).toBe(1);
        });
    });

    describe('performance tracking', () => {
        it('calls the performance tracker with `tier-1` after rendering if prop value exists', async () => {
            // arrange
            const performanceTrackerMock = {
                time: jest.fn()
            };

            const propsData = {
                performanceTracker: performanceTrackerMock
            };

            // act
            await mount(RestaurantCard, { propsData });

            // assert
            expect(performanceTrackerMock.time).toHaveBeenCalledTimes(1);
            expect(performanceTrackerMock.time).toHaveBeenCalledWith('tier-1');
        });
    });
});
