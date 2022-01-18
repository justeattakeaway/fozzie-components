import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation/src';
import tenantConfigs from '@justeat/f-offers/src/tenants';
import LoyaltyCards from '../LoyaltyCards.vue';
import { VUEX_MODULE_NAMESPACE_LOYALTY } from '../../store/types';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const store = new Vuex.Store({
    modules: {
        [VUEX_MODULE_NAMESPACE_LOYALTY]: {
            namespaced: true,
            state: () => ({
                globalUserId: '__TEST_USER_ID'
            })
        }
    }
});

const MOCK_STATE = {
    NO_CARDS: 'no-cards',
    DEFAULT: 'default',
    LOADING: 'loading'
};

// Mocks content cards component as we only need to test slots here
const MockContentCards = state => ({
    render (h) {
        return this.$scopedSlots[state]
            ? h(
                'div',
                {
                    class: `c-contentCards-${state}`,
                    attrs: {
                        'data-test-id': this.testId
                    }
                },
                this.$scopedSlots[state]({
                    cards: this.cards
                })
            )
            : h('');
    }
});

// Creates a wrapper for test to avoid duplication
const createWrapper = KEY => shallowMount(LoyaltyCards, {
    localVue,
    store,
    i18n,
    stubs: {
        'content-cards': MockContentCards(KEY)
    }
});

describe('LoyaltyCards.vue', () => {
    describe('No Cards ::', () => {
        it('should display the no-cards-error-state when no cards slot is active', () => {
            // Arrange
            const wrapper = createWrapper(MOCK_STATE.NO_CARDS);
            const label = 'no-cards-error-state-stub';

            // Act
            const noCardsComponent = wrapper.find(label);

            // Assert
            expect(noCardsComponent.exists()).toEqual(true);
        });
    });

    describe('Cards Received ::', () => {
        it('should display the cards-slot when cards slot is active', () => {
            // Arrange
            const wrapper = createWrapper(MOCK_STATE.DEFAULT);
            const label = 'cards-slot-stub';

            // Act
            const cardsComponent = wrapper.find(label);

            // Assert
            expect(cardsComponent.exists()).toEqual(true);
        });
    });

    describe('Loading Cards', () => {
        it('should display the loyalty-cards-loading-state when the loading slot is active', () => {
            // Arrange
            const wrapper = createWrapper(MOCK_STATE.LOADING);
            const label = 'loyalty-cards-loading-state-stub';

            // Act
            const loadingComponent = wrapper.find(label);

            // Assert
            expect(loadingComponent.exists()).toEqual(true);
        });
    });
});
