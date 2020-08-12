/* eslint indent: ["error", 4, {ignoredNodes: ["TemplateLiteral > *"]}] */
import { createLocalVue, shallowMount } from '@vue/test-utils';
import TermsAndConditionsCard from '../TermsAndConditionsCard.vue';

const localVue = createLocalVue();

jest.mock('copy-to-clipboard');

const ctaText = '__CTA_TEXT__';
const url = 'https://foo.com/bar';
const subtitle = '__SUBTITLE__';
const title = '__TITLE__';

const card = (overrides = {}) => ({
    title,
    subtitle,
    ctaText,
    url,
    ...overrides
});

function getWrapper (cardOverrides) {
    return shallowMount(TermsAndConditionsCard, {
        localVue,
        propsData: {
            card: card(cardOverrides),
            testId: 'tnctest'
        },
        provide () {
            return {
                copy: {
                    loggedInTitle: 'loggedInTitle',
                    loggedInSubtitle: 'loggedInSubtitle',
                    loggedInTermsText: 'loggedInTermsText',
                    loggedInTermsUrl: 'loggedInTermsUrl'
                }
            };
        }
    });
}

describe('contentCards › TermsAndConditionsCard', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe.each`
        shouldDisplayProps | undefinedKey
        ${false}           | ${'title'}
        ${false}           | ${'subtitle'}
        ${false}           | ${'ctaText'}
        ${false}           | ${'url'}
        ${true}            | ${'unrelatedKey'}
    `('when $undefinedKey is undefined', (shouldDisplayProps, undefinedKey) => {
        let wrapper;

        beforeEach(() => {
            // Arrange & Act
            wrapper = getWrapper({
                [undefinedKey]: undefined
            });
        });

        it(`should ${shouldDisplayProps ? '' : 'not '}display all props as given`, () => {
            // Assert
            expect(wrapper.find('[data-test-id="tnctest-title"]').text()).toBe(shouldDisplayProps ? title : 'loggedInTitle');
            expect(wrapper.find('[data-test-id="tnctest-subtitle"]').text()).toBe(shouldDisplayProps ? subtitle : 'loggedInSubtitle');
            expect(wrapper.find('[data-test-id="tnctest-cta"]').text()).toBe(shouldDisplayProps ? ctaText : 'loggedInTermsText');
            expect(wrapper.find('[data-test-id="tnctest-cta"]').attributes('href')).toBe(shouldDisplayProps ? url : 'loggedInTermsUrl');
        });
    });
});
