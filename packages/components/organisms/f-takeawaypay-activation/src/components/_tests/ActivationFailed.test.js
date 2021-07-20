import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationFailed from '../ActivationFailed.vue';
import tenantConfigs from '../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationFailed', () => {
    const propsData = {
        locale: 'en-GB'
    };

    it('should be defined', () => {
        const wrapper = shallowMount(ActivationFailed, {
            i18n,
            localVue,
            propsData
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const wrapper = shallowMount(ActivationFailed, {
            i18n,
            localVue,
            propsData
        });
        const container = wrapper.find('[data-test-id="activation-failed-component"]');

        expect(container).toMatchSnapshot();
    });
});
