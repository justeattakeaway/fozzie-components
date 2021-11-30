/* eslint-disable no-unused-vars */
import { shallowMount } from '@vue/test-utils';
import RestaurantRating from '../RestaurantRating.vue';

describe('RestaurantRating component', () => {
    it.todo('renders a summary ratings message for screenreaders with a visually hidden class');

    it.todo('does not render a summary ratings message for screenreaders if count is missing');

    it.todo('does not render a summary ratings message for screenreaders if mean is missing');

    describe('isOwnRatingMessage is true', () => {
        it.todo('shows a filled star, rating mean and own rating message');

        it.todo('shows an empty star and a no ratings message if count is missing');

        it.todo('shows an empty star and a no ratings message if mean is missing');
    });

    describe('isOwnRatingMessage is false', () => {
        it.todo('shows a filled star, rating mean and count');

        it.todo('shows an empty star and a no ratings message if count is missing');

        it.todo('shows an empty star and a no ratings message if mean is missing');
    });
});
