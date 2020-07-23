import { createLocalVue, shallowMount } from '@vue/test-utils';
import CardContainer from '../CardContainer.vue';

const localVue = createLocalVue();

const url = '__URL__';
const button = '__BUTTON__';
const line1 = '__LINE_1__';
const description = '__DESCRIPTION__';
const id = btoa('ABC123');
const type = 'Promotion_Card_1';

const card = {
    id,
    url,
    button,
    description,
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: type, // eslint-disable-line camelcase
        line_1: line1 // eslint-disable-line camelcase
    }
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

    it('should render a link if ctaUrl is provided', () => {
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

    describe('target', () => {
        it('should open in _self for internal routes', async () => {
            const urls = [
                'https://www.just-eat.co.uk/test-url',
                'https://www.justeat.com/test-url',
                'https://www.just-eat.es/test-url',
                'https://www.menulog.co.nz/test-url'
            ];

            await Promise.all(urls.map(testUrl => {
                const wrapper = shallowMount(CardContainer, {
                    localVue,
                    propsData: {
                        card: {
                            ...card,
                            url: testUrl
                        },
                        testId
                    },
                    provide
                });
                return expect(wrapper.find('a').attributes('target')).toBe('_self');
            }));
        });

        it('should open in _blank for external routes', () => {
            const testUrl = 'https://www.helloworld.com/';

            const wrapper = shallowMount(CardContainer, {
                localVue,
                propsData: {
                    card: {
                        ...card,
                        url: testUrl
                    },
                    testId
                },
                provide
            });
            const link = wrapper.find('a');
            expect(link.attributes('target')).toBe('_blank');
            expect(link.attributes('rel')).toBe('noopener noreferrer');
        });
    });
});
