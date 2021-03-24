import { createLocalVue, mount } from '@vue/test-utils';
import CardCase from '../CardCase.vue';

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

const testId = 'CardCase';

const provide = {
    emitCardView: jest.fn(),
    emitCardClick: jest.fn()
};

describe('CardCase', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should render a link if url is provided', () => {
        // Act
        const wrapper = mount(CardCase, {
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

    it('should apply the correct URL', () => {
        // Arrange & Act
        const wrapper = mount(CardCase, {
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
        mount(CardCase, {
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
        const wrapper = mount(CardCase, {
            localVue,
            propsData: {
                card,
                testId
            },
            provide
        });

        // Act
        wrapper.findComponent(CardCase).trigger('click');

        // Assert
        expect(provide.emitCardClick).toHaveBeenCalled();
    });
});
