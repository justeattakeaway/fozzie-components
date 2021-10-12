import { createLocalVue, mount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Slots from '../Slots.vue';
import i18nMocker from './helper';
import tenantConfigs from '../../tenants';
import {
    StampCard1 as StampCard,
    StampCardPromotionCard
} from '@justeat/f-content-cards';

// MOCKS
const MOCK_LOCALE = 'en-GB';
const MOCK_CARDS = [

];
const MOCK_CARDS_IN_PROGRESS = [

];
const MOCK_PROMOTION_CARD_ID = '__TEST_PROMOTION_CARD_ID__';
const MOCK_STAMP_CARD_ID = '__TEST_STAMP_CARD_ID__';

const localVue = createLocalVue();
localVue.use(VueI18n);

let wrapper;


describe('Slots.vue', () => {
    describe('Redeemable Stamp Cards', () => {
        beforeEach(() => {
            // Arrange
            wrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: MOCK_CARDS
                },
                stubs: {
                    StampCard: `<div data-test-id="${MOCK_STAMP_CARD_ID}">TEST_STAMP_CARD</div>`,
                    StampCardPromotionCard: `<div data-test-id="${MOCK_PROMOTION_CARD_ID}">TEST_PROMOTION_CARD</div>`
                },
                mocks: {
                    $t: key => i18nMocker(key, MOCK_LOCALE)
                }
            });
        });

        it('should display the readyToClaimTitle when hasRedeemableStampcards is true', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-readyToClaim-title"]');

            // Assert
            expect(title.text()).toEqual(tenantConfigs[MOCK_LOCALE].messages.stamps.readyToClaimTitle);
        });

        it('should NOT display the readyToClaimTitle when hasRedeemableStampcards is false', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-readyToClaim-title"]');

            // Assert
            expect(title).not.toBeDisplayed();
        });

        it('should show all redeemable cards in the cards array', () => {
            // Act
            const stampCards = wrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(3);
        });

        it('should NOT show any cards if there is NO redeemable cards', () => {
            // Arrange
            const zeroCardsWrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: []
                },
                stubs: {
                    StampCard: `<div data-test-id="${MOCK_STAMP_CARD_ID}">TEST_STAMP_CARD</div>`,
                    StampCardPromotionCard: `<div data-test-id="${MOCK_PROMOTION_CARD_ID}">TEST_PROMOTION_CARD</div>`
                },
                mocks: {
                    $t: key => i18nMocker(key, MOCK_LOCALE)
                }
            });

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
                stubs: {
                    StampCard: `<div data-test-id="${MOCK_STAMP_CARD_ID}">TEST_STAMP_CARD</div>`,
                    StampCardPromotionCard: `<div data-test-id="${MOCK_PROMOTION_CARD_ID}">TEST_PROMOTION_CARD</div>`
                },
                mocks: {
                    $t: key => i18nMocker(key, MOCK_LOCALE)
                }
            });
        });

        it('should display the inProgressTitle when hasInProgressStampcards is true', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-inProgress-title"]');

            // Assert
            expect(title.text()).toEqual(tenantConfigs[MOCK_LOCALE].messages.stamps.readyToClaimTitle);
        });

        it('should NOT display the inProgressTitle when hasInProgressStampcards is false', () => {
            // Act
            const title = wrapper.find('[data-test-id="section-inProgress-title"]');

            // Assert
            expect(title).not.toBeDisplayed();
        });

        it('should show all in progress stamp cards in the cards array', () => {
            // Act
            const stampCards = wrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(3);
        });

        it('should NOT show any cards if there is NO in progress stamp cards', () => {
            // Arrange
            const zeroCardsWrapper = mount(Slots, {
                localVue,
                propsData: {
                    cards: []
                },
                stubs: {
                    StampCard: `<div data-test-id="${MOCK_STAMP_CARD_ID}">TEST_STAMP_CARD</div>`,
                    StampCardPromotionCard: `<div data-test-id="${MOCK_PROMOTION_CARD_ID}">TEST_PROMOTION_CARD</div>`
                },
                mocks: {
                    $t: key => i18nMocker(key, MOCK_LOCALE)
                }
            });

            // Act
            const stampCards = zeroCardsWrapper.findAllComponents(StampCard);

            // Assert
            expect(stampCards.length).toEqual(0);
        });
    });
    describe('Participating Restaurants', () => {

    });
    describe('No Cards', () => {
        it('should display if hasInProgressStampcards is false and hasRedeemableStampcards is false', () => {

        });
        it('should should NOT display if hasInProgressStampcards or hasRedeemableStampcards is true', () => {

        });
    });
});
