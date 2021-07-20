import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationLoggedIn from '../ActivationLoggedIn.vue';
import tenantConfigs from '../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationLoggedIn', () => {
    const propsData = {
        loginUrl: '/login',
        registrationUrl: '/registration',
        activateUrl: '/activate',
        authToken: 'token',
        consumerId: '12345',
        consumerEmail: 'test@mail.com'
    };

    it('should be defined', () => {    
        const wrapper = shallowMount(ActivationLoggedIn, {
            i18n,
            localVue,
            propsData
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const wrapper = shallowMount(ActivationLoggedIn, {
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="activation-logged-in-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should be rendered correctly while activation is in progress', () => {
        const wrapper = mount(ActivationLoggedIn, {
            data: () => {
                return {
                    activationInProgress: true
                }
            },   
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
            
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should be called after click on activate button', async () => {
                const activateSpy = jest.spyOn(ActivationLoggedIn.methods, 'activate');

                wrapper = mount(ActivationLoggedIn, {
                    i18n,
                    localVue,
                    propsData
                });

                await wrapper.find('[data-test-id="takeawaypay-activation-activate-button"]').trigger('click');
                await wrapper.vm.$nextTick();

                expect(activateSpy).toHaveBeenCalled();
            });

            it('should emit `activation-result` event', async () => {
                wrapper = mount(ActivationLoggedIn, {
                    i18n,
                    localVue,
                    propsData
                });

                await wrapper.vm.activate();

                expect(wrapper.emitted('activation-result').length).toBe(1);
            });
        });
    });
});
