const firstNameData = {
    name: 'firstName',
    value: '',
    translations: {
        label: 'First Name',
        validationMessages: {
            required: 'Enter First Name'
        }
    }
};

const phoneNumberData = {
    name: 'mobileNumber',
    value: '',
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
    value: '',
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
