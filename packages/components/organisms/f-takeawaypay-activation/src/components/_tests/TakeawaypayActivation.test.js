import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import TakeawaypayActivation from '../TakeawaypayActivation.vue';
import tenantConfigs from '../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    },
    dateTimeFormats: {
        'en-GB': tenantConfigs['en-GB'].dateTimeFormats
    }
};

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('TakeawaypayActivation', () => {
    it('should be defined', () => {
        const propsData = {
            loginUrl: '/login',
            registrationUrl: '/register',
            homeUrl: '/',
            locale: 'en-GB'
        };
        const wrapper = shallowMount(TakeawaypayActivation, {
            i18n,
            localVue,
            propsData
        });
        expect(wrapper.exists()).toBe(true);
    });
});
