import { createLocalVue, shallowMount } from '@vue/test-utils';
import StampCard from '../StampCard1.vue';

const localVue = createLocalVue();

const cardType = 'Stamp_Card_1';

const card = {
    type: cardType,
    title: 'title line',
    subtitle: 'statusTextLine',
    description: ['subStatusText1', 'subStatusText2'],
    image: '/path/to/image',
    url: 'https://foo.com/bar',
    discountPercentage: 15,
    earnedStamps: 0,
    expiryDate: '2021-02-31T23:59:59',
    expiryLine: 'Discount expires 31/02',
    isReadyToClaim: false,
    totalRequiredStamps: 5
};

const provide = {
    emitCardView: jest.fn(),
    emitCardClick: jest.fn()
};

function getWrapper (cardDetails = {}, testId = 'stampCard1') {
    return shallowMount(StampCard, {
        localVue,
        propsData: {
            card: {
                ...card,
                ...cardDetails
            },
            testId
        },
        provide
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

    describe('when card is claimable', () => {
        let wrapper;

        beforeEach(() => {
            // Arrange & Act
            wrapper = getWrapper({
                isReadyToClaim: true
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
