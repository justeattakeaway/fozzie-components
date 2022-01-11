import { createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import tenantConfigs from '../../tenants';

export const localVue = createLocalVue();
localVue.use(VueI18n);

export const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const firstNameData = {
    name: 'firstName',
    value: 'John',
    translations: {
        label: 'First Name',
        validationMessages: {
            required: 'Enter First Name'
        }
    }
};

const phoneNumberData = {
    name: 'mobileNumber',
    value: '07111111111',
    translations: {
        label: 'Mobile Number',
        validationMessages: {
            required: 'Enter Mobile Number',
            invalid: 'Enter valid Mobile Number'
        }
    }
};

const postcodeData = {
    name: 'postcode',
    value: 'EC1A1BB',
    translations: {
        label: 'Postcode',
        validationMessages: {
            required: 'Enter Postcode',
            invalid: 'Enter valid Postcode'
        }
    }
};

const formData = {
    formFields: [
        firstNameData,
        {
            name: 'lastName',
            value: 'Johnson',
            translations: {
                label: 'Last Name'
            }
        },
        {
            name: 'email',
            value: 'John.Johnson@gmail.com',
            translations: {
                label: 'Email Address',
                validationMessages: {
                    required: 'Enter Email Address',
                    invalid: 'Enter valid Email Address'
                }
            }
        },
        phoneNumberData,
        postcodeData
    ],
    buttonText: 'Continue'
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
    formData,
    firstNameData,
    phoneNumberData,
    postcodeData,
    $v
};
