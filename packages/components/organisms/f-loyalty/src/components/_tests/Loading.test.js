import { shallowMount } from '@vue/test-utils';
import Loading from '../Loading.vue';

describe('Loading.vue', () => {
    it('should show a 3 loading cards by default', () => {
        // Arrange
        const wrapper = shallowMount(Loading, {
            mocks: {
                $style: {
                    'c-loyalty-loadingCardPlaceholder': 'c-loyalty-loadingCardPlaceholder'
                }
            }
        });

        // Act
        const cards = wrapper.findAll('.c-loyalty-loadingCardPlaceholder');

        // Assert
        expect(cards.length).toEqual(3);
    });
});
