import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';

import AccountInfo from '../AccountInfo.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

describe('AccountInfo', () => {
    it('should be defined', () => {
        // Arrange
        // Act
        const wrapper = shallowMount(AccountInfo, {
            i18n,
            localVue
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });
});
