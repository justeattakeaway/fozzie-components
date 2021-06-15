import { createLocalVue, shallowMount } from '@vue/test-utils';

import StampCard from '../StampCard1.vue';
import tenantConfigs from '../../../tenants';

const localVue = createLocalVue();

const cardType = 'Stamp_Card_1';

const card = {
    type: cardType,
    title: 'title line',
    subtitle: 'statusTextLine',
    description: ['subStatusText1', 'subStatusText2'],
    image: '/path/to/image',
    url: 'https://foo.com/bar',
    discountPercentage: '15',
    earnedStamps: 2,
    expiryDate: '2021-02-28T23:59:59',
    expiryLine: 'Discount expires',
    isReadyToClaim: 'false',
    totalRequiredStamps: 5
};

const localeConfig = tenantConfigs['en-GB'];

function getWrapper (
    cardDetails = {},
    testId = 'stampCard1',
    copy = {}
) {
    return shallowMount(StampCard, {
        localVue,
        propsData: {
            card: {
                ...card,
                ...cardDetails
            },
            testId
        },
        directives: {
            makeTextAccessible: jest.fn()
        },
        stubs: [
            'CardCase',
            'EmptyStamp15',
            'EmptyStamp10',
            'FullStamp15',
            'FullStamp10'
        ],
        provide: {
            copy: {
                ...localeConfig,
                ...copy
            }
        }
    });
}

describe('contentCards › StampCard1', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should display the title', () => {
        // Arrange & Act
        const wrapper = getWrapper();

        // Assert
        expect(wrapper.find('[data-test-id="stampCard1--title"]').text()).toBe(card.title);
    });

    it('should display the image', () => {
        // Arrange & Act
        const wrapper = getWrapper();

        // Assert
        expect(wrapper.find('[data-test-id="stampCard1--image"]').attributes('src')).toBe(card.image);
    });

    it('should display the status text from the subtitle', () => {
        // Arrange & Act
        const wrapper = getWrapper();

        // Assert
        expect(wrapper.find('[data-test-id="stampCard1--statusText"]').text()).toBe(card.subtitle);
    });

    describe('when card is in progress', () => {
        describe('', () => {
            let wrapper;

            beforeEach(() => {
                // Arrange & Act
                wrapper = getWrapper();
            });

            it('should display the stamps section', () => {
                // Assert
                expect(wrapper.find('[data-test-id="stampCard1--stamps"]').exists()).toBe(true);
            });

            it('should NOT display the redemptionDetails section', () => {
                // Assert
                expect(wrapper.find('[data-test-id="stampCard1--redemptionDetails"]').exists()).toBe(false);
            });

            it('should display as many filled stamps as have been earned', () => {
                // Assert
                expect(wrapper.findAll('[data-test-id="stampCard1--stampFull"]').length).toBe(card.earnedStamps);
            });

            it('should display as many empty stamps as 5 minus the number that have been earned', () => {
                // Assert
                expect(wrapper.findAll('[data-test-id="stampCard1--stampEmpty"]').length).toBe(5 - card.earnedStamps);
            });
        });

        it.each([
            ['15', 'EmptyStamp15'],
            ['15', 'FullStamp15'],
            ['10', 'EmptyStamp10'],
            ['10', 'FullStamp10']
        ])('should display the correct stamp image when discount percentage is %s', (discountPercentage, imageComponent) => {
            // Arrange & Act
            const wrapper = getWrapper({
                discountPercentage
            });

            // Assert
            const stubbedComponent = wrapper.vm.$options.components[imageComponent];
            expect(wrapper.findComponent(stubbedComponent).exists()).toBeTruthy();
        });

        it.each([
            ['15', 'EmptyStamp10'],
            ['15', 'FullStamp10'],
            ['10', 'EmptyStamp15'],
            ['10', 'FullStamp15']
        ])('should NOT display the incorrect correct stamp image when discount percentage is %s', (discountPercentage, imageComponent) => {
            // Arrange & Act
            const wrapper = getWrapper({
                discountPercentage
            });

            // Assert
            const stubbedComponent = wrapper.vm.$options.components[imageComponent];
            expect(wrapper.findComponent(stubbedComponent).exists()).toBeFalsy();
        });

        it.each([
            ['27'],
            [null],
            [undefined]
        ])('should fall back on the percentage defined in locale data when incorrect discount percentage (%p) is given', discountPercentage => {
            // Arrange & Act
            const wrapper = getWrapper({
                discountPercentage
            });

            // Assert
            const stubbedComponent = wrapper.vm.$options.components.EmptyStamp10;
            expect(wrapper.findComponent(stubbedComponent).exists()).toBeTruthy();
        });

        it.each([
            ['27'],
            [null],
            [undefined]
        ])('should hide the card when fallback discount percentage (%p) is incorrect or undefined for the locale', stampCardDefaultPercentage => {
            // Arrange & Act
            const wrapper = getWrapper({
                discountPercentage: undefined
            }, 'testId', {
                stampCardDefaultPercentage
            });

            // Assert
            const stubbedCardCaseComponent = wrapper.vm.$options.components.CardCase;
            expect(wrapper.findComponent(stubbedCardCaseComponent).exists()).toBeFalsy();
        });
    });

    describe('when card is claimable', () => {
        let wrapper;

        beforeEach(() => {
            // Arrange & Act
            wrapper = getWrapper({
                isReadyToClaim: 'true'
            });
        });

        it('should NOT display the stamps section', () => {
            // Assert
            expect(wrapper.find('[data-test-id="stampCard1--stamps"]').exists()).toBe(false);
        });

        it('should display the redemptionDetails section', () => {
            // Assert
            expect(wrapper.find('[data-test-id="stampCard1--redemptionDetails"]').exists()).toBe(true);
        });

        it('should display the sub status text from elements in the description', () => {
            // Assert
            expect(wrapper.find('[data-test-id="stampCard1--subStatusText--0"]').text()).toBe(card.description[0]);
            expect(wrapper.find('[data-test-id="stampCard1--subStatusText--1"]').text()).toBe(card.description[1]);
        });

        it('should display the expiry info section', () => {
            // Assert
            expect(wrapper.find('[data-test-id="stampCard1--expiryInfo"]').exists()).toBe(true);
        });

        it('should format the expiry date into the expiry line', () => {
            // Assert
            expect(wrapper.find('[data-test-id="stampCard1--expiryInfo"]').text()).toMatch(/(Discount expires\s*28\/02)/gi);
        });
    });

    describe('when testId prop is not specified', () => {
        it('should NOT generate any data-test-id attributes', () => {
            // Arrange & Act
            const wrapper = getWrapper({}, null);

            // Assert
            expect(wrapper.findAll('[data-test-id]').length).toBe(0);
        });
    });
});
