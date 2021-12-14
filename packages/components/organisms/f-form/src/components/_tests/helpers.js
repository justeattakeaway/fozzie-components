const fieldData = {
    name: 'firstName',
    value: '',
    translations: {
        label: 'First Name',
        validationMessages: {
            required: 'Enter First Name'
        }
    }
};

const formData = {
    formFields: [
        fieldData,
        {
            name: 'lastName',
            value: '',
            translations: {
                label: 'Last Name'
            }
        },
        {
            name: 'email',
            value: '',
            translations: {
                label: 'Email Address',
                validationMessages: {
                    required: 'Enter Email Address',
                    invalid: 'Enter valid Email Address'
                }
            }
        },
        {
            name: 'mobileNumber',
            value: '',
            translations: {
                label: 'Mobile Number',
                validationMessages: {
                    required: 'Enter Mobile Number',
                    invalid: 'Enter valid Mobile Number'
                }
            }
        },
        {
            name: 'postcode',
            value: '',
            translations: {
                label: 'Postcode',
                validationMessages: {
                    required: 'Enter Postcode',
                    invalid: 'Enter valid Postcode'
                }
            }
        }
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
    fieldData,
    formData,
    $v
};
