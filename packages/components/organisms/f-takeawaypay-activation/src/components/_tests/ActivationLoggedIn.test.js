import Vuex from 'vuex';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationLoggedIn from '../ActivationLoggedIn.vue';
import { i18n, $logger } from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

const createStore = () => new Vuex.Store({});

describe('ActivationLoggedIn', () => {
    const propsData = {
        loginUrl: '/login',
        registrationUrl: '/registration',
        activateUrl: '/activate',
        authToken: 'token',
        consumerId: '12345',
        consumerEmail: 'test@mail.com'
    };
    const wrapperShallow = shallowMount(ActivationLoggedIn, {
        i18n,
        localVue,
        propsData
    });

    it('should be defined', () => {
        expect(wrapperShallow.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const container = wrapperShallow.find('[data-test-id="activation-logged-in-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should be rendered correctly while activation is in progress', () => {
        const wrapper = mount(ActivationLoggedIn, {
            data: () => ({
                activationInProgress: true
            }),
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="activation-logged-in-component"]');

        expect(container).toMatchSnapshot();
    });

    describe('methods ::', () => {
        describe('activate ::', () => {
            let wrapper;

            const createWrapper = () => mount(ActivationLoggedIn, {
                store: createStore(),
                i18n,
                localVue,
                propsData,
                mocks: {
                    $logger
                }
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should be called after click on activate button', async () => {
                const activateSpy = jest.spyOn(ActivationLoggedIn.methods, 'activate');
                wrapper = createWrapper();

                await wrapper.find('[data-test-id="takeawaypay-activation-activate-button"]').trigger('click');
                await wrapper.vm.$nextTick();

                expect(activateSpy).toHaveBeenCalled();
            });

            it('should emit `activation-result` event', async () => {
                wrapper = createWrapper();

                await wrapper.vm.activate();

                expect(wrapper.emitted('activation-result').length).toBe(1);
            });
        });
    });
});
