import { mount } from '@vue/test-utils';
import RestaurantRating from '../RestaurantRating.vue';

describe('RestaurantRating component', () => {
    it('should render', () => {
        // arrange & act
        const wrapper = mount(RestaurantRating);

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('renders a summary ratings message for screenreaders with a visually hidden class', () => {
        // arrange
        const screenReaderMessage = 'foo';

        const propsData = {
            mean: 5,
            count: 250,
            accessibleMessage: screenReaderMessage
        };

        // act
        const wrapper = mount(RestaurantRating, { propsData });
        const screenReaderMessageElement = wrapper.find('[data-test-id="restaurant-rating"]');

        // assert
        expect(screenReaderMessageElement.exists()).toBe(true);
        expect(screenReaderMessageElement.text()).toStrictEqual(screenReaderMessage);
    });

    it('does not render a summary ratings message for screenreaders if `mean` prop is missing', () => {
        // arrange
        const screenReaderMessage = 'foo';

        const propsData = {
            count: 10,
            accessibleMessage: screenReaderMessage
        };

        // act
        const wrapper = mount(RestaurantRating, { propsData });
        const screenReaderMessageElement = wrapper.find('[data-test-id="restaurant-rating]');

        // assert
        expect(screenReaderMessageElement.exists()).toBe(false);
    });

    it.each([
        [1, '1.00'],
        [2.5, '2.50'],
        [4.33, '4.33'],
        [2.337, '2.34'],
        [4.5678902, '4.57'],
        [4.5538902, '4.55']
    ])('fixes the rating mean value to a fixed point of 2 decimal places', (ratingsValue, expectedRenderedValue) => {
        // arrange
        const propsData = {
            mean: ratingsValue,
            count: 250
        };

        // act
        const wrapper = mount(RestaurantRating, { propsData });
        const ratingsMeanElement = wrapper.find('[data-test-id="ratings-mean-value"]');

        // assert
        expect(ratingsMeanElement.exists()).toBe(true);
        expect(ratingsMeanElement.text()).toStrictEqual(expectedRenderedValue);
    });

    it.each([[5, '5'], [6, '6'], [undefined, '6']])('should update the max rating based on value provided %p or fallback to default', (maxRatingValue, expectedValue) => {
        // arrange
        const propsData = {
            mean: 5,
            count: 250,
            maxRating: maxRatingValue
        };

        // act
        const wrapper = mount(RestaurantRating, { propsData });
        const ratingsMaxElement = wrapper.find('[data-test-id="ratings-max-value"]');

        // assert
        expect(ratingsMaxElement.exists()).toBe(true);
        expect(ratingsMaxElement.text()).toStrictEqual(expectedValue);
    });

    describe('isOwnRatingMessage is true', () => {
        const isOwnRating = true;

        it('shows a filled star, rating mean and own rating message', () => {
            // arrange
            const isOwnRatingMessage = 'You';
            const propsData = {
                mean: 5,
                count: 250,
                isOwnRating,
                isOwnRatingMessage
            };

            // act
            const wrapper = mount(RestaurantRating, { propsData });

            const ratingsMeanElement = wrapper.find('[data-test-id="ratings-mean-value"]');
            const filledStarElement = wrapper.find('[data-test-id="ratings-star-filled"]');
            const emptyStarElement = wrapper.find('[data-test-id="ratings-star-empty"]');
            const ownRatingMessageElement = wrapper.find('[data-test-id="rating-own-rating-message"]');
            const noRatingsMessage = wrapper.find('[data-test-id="restaurant-rating-none"]');
            const countMessage = wrapper.find('[data-test-id="rating-count"]');

            // assert
            expect(emptyStarElement.exists()).toBe(false);
            expect(noRatingsMessage.exists()).toBe(false);
            expect(countMessage.exists()).toBe(false);

            expect(ratingsMeanElement.exists()).toBe(true);
            expect(filledStarElement.exists()).toBe(true);
            expect(ownRatingMessageElement.exists()).toBe(true);

            expect(ratingsMeanElement.text()).toStrictEqual('5.00');
            expect(ownRatingMessageElement.text()).toStrictEqual(isOwnRatingMessage);
        });

        it('shows an empty star and a no ratings message if `mean` is missing', () => {
            // arrange
            const notRatedMessage = 'Not rated yet';

            const propsData = {
                count: 10,
                isOwnRating,
                isOwnRatingMessage: 'You',
                notRatedMessage
            };

            // act
            const wrapper = mount(RestaurantRating, { propsData });

            const ratingsMeanElement = wrapper.find('[data-test-id="ratings-mean-value"]');
            const filledStarElement = wrapper.find('[data-test-id="ratings-star-filled"]');
            const ownRatingMessageElement = wrapper.find('[data-test-id="rating-own-rating-message"]');
            const emptyStarElement = wrapper.find('[data-test-id="ratings-star-empty"]');
            const noRatingsMessage = wrapper.find('[data-test-id="restaurant-rating-none"]');
            const countMessage = wrapper.find('[data-test-id="rating-count"]');
            const screenReaderMessageElement = wrapper.find('[data-test-id="ratings-summary-message"]');

            // assert
            expect(filledStarElement.exists()).toBe(false);
            expect(ratingsMeanElement.exists()).toBe(false);
            expect(countMessage.exists()).toBe(false);
            expect(ownRatingMessageElement.exists()).toBe(false);
            expect(screenReaderMessageElement.exists()).toBe(false);


            expect(emptyStarElement.exists()).toBe(true);
            expect(noRatingsMessage.exists()).toBe(true);
            expect(noRatingsMessage.text()).toStrictEqual(notRatedMessage);
        });
    });

    describe('isOwnRatingMessage is false', () => {
        const isOwnRating = false;

        it('shows a filled star, rating mean and count', () => {
            // arrange
            const propsData = {
                mean: 5,
                count: 250,
                isOwnRating
            };

            // act
            const wrapper = mount(RestaurantRating, { propsData });

            const ratingsMeanElement = wrapper.find('[data-test-id="ratings-mean-value"]');
            const filledStarElement = wrapper.find('[data-test-id="ratings-star-filled"]');
            const emptyStarElement = wrapper.find('[data-test-id="ratings-star-empty"]');
            const ownRatingMessageElement = wrapper.find('[data-test-id="rating-own-rating-message"]');
            const noRatingsMessage = wrapper.find('[data-test-id="restaurant-rating-none"]');
            const countMessage = wrapper.find('[data-test-id="rating"]');

            // assert
            expect(emptyStarElement.exists()).toBe(false);
            expect(noRatingsMessage.exists()).toBe(false);
            expect(ownRatingMessageElement.exists()).toBe(false);

            expect(ratingsMeanElement.exists()).toBe(true);
            expect(filledStarElement.exists()).toBe(true);
            expect(countMessage.exists()).toBe(true);

            expect(ratingsMeanElement.text()).toStrictEqual('5.00');
            expect(countMessage.text()).toStrictEqual('250');
        });

        it('shows an empty star and a no ratings message if `mean` is missing', () => {
            // arrange
            const notRatedMessage = 'Not rated yet';

            const propsData = {
                count: 10,
                isOwnRating,
                notRatedMessage
            };

            // act
            const wrapper = mount(RestaurantRating, { propsData });

            const ratingsMeanElement = wrapper.find('[data-test-id="ratings-mean-value"]');
            const filledStarElement = wrapper.find('[data-test-id="ratings-star-filled"]');
            const ownRatingMessageElement = wrapper.find('[data-test-id="rating-own-rating-message"]');
            const emptyStarElement = wrapper.find('[data-test-id="ratings-star-empty"]');
            const noRatingsMessage = wrapper.find('[data-test-id="restaurant-rating-none"]');
            const countMessage = wrapper.find('[data-test-id="rating-count"]');

            // assert
            expect(filledStarElement.exists()).toBe(false);
            expect(ratingsMeanElement.exists()).toBe(false);
            expect(countMessage.exists()).toBe(false);
            expect(ownRatingMessageElement.exists()).toBe(false);

            expect(emptyStarElement.exists()).toBe(true);
            expect(noRatingsMessage.exists()).toBe(true);
            expect(noRatingsMessage.text()).toStrictEqual(notRatedMessage);
        });
    });
});
