import { createLocalVue, mount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import {
    StampCard1 as StampCard,
    StampCardPromotionCard
} from '@justeat/f-content-cards';
import Slots from '../Slots.vue';
import i18nMocker from './helper';
import tenantConfigs from '../../tenants';
import NoCardsErrorState from '../NoCardsErrorState.vue';

// MOCKS
const MOCK_LOCALE = 'en-GB';
const MOCK_CARDS = [
    { id: 1, type: 'Stamp_Card_1', isReadyToClaim: true },
    { id: 2, type: 'Stamp_Card_1', isReadyToClaim: true },
    { id: 3, type: 'Stamp_Card_1', isReadyToClaim: true }
];
const MOCK_CARDS_IN_PROGRESS = [
    { id: 1, type: 'Stamp_Card_1', isReadyToClaim: false },
    { id: 2, type: 'Stamp_Card_1', isReadyToClaim: false },
    { id: 3, type: 'Stamp_Card_1', isReadyToClaim: false }
];
const MOCK_CARDS_PARTICIPATING_RESTAURANTS = [
    { id: 1, type: 'StampCard_Promotion_Card_1' },
    { id: 2, type: 'StampCard_Promotion_Card_1' },
    { id: 3, type: 'StampCard_Promotion_Card_1' }
];
const MOCK_PROMOTION_CARD_ID = '__TEST_PROMOTION_CARD_ID__';
const MOCK_STAMP_CARD_ID = '__TEST_STAMP_CARD_ID__';

const localVue = createLocalVue();
localVue.use(VueI18n);

const wrapperOptions = {
    stubs: {
        StampCard: { template: `<div data-test-id="${MOCK_STAMP_CARD_ID}">TEST_STAMP_CARD</div>` },
        StampCardPromotionCard: { template: `<div data-test-id="${MOCK_PROMOTION_CARD_ID}">TEST_PROMOTION_CARD</div>` }
    },
    mocks: {
        $t: key => i18nMocker(key, MOCK_LOCALE)
    }
};

let wrapper;
let zeroCardsWrapper;

describe('Slots.vue', () => {
    beforeEach(() => {
        // Arrange
        zeroCardsWrapper = mount(Slots, {
            localVue,
            propsData: {
                cards: []
            },
            ...wrapperOptions
        });
    });

    describe('Redeemable Stamp Cards', () => {
        beforeEach(() => {
            // Arrange
            wrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: MOCK_CARDS
                },
                ...wrapperOptions
            });
        });

        it('should display the readyToClaimTitle when hasRedeemableStampcards is true', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-readyToClaim-title"]');
            // Assert
            expect(title.text()).toEqual(tenantConfigs[MOCK_LOCALE].messages.tabs.stamps.readyToClaimTitle);
        });

        it('should NOT display the readyToClaimTitle when hasRedeemableStampcards is false', () => {
            // Act
            const title = zeroCardsWrapper.find('[data-test-id="section-readyToClaim-title"]');

            // Assert
            expect(title.exists()).toBe(false);
        });

        it('should show all redeemable cards in the cards array', () => {
            // Act
            const stampCards = wrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(3);
        });

        it('should NOT show any cards if there is NO redeemable cards', () => {
            // Act
            const stampCards = zeroCardsWrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(0);
        });
    });
    describe('In Progress Stamp Cards', () => {
        beforeEach(() => {
            // Arrange
            wrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: MOCK_CARDS_IN_PROGRESS
                },
                ...wrapperOptions
            });
        });

        it('should display the inProgressTitle when hasInProgressStampcards is true', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-inProgress-title"]');

            // Assert
            expect(title.text()).toEqual(tenantConfigs[MOCK_LOCALE].messages.tabs.stamps.inProgressTitle);
        });

        it('should NOT display the inProgressTitle when hasInProgressStampcards is false', () => {
            // Act
            const title = zeroCardsWrapper.find('[data-test-id="section-inProgress-title"]');

            // Assert
            expect(title.exists()).toBe(false);
        });

        it('should show all in progress stamp cards in the cards array', () => {
            // Act
            const stampCards = wrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(3);
        });

        it('should NOT show any cards if there is NO in progress stamp cards', () => {
            // Act
            const stampCards = zeroCardsWrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(0);
        });
    });
    describe('Participating Restaurants', () => {
        beforeEach(() => {
            // Arrange
            wrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: MOCK_CARDS_PARTICIPATING_RESTAURANTS
                },
                ...wrapperOptions
            });
        });

        it('should display the participatingRestaurantsTitle when hasParticipatingRestaurantsCards is true', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-participatingRestaurants-title"]');

            // Assert
            expect(title.text()).toEqual(tenantConfigs[MOCK_LOCALE].messages.tabs.stamps.participatingRestaurantsTitle);
        });

        it('should show all participatingRestaurantsCards stamp cards in the cards array', () => {
            // Act
            const stampCards = wrapper.findAllComponents(StampCardPromotionCard);

            // Assert
            expect(stampCards.length).toEqual(3);
        });

        it('should NOT show any cards if there is NO participatingRestaurantsCards stamp cards', () => {
            // Act
            const stampCards = zeroCardsWrapper.findAllComponents(StampCardPromotionCard);

            // Assert
            expect(stampCards.length).toEqual(0);
        });
    });
    describe('No Cards', () => {
        beforeEach(() => {
            // Arrange
            wrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: MOCK_CARDS
                },
                ...wrapperOptions
            });
        });

        it('should display if hasInProgressStampcards is false and hasRedeemableStampcards is false', () => {
            // Act
            const noCardsErrorState = zeroCardsWrapper.findAllComponents(NoCardsErrorState);

            // Assert
            expect(noCardsErrorState.exists()).toBe(true);
        });
        it('should should NOT display if hasInProgressStampcards or hasRedeemableStampcards is true', () => {
            // Act
            const noCardsErrorState = wrapper.findAllComponents(NoCardsErrorState);

            // Assert
            expect(noCardsErrorState.exists()).toBe(false);
        });
    });
});
