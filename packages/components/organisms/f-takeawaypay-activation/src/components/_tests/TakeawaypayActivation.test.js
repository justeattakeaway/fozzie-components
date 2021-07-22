import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import TakeawaypayActivation from '../TakeawaypayActivation.vue';
import i18n from './helpers/setup';

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
    const wrapper = shallowMount(TakeawaypayActivation, {
        i18n,
        localVue,
        propsData
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ActivationFailed component', async () => {
        wrapper.setData({
            activationState: 'none'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationSuccessful component', async () => {
        wrapper.setData({
            activationState: 'succeeded'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationLoggedIn component', async () => {
        wrapper.setData({
            activationState: 'available_logged_in'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationNotLoggedIn component', async () => {
        wrapper.setData({
            activationState: 'available_not_logged_in'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });
});
