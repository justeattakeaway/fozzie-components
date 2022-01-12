import { createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();
localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const $v = {
    formFields: {
        mobileNumber: {
            $dirty: false,
            mobileNumber: false
        },
        postCode: {
            $dirty: false,
            postCode: false
        },
        firstName: {
            $dirty: false,
            $touch: jest.fn()
        },
        lastName: {
            $dirty: false
        },
        email: {
            $dirty: false,
            email: false
        }
    },
    $touch: jest.fn()
};

export {
    $v,
    localVue,
    i18n
};
