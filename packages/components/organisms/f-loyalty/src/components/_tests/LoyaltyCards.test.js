import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import LoyaltyCards from '../LoyaltyCards.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
    state: () => {

    }
});

const MCOK_STATE_NO_CARDS = 'no-cards';

const MockContentCards = state => ({
    render () {
        return this.$scopedSlots[state]({
            cards: this.cards
        });
    }
});

describe('LoyaltyCards.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Arrange
        wrapper = mount(LoyaltyCards, {
            localVue,
            store,
            stubs: {
                'content-cards': MockContentCards(MCOK_STATE_NO_CARDS),
                'cards-slot': { template: '<div>cards-slot</div>' },
                'no-cards-error-state': { template: '<div>no-cards-error-state</div>' },
                terms: { template: '<div>terms</div>' },
                'loyalty-cards-loading-state': { template: '<div>loyalty-cards-loading-state</div>' }
            }
        });
    });
    describe('No Cards ::', () => {
        it('should display the no-cards-error-state when there are no cards', () => {
            // Act
            const noCardsComponent = wrapper.find()
        });
    });

    describe('Cards Received ::', () => {

    });

    describe('Loading Cards', () => {

    });
});
