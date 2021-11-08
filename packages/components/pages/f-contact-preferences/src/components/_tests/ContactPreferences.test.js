import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';

import ContactPreferences from '../ContactPreferences.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const baseProps = {
    smartGatewayBaseUrl: '/'
};

describe('ContactPreferences', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {
            ...baseProps
        };

        // Act
        const wrapper = shallowMount(ContactPreferences, {
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });
});
