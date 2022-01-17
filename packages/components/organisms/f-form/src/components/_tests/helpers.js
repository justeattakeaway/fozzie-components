import { createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import tenantConfigs from '../../tenants';
import { fieldWithRequiredValidations } from '../../../stories/helpers';

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
    dirty: false,
    $touch: jest.fn()
};

const FormFieldMock = {
    props: {
        name: 'first-name',
        'label-text': 'First Name',
        'input-type': 'text'
    },
    translations: fieldWithRequiredValidations.translations,
    validationMessages: fieldWithRequiredValidations.translations.validationMessages,
    value: fieldWithRequiredValidations.value
};

const FormFieldErrorMock = {
    props: {
        maxLength: null,
        name: 'firstName',
        'label-text': 'First Name',
        'input-type': 'text',
        'max-length': null,
        'aria-invalid': true,
        'has-error': true,
        'aria-describedby': 'error-postcode-required'
    },
    errorMessage: {
        props: {
            'data-test-id': 'error-postcode-required',
            id: 'error-postcode-required'
        },
        text: fieldWithRequiredValidations.translations.validationMessages.required
    },
    translations: fieldWithRequiredValidations.translations,
    validationMessages: fieldWithRequiredValidations.translations.validationMessages,
    value: fieldWithRequiredValidations.value
};

export {
    $v,
    localVue,
    i18n,
    FormFieldMock,
    FormFieldErrorMock
};
