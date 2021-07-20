import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationSuccessful from '../ActivationSuccessful.vue';
import tenantConfigs from '../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationSuccessful', () => {
    const propsData = {
        homeUrl: '/home',
        locale: 'en-GB'
    };

    it('should be defined', () => {
        const wrapper = shallowMount(ActivationSuccessful, {
            i18n,
            localVue,
            propsData
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const wrapper = shallowMount(ActivationSuccessful, {
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="activation-successful-component"]');

        expect(container).toMatchSnapshot();
    });
});
