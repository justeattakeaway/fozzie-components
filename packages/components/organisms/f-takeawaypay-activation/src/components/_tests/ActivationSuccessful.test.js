import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationSuccessful from '../ActivationSuccessful.vue';
import { i18n } from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationSuccessful', () => {
    const propsData = {
        homeUrl: '/home',
        locale: 'en-GB'
    };
    const wrapper = shallowMount(ActivationSuccessful, {
        i18n,
        localVue,
        propsData
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const container = wrapper.find('[data-test-id="activation-successful-component"]');

        expect(container).toMatchSnapshot();
    });
});
