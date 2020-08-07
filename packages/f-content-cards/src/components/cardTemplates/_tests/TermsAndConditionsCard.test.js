import {createLocalVue, shallowMount} from '@vue/test-utils';
import TermsAndConditionsCard from '../TermsAndConditionsCard.vue';

const localVue = createLocalVue();

jest.mock('copy-to-clipboard');

const ctaLabel = '__CTA_LABEL__';
const url = 'https://foo.com/bar';
const description = '__DESCRIPTION__';
const title = '__TITLE__';

const card = (overrides = {}) => ({
    ...{
        title,
        description,
        ctaLabel,
        url
    },
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
        ${false}           | ${'description'}
        ${false}           | ${'ctaLabel'}
        ${false}           | ${'url'}
        ${true}            | ${'unrelatedKey'}
    `('when $undefinedKey is undefined', (shouldDisplayProps, undefinedKey) => {
        let wrapper;

        beforeEach(() => {
            // Arrange
            wrapper = getWrapper({
                [undefinedKey]: undefined
            });
        });

        it(`should ${shouldDisplayProps ? '' : 'not '}display all props as given`, () => {
            // Assert
            expect(wrapper.find('[data-test-id="tnctest-title"]').text()).toBe(shouldDisplayProps ? title : 'loggedInTitle');
            expect(wrapper.find('[data-test-id="tnctest-description"]').text()).toBe(shouldDisplayProps ? description : 'loggedInSubtitle');
            expect(wrapper.find('[data-test-id="tnctest-cta"]').text()).toBe(shouldDisplayProps ? ctaLabel : 'loggedInTermsText');
            expect(wrapper.find('[data-test-id="tnctest-cta"]').attributes('href')).toBe(shouldDisplayProps ? url : 'loggedInTermsUrl');
        });
    });
});
