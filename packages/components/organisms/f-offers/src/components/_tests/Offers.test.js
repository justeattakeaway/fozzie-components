import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation/src';
import tenantConfigs from '../../tenants';
import VOffers from '../Offers.vue';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

describe('Offers', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VOffers, {
            propsData,
            i18n,
            localVue
        });
        expect(wrapper.exists()).toBe(true);
    });
});
