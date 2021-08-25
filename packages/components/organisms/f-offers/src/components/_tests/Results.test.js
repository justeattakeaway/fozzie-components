import { createLocalVue, shallowMount } from '@vue/test-utils';
import { ContentCards } from '@justeat/f-content-cards';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import Results from '../Results.vue';
import enGB from '../../tenants/en-GB';
import { VUEX_MODULE_NAMESPACE_OFFERS } from '../../store/types';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

const expectedBrazeKey = 'test-braze-key';
const globalUserIdStub = 'test-id';
const userDataStub = {
    friendlyName: '__TEST_NAME__'
};
const createState = state => new Vuex.Store(state);

const createStore = () => createState({
    modules: {
        [VUEX_MODULE_NAMESPACE_OFFERS]: {
            namespaced: true,
            state: () => ({
                globalUserId: globalUserIdStub,
                userData: userDataStub,
                brazeApiKey: expectedBrazeKey
            })
        }
    }
});

const i18n = {
    locale: 'en-GB',
    fallbackLocale: 'en-GB',
    messages: {
        'en-GB': enGB
    }
};

const mountLayout = store => shallowMount(Results, {
    store,
    localVue,
    i18n,
    data: () => ({
        title: 'Offers',
        enabledCardTypes: [
            'Header_Card',
            'Promotion_Card_1',
            'Promotion_Card_2',
            'Recommendation_Card_1',
            'Restaurant_FTC_Offer_Card',
            'Voucher_Card_1',
            'Terms_And_Conditions_Card',
            'Terms_And_Conditions_Card_2',
            'Anniversary_Card_1'
        ]
    }),
    stubs: {
        ContentCards: true
    }
});

jest.useFakeTimers();

beforeEach(() => {
    jest.clearAllTimers();
});

describe('Results.vue', () => {
    it('should render the content cards component when appboy is set on the window object', async () => {
        // Arrange
        const wrapper = mountLayout(createStore);
        // set appboy with mock internals
        window.appboy = {
            mock: true
        };

        await wrapper.vm.$nextTick();

        // Act
        const contentCards = wrapper.findComponent(ContentCards);

        // Assert
        expect(contentCards.exists()).toBe(true);
    });

    describe('content cards events handling', () => {
        describe('voucherCodeClick event handler', () => {
            const url = 'pigeon://thecoop.com';
            let wrapper;

            beforeEach(async () => {
                // Arrange
                wrapper = mountLayout(createStore);
                // set appboy with mock internals
                window.appboy = {
                    mock: true
                };

                await wrapper.vm.$nextTick();

                // Act
                wrapper.vm.openModal({ url });
            });

            it('should save the url in the given object to the modalOngoingUrl data key', () => {
                // Assert
                expect(wrapper.vm.modalOngoingUrl).toBe(url);
            });

            it('should show the voucher modal', () => {
                // Assert
                expect(wrapper.vm.isModalOpen).toBe(true);
            });
        });
    });

    describe('voucher modal closure event handler', () => {
        describe('closeModal', () => {
            let wrapper;

            beforeEach(async () => {
                // Arrange
                wrapper = mountLayout(createStore);
                // set appboy with mock internals
                window.appboy = {
                    mock: true
                };
                // set url and modal
                wrapper.vm.modalOngoingUrl = 'pigeon://thecoop.com';
                wrapper.vm.isModalOpen = true;

                await wrapper.vm.$nextTick();

                // Act
                wrapper.vm.closeModal();
            });

            it('should clear the url in the modalOngoingUrl data key', () => {
                // Assert
                expect(wrapper.vm.modalOngoingUrl).toBe('');
            });

            it('should hide the voucher modal', () => {
                // Assert
                expect(wrapper.vm.isModalOpen).toBe(false);
            });
        });
    });
});
