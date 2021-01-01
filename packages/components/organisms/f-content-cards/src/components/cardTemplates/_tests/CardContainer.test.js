import { createLocalVue, shallowMount } from '@vue/test-utils';
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

    it('should render a link if url is provided', () => {
        // Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card,
                testId
            },
            provide
        });

        // Assert
        expect(wrapper.find('a').exists()).toBe(true);
    });

    it('should display description lines', () => {
        // Arrange & Act
        const wrapper = shallowMount(CardContainer, {
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

    it('should apply the correct URL', () => {
        // Arrange & Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card,
                testId
            },
            provide
        });

        // Assert
        expect(wrapper.find(`[href="${url}"]`).exists()).toBe(true);
    });

    it('should call the injected `emitCardView` event when mounted', () => {
        // Arrange & Act
        shallowMount(CardContainer, {
            localVue,
            propsData: {
                card,
                testId
            },
            provide
        });

        // Assert
        expect(provide.emitCardView).toHaveBeenCalled();
    });

    it('should call the injected `emitCardClick` event when clicked', () => {
        // Arrange
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card,
                testId
            },
            provide
        });

        // Act
        wrapper.find(`[data-test-id="${testId}"]`).trigger('click');

        // Assert
        expect(provide.emitCardClick).toHaveBeenCalled();
    });
});
