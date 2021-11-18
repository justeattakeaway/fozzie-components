import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
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

const MCOK_STATE_NO_CARDS = 'no-cards';

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

describe('LoyaltyCards.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Arrange
        wrapper = shallowMount(LoyaltyCards, {
            localVue,
            store,
            i18n,
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
            const noCardsComponent = wrapper.find('no-cards-error-state');
            console.log(wrapper.html());
        });
    });

    describe('Cards Received ::', () => {

    });

    describe('Loading Cards', () => {

    });
});
