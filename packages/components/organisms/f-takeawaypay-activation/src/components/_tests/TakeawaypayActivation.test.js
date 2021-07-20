import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import TakeawaypayActivation from '../TakeawaypayActivation.vue';
import tenantConfigs from '../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('TakeawaypayActivation', () => {
    const propsData = {
        getActivationStatusUrl: '/status',
        activateUrl: '/activate',
        loginUrl: '/login',
        registrationUrl: '/register',
        homeUrl: '/',
        authToken: 'token',
        locale: 'en-GB'
    };

    it('should be defined', () => {
        const wrapper = shallowMount(TakeawaypayActivation, {
            i18n,
            localVue,
            propsData
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ActivationFailed component', () => {
        const wrapper = shallowMount(TakeawaypayActivation, {
            data: () => {
                return {
                    activationState: 'none'
                }
            },   
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationSuccessful component', () => {
        const wrapper = shallowMount(TakeawaypayActivation, {
            data: () => {
                return {
                    activationState: 'succeeded'
                }
            },   
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationLoggedIn component', () => {
        const wrapper = shallowMount(TakeawaypayActivation, {
            data: () => {
                return {
                    activationState: 'available_logged_in'
                }
            },   
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationNotLoggedIn component', () => {
        const wrapper = shallowMount(TakeawaypayActivation, {
            data: () => {
                return {
                    activationState: 'available_not_logged_in'
                }
            },   
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });
});
