import { shallowMount } from '@vue/test-utils';
import ContentCardContainer from '../ContentCardContainer.vue';

const MOCK_CARD = {
    id: '__TEST_ID__',
    url: 'https://example.com'
};

describe('ContentCardContainer.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Arrange
        wrapper = shallowMount(ContentCardContainer, {
            provide: {
                emitCardView: jest.fn(),
                emitCardClick: jest.fn()
            },
            propsData: {
                card: MOCK_CARD,
                isClickable: true
            },
            scopedSlots: {
                default: '<p data-test-id="card-test-slot" slot-scope="cardData">{{cardData.card.id}}</p>'
            }
        });
    });

    it('should emit view content card event on mount', async () => {
        // Act
        await wrapper.vm.$nextTick();

        // Assert
        expect(wrapper.vm.emitCardView).toHaveBeenCalledWith(MOCK_CARD);
    });

    it('should emit click event on click', async () => {
        // Act
        await wrapper.find('a').trigger('click');
        await wrapper.vm.$nextTick();

        // Assert
        expect(wrapper.vm.emitCardClick).toHaveBeenCalledWith(MOCK_CARD);
    });

    it('should set container as an `a` tag when `isClickable` is true and card has a url', async () => {
        // Act
        const tag = await wrapper.find('a');

        // Assert
        expect(tag.exists()).toBeTruthy();
    });

    it('should pass the card prop through to the slot via slot props', () => {
        // Act
        const slot = wrapper.find('[data-test-id="card-test-slot"]');

        // Assert
        expect(slot.text()).toEqual(MOCK_CARD.id);
    });
});
