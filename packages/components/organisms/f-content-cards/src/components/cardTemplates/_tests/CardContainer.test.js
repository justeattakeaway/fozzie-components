import { createLocalVue, mount } from '@vue/test-utils';
import CardContainer from '../CardContainer.vue';

const localVue = createLocalVue();

const url = '__URL__';
const ctaLabel = '__CTA_LABEL__';
const line1 = '__LINE_1__';
const description = [line1];
const id = btoa('ABC123');
const type = 'Promotion_Card_1';

const card = {
    id,
    url,
    description,
    ctaLabel,
    type
};

const testId = 'CardContainer';

const provide = {
    emitCardView: jest.fn(),
    emitCardClick: jest.fn()
};

describe('ContentCard', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should display description lines', () => {
        // Arrange & Act
        const wrapper = mount(CardContainer, {
            localVue,
            propsData: {
                card,
                testId
            },
            provide
        });

        // Assert
        expect(wrapper.find('[data-test-id="ContentCard-TextItem-0"]').text()).toBe(line1);
    });
});
