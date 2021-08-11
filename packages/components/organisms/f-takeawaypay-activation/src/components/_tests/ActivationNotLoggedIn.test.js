import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ActivationNotLoggedIn from '../ActivationNotLoggedIn.vue';
import { i18n } from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ActivationNotLoggedIn', () => {
    const propsData = {
        loginUrl: '/login',
        registrationUrl: '/registration',
        locale: 'en-GB'
    };

    const wrapper = shallowMount(ActivationNotLoggedIn, {
        i18n,
        localVue,
        propsData
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should be rendered correctly', () => {
        const container = wrapper.find('[data-test-id="activation-not-logged-in-component"]');

        expect(container).toMatchSnapshot();
    });
});
