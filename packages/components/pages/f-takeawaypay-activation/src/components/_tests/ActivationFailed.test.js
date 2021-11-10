import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationFailed from '../ActivationFailed.vue';
import { i18n } from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationFailed', () => {
    const propsData = {
        locale: 'en-GB'
    };
    const wrapper = shallowMount(ActivationFailed, {
        i18n,
        localVue,
        propsData
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const container = wrapper.find('[data-test-id="activation-failed-component"]');

        expect(container).toMatchSnapshot();
    });
});
