import { createLocalVue, mount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Slots from '../Slots.vue';

// MOCKS
const MOCK_CARDS = [

];
const MOCK_PROMOTION_CARD_ID = '__TEST_PROMOTION_CARD_ID__';
const MOCK_STAMP_CARD_ID = '__TEST_STAMP_CARD_ID__';

const localVue = createLocalVue();
localVue.use(VueI18n);

let wrapper;


describe('Slots.vue', () => {
    beforeEach(() => {
        wrapper = mount(Slots, {
            localVue,
            propsData: {
                cards: MOCK_CARDS
            },
            stubs: {
                StampCard: `<div data-test-id="${MOCK_STAMP_CARD_ID}">TEST_STAMP_CARD</div>`,
                StampCardPromotionCard: `<div data-test-id="${MOCK_PROMOTION_CARD_ID}">TEST_PROMOTION_CARD</div>`
            }
        });
    });
    describe('Redeemable Stamp Cards', () => {

    });
    describe('In Progress Stamp Cards', () => {

    });
    describe('Participating Restaurants', () => {

    });
    describe('No Cards', () => {

    });
});
