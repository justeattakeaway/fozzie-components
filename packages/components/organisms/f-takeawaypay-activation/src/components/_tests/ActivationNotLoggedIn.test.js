import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationNotLoggedIn from '../ActivationNotLoggedIn.vue';
import tenantConfigs from '../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationNotLoggedIn', () => {
    const propsData = {
        loginUrl: '/login',
        registrationUrl: '/registration',
        locale: 'en-GB'
    };

    it('should be defined', () => {    
        const wrapper = shallowMount(ActivationNotLoggedIn, {
            i18n,
            localVue,
            propsData
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const wrapper = shallowMount(ActivationNotLoggedIn, {
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="activation-not-logged-in-component"]');

        expect(container).toMatchSnapshot();
    });
});
