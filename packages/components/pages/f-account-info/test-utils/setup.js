import { createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import tenantConfigs from '../src/tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const baseUrl = 'https://smartGatewayBaseUrl.com';

const token = 'some-auth-token';

const conversationId = 'b7386108-95e6-4e73-9421-5b066c089153';

export {
    localVue,
    i18n,
    baseUrl,
    token,
    conversationId
};
